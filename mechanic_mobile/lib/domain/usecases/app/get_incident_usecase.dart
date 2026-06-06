import '../../entities/app_entities.dart';
import '../../repositories/incident_repository.dart';

class GetIncidentUseCase {
  GetIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(String incidentId) =>
      _repository.getIncident(incidentId);
}
