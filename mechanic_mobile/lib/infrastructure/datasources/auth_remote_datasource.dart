import '../../core/network/api_client.dart';

class AuthRemoteDataSource {
  AuthRemoteDataSource(this._apiClient);

  final ApiClient _apiClient;

  Future<Map<String, dynamic>> login(Map<String, dynamic> payload) =>
      _apiClient.post('/api/auth/login', data: payload);

  Future<Map<String, dynamic>> registerClient(Map<String, dynamic> payload) =>
      _apiClient.post('/api/auth/register-client', data: payload);

  Future<Map<String, dynamic>> registerTenant(Map<String, dynamic> payload) =>
      _apiClient.post('/api/auth/register-tenant', data: payload);

  Future<Map<String, dynamic>> selectTenant(Map<String, dynamic> payload) =>
      _apiClient.post('/api/auth/select-tenant', data: payload);

  Future<Map<String, dynamic>> refresh(Map<String, dynamic> payload) =>
      _apiClient.post('/api/auth/refresh', data: payload);

  Future<Map<String, dynamic>> logout() => _apiClient.post('/api/auth/logout');

  Future<Map<String, dynamic>> me() => _apiClient.get('/api/auth/me');
}
