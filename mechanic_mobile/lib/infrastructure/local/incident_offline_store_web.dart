class IncidentOfflineStore {
  IncidentOfflineStore._();

  static final IncidentOfflineStore instance = IncidentOfflineStore._();

  final List<Map<String, dynamic>> _incidents = <Map<String, dynamic>>[];
  final List<Map<String, dynamic>> _ops = <Map<String, dynamic>>[];

  Future<void> init() async {}

  Future<List<Map<String, dynamic>>> loadCachedIncidents() async =>
      List<Map<String, dynamic>>.from(_incidents);

  Future<void> saveCachedIncidents(List<Map<String, dynamic>> incidents) async {
    _incidents
      ..clear()
      ..addAll(incidents.map((item) => Map<String, dynamic>.from(item)));
  }

  Future<void> upsertCachedIncident(Map<String, dynamic> incident) async {
    final id = incident['id']?.toString();
    if (id == null || id.isEmpty) return;
    final index = _incidents.indexWhere((item) => item['id']?.toString() == id);
    final copy = Map<String, dynamic>.from(incident);
    if (index >= 0) {
      _incidents[index] = copy;
    } else {
      _incidents.add(copy);
    }
  }

  Future<void> deleteCachedIncident(String id) async {
    _incidents.removeWhere((item) => item['id']?.toString() == id);
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
    _incidents.clear();
    _ops.clear();
  }
}
