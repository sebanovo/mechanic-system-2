import '../entities/app_entities.dart';

abstract class IncidentRepository {
  Future<PagedResult<IncidentEntity>> listMyIncidents({
    int? page,
    int? pageSize,
  });

  Future<IncidentEntity> createIncident(IncidentUpsertInput input);
  Future<IncidentEntity> getIncident(String incidentId);
  Future<IncidentEntity> updateIncident(
    String incidentId,
    IncidentUpsertInput input,
  );
  Future<IncidentEntity> cancelIncident(
    String incidentId,
    IncidentCancelInput input,
  );

  Future<Map<String, dynamic>> runIncidentAiAnalysis(String incidentId);
}
