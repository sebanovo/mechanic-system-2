import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/app_entities.dart';
import '../utils/api_enum_labels.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';
import 'incidents_page.dart';

class IncidentDetailPage extends StatelessWidget {
  const IncidentDetailPage({super.key, required this.incidentId});

  final String incidentId;

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<IncidentsViewModel>();
    final incident = vm.selectedIncident;
    if (!vm.detailLoaded && !vm.detailLoading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<IncidentsViewModel>().loadIncident(incidentId);
        }
      });
    }

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          tooltip: 'Volver atrás',
          onPressed: () async {
            final popped = await Navigator.of(context).maybePop();
            if (!popped && context.mounted) {
              context.go('/home');
            }
          },
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        title: const Text('Detalle del incidente'),
        actions: [
          IconButton(
            onPressed: incident == null
                ? null
                : () => showIncidentForm(context, existing: incident),
            icon: const Icon(Icons.edit_rounded),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        child: vm.detailLoading
            ? const Center(child: CircularProgressIndicator())
            : vm.error != null
            ? ErrorBanner(message: vm.error!)
            : incident == null
            ? const EmptyStatePanel(
                title: 'Incidente no encontrado',
                subtitle: 'Regresa al listado para cargar otro registro.',
                icon: Icons.sos_rounded,
              )
            : ListView(
                children: [
                  if (incident.raw['offline_state'] != null) ...[
                    SurfaceCard(
                      child: Row(
                        children: [
                          Icon(
                            Icons.cloud_off_rounded,
                            color: Theme.of(context).colorScheme.error,
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              'Este incidente aún está pendiente de sincronización.',
                              style: Theme.of(context).textTheme.bodyMedium
                                  ?.copyWith(fontWeight: FontWeight.w700),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 12),
                  ],
                  SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                incident.title,
                                style: Theme.of(context)
                                    .textTheme
                                    .headlineMedium
                                    ?.copyWith(fontSize: 24),
                              ),
                            ),
                            StatusBadge(
                              label: incidentStatusLabelFromApi(
                                incident.status,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          incident.incidentCode,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 18),
                        InfoRow(label: 'Vehículo', value: incident.vehicleId),
                        const Divider(height: 24),
                        InfoRow(label: 'Prioridad', value: incident.priority),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Ubicación',
                          value: '${incident.latitude}, ${incident.longitude}',
                        ),
                        const Divider(height: 24),
                        InfoRow(
                          label: 'Reportado',
                          value: _formatDate(incident.reportedAt),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),
                  if (incident.addressText != null)
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Dirección',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 10),
                          Text(
                            incident.addressText!,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ],
                      ),
                    ),
                  if (incident.description != null) ...[
                    const SizedBox(height: 12),
                    SurfaceCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Descripción',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 10),
                          Text(
                            incident.description!,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ],
                      ),
                    ),
                  ],
                  const SizedBox(height: 12),
                  ElevatedButton.icon(
                    onPressed: () async {
                      final ok = await context
                          .read<IncidentsViewModel>()
                          .cancel(incidentId, const IncidentCancelInput());
                      if (!context.mounted) return;
                      if (ok) {
                        final popped = await Navigator.of(context).maybePop();
                        if (!popped && context.mounted) {
                          context.go('/home');
                        }
                      }
                    },
                    icon: const Icon(Icons.cancel_rounded),
                    label: const Text('Cancelar incidente'),
                  ),
                ],
              ),
      ),
    );
  }
}

Future<void> showAiAnalysisDialog(
  BuildContext context,
  Map<String, dynamic> analysis,
) async {
  await showDialog<void>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Análisis IA'),
      content: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            _analysisRow('Versión', analysis['analysis_version']),
            _analysisRow('Resultado', analysis['analysis_result']),
            _analysisRow(
              'Probable servicio',
              analysis['probable_service_code'],
            ),
            _analysisRow('Problema probable', analysis['probable_problem']),
            _analysisRow('Confianza', analysis['confidence_score']),
            _analysisRow('Precio mínimo', analysis['estimated_min_price']),
            _analysisRow('Precio máximo', analysis['estimated_max_price']),
            _analysisRow(
              'Duración mínima',
              analysis['estimated_min_duration_minutes'],
            ),
            _analysisRow(
              'Duración máxima',
              analysis['estimated_max_duration_minutes'],
            ),
            _analysisRow(
              'Prioridad recomendada',
              analysis['recommended_priority'],
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(),
          child: const Text('Cerrar'),
        ),
      ],
    ),
  );
}

Widget _analysisRow(String label, Object? value) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: Text('$label: ${value ?? "-"}'),
  );
}

String _formatDate(DateTime? value) {
  if (value == null) return '-';
  return '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}';
}
