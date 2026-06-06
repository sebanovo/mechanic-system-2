import '../../entities/app_entities.dart';
import '../../repositories/incident_repository.dart';

class UpdateIncidentUseCase {
  UpdateIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(String incidentId, IncidentUpsertInput input) =>
      _repository.updateIncident(incidentId, input);
}
