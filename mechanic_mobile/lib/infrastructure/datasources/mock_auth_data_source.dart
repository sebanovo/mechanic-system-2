import '../models/user_model.dart';
import '../../core/error/failures.dart';

abstract class MockAuthDataSource {
  Future<UserModel> login(String username, String password);
}

class MockAuthDataSourceImpl implements MockAuthDataSource {
  @override
  Future<UserModel> login(String username, String password) async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    if (username == 'admin' && password == 'password') {
      return UserModel(
        id: '1',
        email: 'admin@mechanic.com',
        fullName: 'administrador guzman suarez',
      );
    } else {
      throw ServerFailure('Credenciales invalidas');
    }
  }
}
