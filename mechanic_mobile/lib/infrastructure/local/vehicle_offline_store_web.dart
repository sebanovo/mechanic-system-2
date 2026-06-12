class VehicleOfflineStore {
  VehicleOfflineStore._();

  static final VehicleOfflineStore instance = VehicleOfflineStore._();

  final List<Map<String, dynamic>> _vehicles = <Map<String, dynamic>>[];
  final List<Map<String, dynamic>> _ops = <Map<String, dynamic>>[];

  Future<void> init() async {}

  Future<List<Map<String, dynamic>>> loadCachedVehicles() async =>
      List<Map<String, dynamic>>.from(_vehicles);

  Future<void> saveCachedVehicles(List<Map<String, dynamic>> vehicles) async {
    _vehicles
      ..clear()
      ..addAll(vehicles.map((item) => Map<String, dynamic>.from(item)));
  }

  Future<void> upsertCachedVehicle(Map<String, dynamic> vehicle) async {
    final id = vehicle['id']?.toString();
    if (id == null || id.isEmpty) return;
    final index = _vehicles.indexWhere((item) => item['id']?.toString() == id);
    final copy = Map<String, dynamic>.from(vehicle);
    if (index >= 0) {
      _vehicles[index] = copy;
    } else {
      _vehicles.add(copy);
    }
  }

  Future<void> deleteCachedVehicle(String id) async {
    _vehicles.removeWhere((item) => item['id']?.toString() == id);
  }

  Future<int> queueOperation({
    required String opType,
    required String resourceId,
    required Map<String, dynamic> payload,
  }) async {
    _ops.add(<String, dynamic>{
      'id': _ops.length + 1,
      'op_type': opType,
      'resource_id': resourceId,
      'payload': Map<String, dynamic>.from(payload),
      'created_at': DateTime.now().millisecondsSinceEpoch,
    });
    return _ops.length;
  }

  Future<List<Map<String, dynamic>>> loadPendingOperations() async =>
      List<Map<String, dynamic>>.from(_ops);

  Future<void> deleteOperation(int id) async {
    _ops.removeWhere((item) => item['id'] == id);
  }

  Future<int> pendingCount() async => _ops.length;

  Future<void> clearAll() async {
    _vehicles.clear();
    _ops.clear();
  }
}
