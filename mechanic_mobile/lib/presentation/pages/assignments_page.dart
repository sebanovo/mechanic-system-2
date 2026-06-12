import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';
import 'assignment_tracking_page.dart';

class AssignmentsPage extends StatelessWidget {
  const AssignmentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<AssignmentsViewModel>();
    if (!vm.loaded && !vm.loading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<AssignmentsViewModel>().loadAssignments();
        }
      });
    }

    return RefreshIndicator(
      onRefresh: () => context.read<AssignmentsViewModel>().loadAssignments(),
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          const SectionHeader(
            title: 'Asignaciones',
            subtitle: 'Revisa el estado de tus asignaciones y su seguimiento.',
          ),
          const SizedBox(height: 12),
          if (vm.error != null)
            ErrorBanner(message: vm.error!)
          else if (vm.loading)
            Skeletonizer(
              enabled: true,
              child: Column(
                children: List.generate(
                  4,
                  (index) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Asignación activa'),
                          SizedBox(height: 8),
                          Text('Incidente relacionado'),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            )
          else if (vm.assignments?.items.isEmpty ?? true)
            const EmptyStatePanel(
              title: 'No hay asignaciones',
              subtitle:
                  'Cuando un incidente se asigne a un técnico aparecerá aquí.',
              icon: Icons.assignment_turned_in_rounded,
            )
          else
            ...vm.assignments!.items.map(
              (assignment) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: SurfaceCard(
                  child: InkWell(
                    onTap: () => _openAssignmentDetails(context, assignment),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                'Asignación ${_shortId(_mapValue(assignment, 'assignment', 'id'))}',
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                            ),
                            StatusBadge(
                              label:
                                  _stringValue(
                                    _mapValue(
                                      assignment,
                                      'assignment',
                                      'assignment_status',
                                    ),
                                  ) ??
                                  _stringValue(
                                    _mapValue(
                                      assignment,
                                      'assignment',
                                      'status',
                                    ),
                                  ) ??
                                  '-',
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        InfoRow(
                          label: 'Incidente',
                          value:
                              _nestedStringValue(
                                assignment,
                                'incident',
                                'title',
                              ) ??
                              _nestedStringValue(
                                assignment,
                                'incident',
                                'incident_code',
                              ) ??
                              _stringValue(
                                _mapValue(
                                  assignment,
                                  'assignment',
                                  'incident_id',
                                ),
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Técnico',
                          value:
                              _nestedStringValue(
                                assignment,
                                'technician',
                                'full_name',
                              ) ??
                              _nestedStringValue(
                                assignment,
                                'technician',
                                'id',
                              ) ??
                              _stringValue(
                                _mapValue(
                                  assignment,
                                  'assignment',
                                  'technician_id',
                                ),
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Creada',
                          value: _dateValue(
                            _mapValue(assignment, 'assignment', 'created_at'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Future<void> _openAssignmentDetails(
    BuildContext context,
    Map<String, dynamic> assignment,
  ) async {
    final id = _stringValue(_mapValue(assignment, 'assignment', 'id'));
    if (id == null || id.isEmpty) return;
    await context.read<AssignmentsViewModel>().loadAssignmentDetail(id);
    if (!context.mounted) return;
    final vm = context.read<AssignmentsViewModel>();
    if (vm.error != null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(vm.error!)));
      return;
    }
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (sheetContext) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.78,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        builder: (sheetContext, controller) => Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          child: SingleChildScrollView(
            controller: controller,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        'Detalle de asignación',
                        style: Theme.of(sheetContext).textTheme.headlineSmall,
                      ),
                    ),
                    IconButton(
                      onPressed: () => Navigator.of(sheetContext).pop(),
                      icon: const Icon(Icons.close_rounded),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                if (vm.detailLoading)
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 48),
                    child: Center(child: CircularProgressIndicator()),
                  )
                else ...[
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        InfoRow(
                          label: 'ID',
                          value:
                              _stringValue(
                                _mapValue(
                                  vm.selectedAssignment,
                                  'assignment',
                                  'id',
                                ),
                              ) ??
                              id,
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Estado',
                          value:
                              _stringValue(
                                _mapValue(
                                  vm.selectedAssignment,
                                  'assignment',
                                  'assignment_status',
                                ),
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Incidente',
                          value:
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'incident',
                                'title',
                              ) ??
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'incident',
                                'incident_code',
                              ) ??
                              _stringValue(
                                _mapValue(
                                  vm.selectedAssignment,
                                  'assignment',
                                  'incident_id',
                                ),
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Técnico',
                          value:
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'technician',
                                'full_name',
                              ) ??
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'technician',
                                'first_name',
                              ) ??
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'technician',
                                'id',
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Proveedor',
                          value:
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'provider_profile',
                                'commercial_name',
                              ) ??
                              _nestedStringValue(
                                vm.selectedAssignment,
                                'provider_profile',
                                'id',
                              ) ??
                              '-',
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Tracking session',
                          style: Theme.of(sheetContext).textTheme.titleLarge,
                        ),
                        const SizedBox(height: 10),
                        InfoRow(
                          label: 'Assignment',
                          value:
                              _stringValue(
                                _mapValue(vm.trackingSession, 'assignment_id'),
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Incident status',
                          value:
                              _stringValue(
                                _mapValue(
                                  vm.trackingSession,
                                  'incident_status',
                                ),
                              ) ??
                              '-',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Maps',
                          value:
                              _stringValue(
                                _mapValue(vm.trackingSession, 'maps'),
                              ) ??
                              '-',
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  AssignmentTrackingLivePanel(
                    assignmentId: id,
                    trackingSession: vm.trackingSession,
                    onOpenMap: () {
                      Navigator.of(sheetContext).push(
                        MaterialPageRoute<void>(
                          builder: (_) => AssignmentTrackingPage(
                            assignmentId: id,
                            trackingSession: vm.trackingSession,
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Eventos',
                    style: Theme.of(sheetContext).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 8),
                  if ((vm.trackingEvents?.items.isEmpty ?? true))
                    const EmptyStatePanel(
                      title: 'Sin eventos',
                      subtitle:
                          'Aún no se registran eventos de tracking para esta asignación.',
                      icon: Icons.timeline_rounded,
                    )
                  else
                    ...vm.trackingEvents!.items.map(
                      (event) => Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: SurfaceCard(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      _stringValue(event['event_type']) ?? '-',
                                      style: Theme.of(
                                        sheetContext,
                                      ).textTheme.titleMedium,
                                    ),
                                  ),
                                  Text(_dateValue(event['occurred_at'])),
                                ],
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Lat: ${_stringValue(event['latitude']) ?? '-'}  Lon: ${_stringValue(event['longitude']) ?? '-'}',
                              ),
                              if (_stringValue(event['notes']) != null) ...[
                                const SizedBox(height: 8),
                                Text(_stringValue(event['notes'])!),
                              ],
                            ],
                          ),
                        ),
                      ),
                    ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Object? _mapValue(
    Map<String, dynamic>? map, [
    String? key,
    String? nestedKey,
  ]) {
    if (map == null) return null;
    if (nestedKey == null) return map[key];
    final nested = map[key];
    if (nested is Map) return nested[nestedKey];
    return null;
  }

  String? _nestedStringValue(
    Map<String, dynamic>? map,
    String key,
    String nestedKey,
  ) {
    return _stringValue(_mapValue(map, key, nestedKey));
  }

  String? _stringValue(Object? value) {
    final text = value?.toString().trim();
    if (text == null || text.isEmpty || text == 'null') return null;
    return text;
  }

  String _shortId(Object? value) {
    final text = _stringValue(value);
    if (text == null) return '-';
    return text.length <= 8 ? text : text.substring(0, 8);
  }

  String _dateValue(Object? value) {
    final text = _stringValue(value);
    if (text == null) return '-';
    return text.length >= 10 ? text.substring(0, 10) : text;
  }
}
