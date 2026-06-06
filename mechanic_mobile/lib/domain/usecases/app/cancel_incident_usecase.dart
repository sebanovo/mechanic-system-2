import '../../entities/app_entities.dart';
import '../../repositories/incident_repository.dart';

class CancelIncidentUseCase {
  CancelIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(String incidentId, IncidentCancelInput input) =>
      _repository.cancelIncident(incidentId, input);
}
