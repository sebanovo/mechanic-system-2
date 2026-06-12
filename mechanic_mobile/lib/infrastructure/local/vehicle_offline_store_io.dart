import 'dart:convert';

import 'package:path/path.dart' as path;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class VehicleOfflineStore {
  VehicleOfflineStore._();

  static final VehicleOfflineStore instance = VehicleOfflineStore._();
  static const _dbName = 'mechanic_offline.db';
  static const _dbVersion = 1;
  static const _vehiclesTable = 'cached_vehicles';
  static const _opsTable = 'pending_vehicle_operations';

  Database? _db;

  Future<void> init() async {
    if (_db != null) return;
    final directory = await getApplicationDocumentsDirectory();
    final dbPath = path.join(directory.path, _dbName);
    _db = await openDatabase(
      dbPath,
      version: _dbVersion,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE $_vehiclesTable (
            id TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at INTEGER NOT NULL
          )
        ''');
        await db.execute('''
          CREATE TABLE $_opsTable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            op_type TEXT NOT NULL,
            resource_id TEXT NOT NULL,
            payload TEXT NOT NULL,
            created_at INTEGER NOT NULL
          )
        ''');
      },
    );
  }

  Future<List<Map<String, dynamic>>> loadCachedVehicles() async {
    final db = await _database();
    final rows = await db.query(_vehiclesTable, orderBy: 'updated_at DESC');
    return rows
        .map((row) => _decodeMap(row['data']?.toString()))
        .whereType<Map<String, dynamic>>()
        .toList();
  }

  Future<void> saveCachedVehicles(List<Map<String, dynamic>> vehicles) async {
    final db = await _database();
    final batch = db.batch();
    batch.delete(_vehiclesTable);
    final now = DateTime.now().millisecondsSinceEpoch;
    for (final vehicle in vehicles) {
      final id = vehicle['id']?.toString();
      if (id == null || id.isEmpty) continue;
      batch.insert(
        _vehiclesTable,
        {
          'id': id,
          'data': jsonEncode(vehicle),
          'updated_at': now,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
    await batch.commit(noResult: true);
  }

  Future<void> upsertCachedVehicle(Map<String, dynamic> vehicle) async {
    final db = await _database();
    final id = vehicle['id']?.toString();
    if (id == null || id.isEmpty) return;
    await db.insert(
      _vehiclesTable,
      {
        'id': id,
        'data': jsonEncode(vehicle),
        'updated_at': DateTime.now().millisecondsSinceEpoch,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> deleteCachedVehicle(String id) async {
    final db = await _database();
    await db.delete(_vehiclesTable, where: 'id = ?', whereArgs: [id]);
  }

  Future<int> queueOperation({
    required String opType,
    required String resourceId,
    required Map<String, dynamic> payload,
  }) async {
    final db = await _database();
    return db.insert(_opsTable, {
      'op_type': opType,
      'resource_id': resourceId,
      'payload': jsonEncode(payload),
      'created_at': DateTime.now().millisecondsSinceEpoch,
    });
  }

  Future<List<Map<String, dynamic>>> loadPendingOperations() async {
    final db = await _database();
    final rows = await db.query(_opsTable, orderBy: 'created_at ASC');
    return rows
        .map(
          (row) => <String, dynamic>{
            'id': row['id'],
            'op_type': row['op_type'],
            'resource_id': row['resource_id'],
            'payload': _decodeMap(row['payload']?.toString()) ?? <String, dynamic>{},
            'created_at': row['created_at'],
          },
        )
        .toList();
  }

  Future<void> deleteOperation(int id) async {
    final db = await _database();
    await db.delete(_opsTable, where: 'id = ?', whereArgs: [id]);
  }

  Future<int> pendingCount() async {
    final db = await _database();
    final result = await db.rawQuery('SELECT COUNT(*) AS count FROM $_opsTable');
    return (result.first['count'] as int?) ?? 0;
  }

  Future<void> clearAll() async {
    final db = await _database();
    await db.delete(_vehiclesTable);
    await db.delete(_opsTable);
  }

  Future<Database> _database() async {
    if (_db != null) return _db!;
    await init();
    return _db!;
  }

  Map<String, dynamic>? _decodeMap(String? raw) {
    if (raw == null || raw.isEmpty) return null;
    final decoded = jsonDecode(raw);
    if (decoded is Map<String, dynamic>) return decoded;
    if (decoded is Map) return Map<String, dynamic>.from(decoded);
    return null;
  }
}
