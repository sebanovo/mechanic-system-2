import '../models/user_model.dart';
import '../../core/network/api_client.dart';

class AuthRemoteDataSource {
  final ApiClient api;

  AuthRemoteDataSource(this.api);

  Future<(String, UserModel)> login(String email, String password) async {
    final response = await api.post("/api/auth/login", {
      "email": email,
      "password": password,
    });

    final data = response.data["data"];
    final String token = data["access_token"] ?? "";
    final Map<String, dynamic> userJson =
        (data["user"] as Map<String, dynamic>?) ??
        (data as Map<String, dynamic>);
    final user = UserModel.fromJson(userJson);

    return (token, user);
  }

  Future<(String, UserModel)> register(Map<String, dynamic> body) async {
    final response = await api.post("/api/auth/register", body);

    final data = response.data["data"];

    final String token = data["access_token"] ?? "";
    final Map<String, dynamic> userJson =
        (data["user"] as Map<String, dynamic>?) ??
        (data as Map<String, dynamic>);
    final user = UserModel.fromJson(userJson);

    return (token, user);
  }

  Future<UserModel> me() async {
    final response = await api.get("/api/auth/me");

    return UserModel.fromJson(response.data["data"]);
  }

  Future<UserModel> myProfile() async {
    final response = await api.get("/api/users/me/profile");
    return UserModel.fromJson(response.data["data"]);
  }

  Future<UserModel> updateMyProfile(Map<String, dynamic> body) async {
    final response = await api.patch("/api/users/me/profile", body);
    return UserModel.fromJson(response.data["data"]);
  }
}
