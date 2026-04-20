import 'package:dio/dio.dart';
import '../../constants/env.dart';

class ApiClient {
  final Dio dio;

  String? token;

  ApiClient()
    : dio = Dio(
        BaseOptions(
          baseUrl: Env.baseUrl,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        ),
      );

  void setToken(String token) {
    this.token = token;
    dio.options.headers["Authorization"] = "Bearer $token";
  }

  Future<Response> post(String path, dynamic data) {
    return dio.post(path, data: data);
  }

  Future<Response> get(String path) {
    return dio.get(path);
  }

  Future<Response> patch(String path, dynamic data) {
    return dio.patch(path, data: data);
  }
}
