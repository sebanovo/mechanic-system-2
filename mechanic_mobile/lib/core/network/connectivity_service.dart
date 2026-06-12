import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/foundation.dart';

class ConnectivityService extends ChangeNotifier {
  ConnectivityService(this._connectivity);

  final Connectivity _connectivity;
  StreamSubscription<List<ConnectivityResult>>? _subscription;
  bool _online = true;
  bool _ready = false;

  bool get isOnline => _online;
  bool get isReady => _ready;
  String get statusLabel => _online ? 'En línea' : 'Sin internet';

  Future<void> start() async {
    final current = await _connectivity.checkConnectivity();
    _applyConnectivity(current);
    _subscription = _connectivity.onConnectivityChanged.listen(_applyConnectivity);
    _ready = true;
    notifyListeners();
  }

  void _applyConnectivity(List<ConnectivityResult> results) {
    final online = results.any((result) => result != ConnectivityResult.none);
    if (online == _online && _ready) return;
    _online = online;
    notifyListeners();
  }

  @override
  void dispose() {
    _subscription?.cancel();
    super.dispose();
  }
}
