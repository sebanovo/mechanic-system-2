import '../../repositories/incident_repository.dart';

class RunIncidentAiAnalysisUseCase {
  RunIncidentAiAnalysisUseCase(this._repository);

  final IncidentRepository _repository;

  Future<Map<String, dynamic>> call(String incidentId) =>
      _repository.runIncidentAiAnalysis(incidentId);
}
