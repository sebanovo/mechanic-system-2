import '../models/service_request_model.dart';
import '../../core/error/failures.dart';

abstract class MockServiceDataSource {
  Future<List<ServiceRequestModel>> getServiceRequests();
  Future<ServiceRequestModel> getServiceRequestById(String id);
}

class MockServiceDataSourceImpl implements MockServiceDataSource {
  final List<ServiceRequestModel> _mockData = [
    ServiceRequestModel(
      id: 'REQ-001',
      description: 'Cambiador de llanta pinchada',
      mechanicName: 'Juan Perez',
      mechanicPhone: '+123456789',
      vehicleDetails: 'Toyota Corolla 2020 - Placa XYZ-123',
      address: 'Av. Principal 123, Ciudad',
      paymentMethod: 'Tarjeta de Crédito',
      totalCost: 45.0,
      status: 'En Camino',
      date: DateTime.now().subtract(const Duration(minutes: 15)),
    ),
    ServiceRequestModel(
      id: 'REQ-002',
      description: 'Batería descargada',
      mechanicName: 'Carlos Gomez',
      mechanicPhone: '+987654321',
      vehicleDetails: 'Honda Civic 2018 - Placa ABC-987',
      address: 'Calle Secundaria 456, Ciudad',
      paymentMethod: 'Efectivo',
      totalCost: 20.0,
      status: 'Completado',
      date: DateTime.now().subtract(const Duration(days: 1)),
    ),
  ];

  @override
  Future<List<ServiceRequestModel>> getServiceRequests() async {
    await Future.delayed(const Duration(seconds: 1)); // Simulate network
    return _mockData;
  }

  @override
  Future<ServiceRequestModel> getServiceRequestById(String id) async {
    await Future.delayed(const Duration(milliseconds: 500));
    try {
      return _mockData.firstWhere((element) => element.id == id);
    } catch (e) {
      throw ServerFailure('Solicitud no encontrada');
    }
  }
}
