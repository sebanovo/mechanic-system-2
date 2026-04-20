import 'package:flutter/material.dart';
import '../../../domain/entities/service_request.dart';
import '../../../domain/usecases/get_service_requests_usecase.dart';

class HomeViewModel extends ChangeNotifier {
  final GetServiceRequestsUseCase getServiceRequestsUseCase;

  List<ServiceRequest> _requests = [];
  bool _isLoading = false;
  String? _errorMessage;

  HomeViewModel({required this.getServiceRequestsUseCase});

  List<ServiceRequest> get requests => _requests;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadRequests() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _requests = await getServiceRequestsUseCase.call();
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _errorMessage = 'Error al cargar las solicitudes';
      _isLoading = false;
      notifyListeners();
    }
  }
}
