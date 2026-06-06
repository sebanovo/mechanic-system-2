import 'package:flutter/foundation.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';

class SessionsViewModel extends ChangeNotifier {
  SessionsViewModel({
    required ListMySessionsUseCase listMySessions,
    required RevokeSessionUseCase revokeSession,
  })  : _listMySessions = listMySessions,
        _revokeSession = revokeSession;

  final ListMySessionsUseCase _listMySessions;
  final RevokeSessionUseCase _revokeSession;

  PagedResult<SessionEntity>? sessions;
  bool loading = false;
  bool submitting = false;
  bool loaded = false;
  String? error;
  String? message;

  Future<void> loadSessions() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      sessions = await _listMySessions();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      loaded = true;
      notifyListeners();
    }
  }

  Future<bool> revoke(String sessionId) async {
    submitting = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      await _revokeSession(sessionId);
      message = 'Sesión revocada';
      await loadSessions();
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      submitting = false;
      notifyListeners();
    }
  }
}
