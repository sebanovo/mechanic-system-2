import '../../core/services/session_storage.dart';
import '../../domain/entities/auth_entities.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_datasource.dart';
import '../models/auth_models.dart';

class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl(this._remoteDataSource, this._sessionStorage);

  final AuthRemoteDataSource _remoteDataSource;
  final SessionStorage _sessionStorage;

  Map<String, dynamic> _envelopeData(Map<String, dynamic> response) {
    final data = response['data'];
    return data is Map ? Map<String, dynamic>.from(data) : <String, dynamic>{};
  }

  Future<AuthContextEntity> _storeContext(Map<String, dynamic> response) async {
    final context = AuthContextModel.fromJson(_envelopeData(response));
    final tokens = context.tokens;
    if (tokens != null) {
      await _sessionStorage.setTokens(
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      );
    }
    await _sessionStorage.setAuthMeta(
      userType: context.userType,
      tenantId: context.tenantId ?? '',
    );
    return context;
  }

  @override
  Future<AuthContextEntity> login(LoginInput input) async {
    return _storeContext(await _remoteDataSource.login(input.toJson()));
  }

  @override
  Future<AuthContextEntity> registerClient(RegisterClientInput input) async {
    return _storeContext(await _remoteDataSource.registerClient(input.toJson()));
  }

  @override
  Future<AuthContextEntity> registerTenant(RegisterTenantInput input) async {
    return _storeContext(await _remoteDataSource.registerTenant(input.toJson()));
  }

  @override
  Future<AuthContextEntity> selectTenant(SelectTenantInput input) async {
    return _storeContext(await _remoteDataSource.selectTenant(input.toJson()));
  }

  @override
  Future<AuthContextEntity> refresh() async {
    final refreshToken = _sessionStorage.refreshToken;
    final response = await _remoteDataSource.refresh({
      if (refreshToken.isNotEmpty) 'refresh_token': refreshToken,
    });
    return _storeContext(response);
  }

  @override
  Future<void> logout() async {
    try {
      await _remoteDataSource.logout();
    } finally {
      await _sessionStorage.clearSession();
    }
  }

  @override
  Future<AuthContextEntity> me() async {
    return _storeContext(await _remoteDataSource.me());
  }
}
