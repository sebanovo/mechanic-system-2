import '../../core/network/api_client.dart';
import '../models/vehicle_model.dart';

class VehicleRemoteDataSource {
  final ApiClient api;

  VehicleRemoteDataSource(this.api);

  Future<VehicleModel> createVehicle(Map<String, dynamic> body) async {
    final response = await api.post('/api/vehicles', body);
    return VehicleModel.fromJson(response.data['data']);
  }

  Future<List<VehicleModel>> getMyVehicles() async {
    final response = await api.get('/api/vehicles');
    final List<dynamic> list = response.data['data'] as List<dynamic>;
    return list
        .map((item) => VehicleModel.fromJson(item as Map<String, dynamic>))
        .toList();
  }

  Future<VehicleModel> getVehicleById(String vehicleId) async {
    final response = await api.get('/api/vehicles/$vehicleId');
    return VehicleModel.fromJson(response.data['data']);
  }

  Future<VehicleModel> updateVehicle(
    String vehicleId,
    Map<String, dynamic> body,
  ) async {
    final response = await api.patch('/api/vehicles/$vehicleId', body);
    return VehicleModel.fromJson(response.data['data']);
  }
}
