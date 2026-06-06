import '../../entities/app_entities.dart';
import '../../repositories/incident_repository.dart';

class ListMyIncidentsUseCase {
  ListMyIncidentsUseCase(this._repository);

  final IncidentRepository _repository;

  Future<PagedResult<IncidentEntity>> call({int? page, int? pageSize}) =>
      _repository.listMyIncidents(page: page, pageSize: pageSize);
}
