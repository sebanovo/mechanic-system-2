import 'package:flutter/foundation.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';

class ProfileViewModel extends ChangeNotifier {
  ProfileViewModel({
    required GetMyProfileUseCase getMyProfile,
    required UpdateMyProfileUseCase updateMyProfile,
    required ChangePasswordUseCase changePassword,
  })  : _getMyProfile = getMyProfile,
        _updateMyProfile = updateMyProfile,
        _changePassword = changePassword;

  final GetMyProfileUseCase _getMyProfile;
  final UpdateMyProfileUseCase _updateMyProfile;
  final ChangePasswordUseCase _changePassword;

  ClientEntity? profile;
  bool loading = false;
  bool saving = false;
  bool loaded = false;
  String? error;
  String? message;

  Future<void> loadProfile() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      profile = await _getMyProfile();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      loaded = true;
      notifyListeners();
    }
  }

  Future<bool> updateProfile(ClientUpdateInput input) async {
    saving = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      profile = await _updateMyProfile(input);
      message = 'Perfil actualizado';
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      saving = false;
      notifyListeners();
    }
  }

  Future<bool> updatePassword(PasswordChangeInput input) async {
    saving = true;
    error = null;
    message = null;
    notifyListeners();
    try {
      message = await _changePassword(input);
      return true;
    } catch (exception) {
      error = appFailureMessage(exception);
      return false;
    } finally {
      saving = false;
      notifyListeners();
    }
  }
}
