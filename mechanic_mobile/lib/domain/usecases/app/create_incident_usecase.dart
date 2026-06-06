import '../../entities/app_entities.dart';
import '../../repositories/incident_repository.dart';

class CreateIncidentUseCase {
  CreateIncidentUseCase(this._repository);

  final IncidentRepository _repository;

  Future<IncidentEntity> call(IncidentUpsertInput input) =>
      _repository.createIncident(input);
}
