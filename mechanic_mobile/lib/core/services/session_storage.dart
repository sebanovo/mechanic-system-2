import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/env.dart';

class SessionStorage extends ChangeNotifier {
  SessionStorage(this._preferences);

  static const _apiBaseUrlKey = 'api_base_url';
  static const _apiTokenKey = 'api_token';
  static const _refreshTokenKey = 'refresh_token';
  static const _userTypeKey = 'user_type';
  static const _tenantIdKey = 'tenant_id';

  final SharedPreferences _preferences;

  String _apiBaseUrl = AppEnv.apiBaseUrl;
  String _apiToken = AppEnv.apiToken;
  String _refreshToken = '';
  String _userType = '';
  String _tenantId = '';
  bool _ready = false;

  bool get isReady => _ready;
  String get apiBaseUrl => _apiBaseUrl;
  String get apiToken => _apiToken;
  String get refreshToken => _refreshToken;
  String get userType => _userType;
  String get tenantId => _tenantId;

  Future<void> load() async {
    _apiBaseUrl = _preferences.getString(_apiBaseUrlKey) ?? AppEnv.apiBaseUrl;
    _apiToken = _preferences.getString(_apiTokenKey) ?? AppEnv.apiToken;
    _refreshToken = _preferences.getString(_refreshTokenKey) ?? '';
    _userType = _preferences.getString(_userTypeKey) ?? '';
    _tenantId = _preferences.getString(_tenantIdKey) ?? '';
    _ready = true;
    notifyListeners();
  }

  Future<void> setApiBaseUrl(String value) async {
    _apiBaseUrl = _normalize(value);
    await _preferences.setString(_apiBaseUrlKey, _apiBaseUrl);
    notifyListeners();
  }

  Future<void> setApiToken(String value) async {
    _apiToken = value.trim();
    await _preferences.setString(_apiTokenKey, _apiToken);
    notifyListeners();
  }

  Future<void> setRefreshToken(String value) async {
    _refreshToken = value.trim();
    if (_refreshToken.isEmpty) {
      await _preferences.remove(_refreshTokenKey);
    } else {
      await _preferences.setString(_refreshTokenKey, _refreshToken);
    }
    notifyListeners();
  }

  Future<void> setAuthMeta({
    String? userType,
    String? tenantId,
  }) async {
    if (userType != null) {
      _userType = userType.trim();
      if (_userType.isEmpty) {
        await _preferences.remove(_userTypeKey);
      } else {
        await _preferences.setString(_userTypeKey, _userType);
      }
    }
    if (tenantId != null) {
      _tenantId = tenantId.trim();
      if (_tenantId.isEmpty) {
        await _preferences.remove(_tenantIdKey);
      } else {
        await _preferences.setString(_tenantIdKey, _tenantId);
      }
    }
    notifyListeners();
  }

  Future<void> setTokens({
    required String accessToken,
    String? refreshToken,
  }) async {
    await setApiToken(accessToken);
    if (refreshToken != null) {
      await setRefreshToken(refreshToken);
    }
  }

  Future<void> clearToken() async {
    _apiToken = '';
    await _preferences.remove(_apiTokenKey);
    _refreshToken = '';
    await _preferences.remove(_refreshTokenKey);
    notifyListeners();
  }

  Future<void> clearSession() async {
    await clearToken();
    _userType = '';
    _tenantId = '';
    await _preferences.remove(_userTypeKey);
    await _preferences.remove(_tenantIdKey);
    notifyListeners();
  }

  String _normalize(String value) {
    final trimmed = value.trim();
    if (trimmed.endsWith('/')) {
      return trimmed.substring(0, trimmed.length - 1);
    }
    return trimmed;
  }
}
