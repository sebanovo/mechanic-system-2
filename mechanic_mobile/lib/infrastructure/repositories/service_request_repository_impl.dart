import '../../domain/entities/service_request.dart';
import '../../domain/repositories/service_request_repository.dart';
import '../datasources/mock_service_data_source.dart';

class ServiceRequestRepositoryImpl implements ServiceRequestRepository {
  final MockServiceDataSource remoteDataSource;

  ServiceRequestRepositoryImpl({required this.remoteDataSource});

  @override
  Future<List<ServiceRequest>> getServiceRequests() async {
    return await remoteDataSource.getServiceRequests();
  }

  @override
  Future<ServiceRequest> getServiceRequestById(String id) async {
    return await remoteDataSource.getServiceRequestById(id);
  }
}
