import 'package:flutter/foundation.dart';

import '../../core/error/failures.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/usecases/app_usecases.dart';

class AssignmentsViewModel extends ChangeNotifier {
  AssignmentsViewModel({
    required ListMyAssignmentsUseCase listMyAssignments,
    required GetMyAssignmentUseCase getMyAssignment,
    required ListMyAssignmentTrackingEventsUseCase listMyAssignmentTrackingEvents,
    required GetMyAssignmentTrackingSessionUseCase getMyAssignmentTrackingSession,
  })  : _listMyAssignments = listMyAssignments,
        _getMyAssignment = getMyAssignment,
        _listMyAssignmentTrackingEvents = listMyAssignmentTrackingEvents,
        _getMyAssignmentTrackingSession = getMyAssignmentTrackingSession;

  final ListMyAssignmentsUseCase _listMyAssignments;
  final GetMyAssignmentUseCase _getMyAssignment;
  final ListMyAssignmentTrackingEventsUseCase _listMyAssignmentTrackingEvents;
  final GetMyAssignmentTrackingSessionUseCase _getMyAssignmentTrackingSession;

  PagedResult<Map<String, dynamic>>? assignments;
  Map<String, dynamic>? selectedAssignment;
  PagedResult<Map<String, dynamic>>? trackingEvents;
  Map<String, dynamic>? trackingSession;
  bool loading = false;
  bool detailLoading = false;
  bool loaded = false;
  bool detailLoaded = false;
  String? error;

  Future<void> loadAssignments() async {
    loading = true;
    error = null;
    notifyListeners();
    try {
      assignments = await _listMyAssignments();
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      loading = false;
      loaded = true;
      notifyListeners();
    }
  }

  Future<void> loadAssignmentDetail(String assignmentId) async {
    detailLoading = true;
    error = null;
    selectedAssignment = null;
    trackingEvents = null;
    trackingSession = null;
    notifyListeners();
    try {
      final assignment = await _getMyAssignment(assignmentId);
      final results = await Future.wait([
        _listMyAssignmentTrackingEvents(assignmentId),
        _getMyAssignmentTrackingSession(assignmentId),
      ]);
      selectedAssignment = assignment;
      trackingEvents = results[0] as PagedResult<Map<String, dynamic>>;
      trackingSession = results[1] as Map<String, dynamic>;
    } catch (exception) {
      error = appFailureMessage(exception);
    } finally {
      detailLoading = false;
      detailLoaded = true;
      notifyListeners();
    }
  }

  String assignmentLabel(Map<String, dynamic> item) {
    final status = _stringOf(item['assignment_status']) ??
        _stringOf(item['status']) ??
        _stringOf(item['assignmentStatus']);
    if (status == null || status.isEmpty) return '-';
    return status;
  }

  String? _stringOf(Object? value) {
    final text = value?.toString().trim();
    if (text == null || text.isEmpty || text == 'null') return null;
    return text;
  }
}
