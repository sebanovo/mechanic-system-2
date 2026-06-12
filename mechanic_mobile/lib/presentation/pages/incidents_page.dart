import 'package:geolocator/geolocator.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';
import 'package:speech_to_text/speech_to_text.dart';

import '../../constants/api_enums.dart';
import '../../core/di/injection_container.dart';
import '../../core/services/geolocation_service.dart';
import '../../domain/entities/app_entities.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class IncidentsPage extends StatelessWidget {
  const IncidentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<IncidentsViewModel>();
    if (!vm.loaded && !vm.loading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<IncidentsViewModel>().loadIncidents();
        }
      });
    }

    return RefreshIndicator(
      onRefresh: () => context.read<IncidentsViewModel>().loadIncidents(),
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SectionHeader(
            title: 'Incidentes',
            subtitle: 'Crea, revisa y cancela reportes de auxilio.',
            actionLabel: 'Nuevo',
            onAction: () => showIncidentForm(context),
          ),
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.centerRight,
            child: IconButton.filledTonal(
              onPressed: vm.loading
                  ? null
                  : () => context.read<IncidentsViewModel>().loadIncidents(),
              icon: const Icon(Icons.refresh_rounded),
            ),
          ),
          const SizedBox(height: 12),
          if (vm.error != null) ...[
            ErrorBanner(message: vm.error!),
            const SizedBox(height: 12),
          ],
          if (vm.loading)
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
                          Text('Grúa solicitada'),
                          SizedBox(height: 10),
                          Text('Estado pendiente'),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            )
          else if (vm.incidents?.items.isEmpty ?? true)
            const EmptyStatePanel(
              title: 'No hay incidentes activos',
              subtitle: 'Cuando exista una emergencia se listará aquí.',
              icon: Icons.sos_rounded,
            )
          else
            ...vm.incidents!.items.map(
              (incident) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: IncidentCard(
                  incident: incident,
                  onTap: () => context.go('/incidents/${incident.id}'),
                  onEdit: () => showIncidentForm(context, existing: incident),
                  onCancel: () => confirmCancelIncident(context, incident),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

Future<void> showIncidentForm(
  BuildContext context, {
  IncidentEntity? existing,
}) async {
  final formKey = GlobalKey<FormState>();
  final vehiclesVm = context.read<VehiclesViewModel>();
  if (!vehiclesVm.loaded && !vehiclesVm.loading) {
    await vehiclesVm.loadVehicles();
  }
  final vehicleController = TextEditingController(
    text: existing?.vehicleId ?? '',
  );
  final descriptionController = TextEditingController(
    text: existing?.description ?? '',
  );
  final latController = TextEditingController(
    text: existing == null ? '' : existing.latitude.toString(),
  );
  final lngController = TextEditingController(
    text: existing == null ? '' : existing.longitude.toString(),
  );
  var selectedPriority =
      _incidentPriorityFromApi(existing?.priority) ?? IncidentPriority.medium;
  final speech = SpeechToText();
  var isListening = false;
  var speechReady = false;
  String? formError;

  final saved = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => StatefulBuilder(
      builder: (sheetContext, setState) {
        final vehicles = vehiclesVm.vehicles?.items ?? const <VehicleEntity>[];
        VehicleEntity? selectedVehicle;
        for (final vehicle in vehicles) {
          if (vehicle.id == vehicleController.text) {
            selectedVehicle = vehicle;
            break;
          }
        }
        return AlertDialog(
          title: Text(
            existing == null ? 'Nuevo incidente' : 'Editar incidente',
          ),
          content: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 640),
            child: SingleChildScrollView(
              child: Form(
                key: formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (formError != null) ...[
                      ErrorBanner(message: formError!),
                      const SizedBox(height: 12),
                    ],
                    _vehiclePickerCard(
                      context,
                      helper: 'Selecciona el vehículo afectado.',
                      value: selectedVehicle == null
                          ? 'Selecciona un vehículo'
                          : _vehicleSelectionLabel(selectedVehicle),
                      detail: selectedVehicle == null
                          ? 'Elige el vehículo afectado por el incidente.'
                          : _vehicleSelectionDetail(selectedVehicle),
                      icon: Icons.directions_car_rounded,
                      onTap: () async {
                        final chosen = await _pickVehicle(
                          context,
                          vehicles: vehicles,
                        );
                        if (!sheetContext.mounted || chosen == null) return;
                        vehicleController.text = chosen.id;
                        setState(() {});
                      },
                    ),
                    const SizedBox(height: 10),
                    DropdownButtonFormField<IncidentPriority>(
                      initialValue: selectedPriority,
                      decoration: const InputDecoration(
                        labelText: 'Prioridad',
                        helperText: 'Marca la severidad del incidente.',
                      ),
                      items: incidentPriorityOptions
                          .map(
                            (item) => DropdownMenuItem<IncidentPriority>(
                              value: item,
                              child: Text(item.label),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        if (value != null) {
                          selectedPriority = value;
                          setState(() {});
                        }
                      },
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: descriptionController,
                      decoration: InputDecoration(
                        labelText: 'Descripción',
                        helperText: 'Describe brevemente qué ocurrió.',
                        suffixIcon: IconButton(
                          tooltip: isListening
                              ? 'Detener dictado'
                              : 'Dictar descripción',
                          icon: Icon(
                            isListening
                                ? Icons.mic_off_rounded
                                : Icons.mic_rounded,
                            color: isListening ? Colors.red : null,
                          ),
                          onPressed: () async {
                            if (!speechReady) {
                              speechReady = await speech.initialize(
                                onStatus: (status) {
                                  if (!sheetContext.mounted) return;
                                  if (status == 'done' ||
                                      status == 'notListening') {
                                    setState(() => isListening = false);
                                  }
                                },
                                onError: (_) {
                                  if (!sheetContext.mounted) return;
                                  setState(() => isListening = false);
                                },
                              );
                            }
                            if (!speechReady) {
                              formError = 'No se pudo activar el micrófono.';
                              setState(() {});
                              return;
                            }
                            if (isListening) {
                              await speech.stop();
                              setState(() => isListening = false);
                              return;
                            }
                            await speech.listen(
                              listenOptions: SpeechListenOptions(
                                listenMode: ListenMode.confirmation,
                              ),
                              onResult: (result) {
                                if (!sheetContext.mounted) return;
                                descriptionController.text =
                                    result.recognizedWords;
                                descriptionController.selection =
                                    TextSelection.collapsed(
                                      offset: descriptionController.text.length,
                                    );
                                setState(() {});
                              },
                            );
                            setState(() => isListening = true);
                          },
                        ),
                      ),
                      maxLines: 4,
                      validator: (value) =>
                          value == null || value.trim().isEmpty
                          ? 'Describe el incidente'
                          : null,
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Expanded(
                          child: TextFormField(
                            controller: latController,
                            decoration: const InputDecoration(
                              labelText: 'Latitud',
                              helperText:
                                  'Se completa manualmente o con ubicación actual.',
                            ),
                            keyboardType: const TextInputType.numberWithOptions(
                              decimal: true,
                              signed: true,
                            ),
                            validator: (value) =>
                                _validateCoordinate(value, -90, 90),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: TextFormField(
                            controller: lngController,
                            decoration: const InputDecoration(
                              labelText: 'Longitud',
                              helperText:
                                  'Se completa manualmente o con ubicación actual.',
                            ),
                            keyboardType: const TextInputType.numberWithOptions(
                              decimal: true,
                              signed: true,
                            ),
                            validator: (value) =>
                                _validateCoordinate(value, -180, 180),
                          ),
                        ),
                        const SizedBox(width: 8),
                        SizedBox(
                          width: 48,
                          height: 48,
                          child: IconButton.filledTonal(
                            tooltip: 'Usar GPS',
                            onPressed: () async {
                              try {
                                final position = await _resolveCurrentPosition();
                                if (!sheetContext.mounted) return;
                                latController.text = position.latitude.toString();
                                lngController.text = position.longitude.toString();
                                setState(() {});
                                showAppSnackBar(
                                  sheetContext,
                                  'GPS aplicado: ${position.latitude.toStringAsFixed(6)}, ${position.longitude.toStringAsFixed(6)}',
                                );
                              } catch (exception) {
                                formError = exception.toString().replaceFirst(
                                  'Exception: ',
                                  '',
                                );
                                setState(() {});
                              }
                            },
                            icon: const Icon(Icons.my_location_rounded),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'El backend normaliza la información y puede disparar análisis IA después de guardar.',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(false),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () async {
                if (!formKey.currentState!.validate()) return;
                if (vehicleController.text.trim().isEmpty) {
                  formError = 'Selecciona un vehículo';
                  setState(() {});
                  return;
                }
                final latitude = double.tryParse(latController.text.trim());
                final longitude = double.tryParse(lngController.text.trim());
                if (latitude == null || longitude == null) {
                  formError = 'Latitud y longitud deben ser números válidos.';
                  setState(() {});
                  return;
                }
                final input = IncidentUpsertInput(
                  vehicleId: vehicleController.text.trim(),
                  priority: selectedPriority.apiValue,
                  description: descriptionController.text.trim().isEmpty
                      ? null
                      : descriptionController.text.trim(),
                  latitude: latitude,
                  longitude: longitude,
                );
                final savedOk = existing == null
                    ? await context.read<IncidentsViewModel>().create(input)
                    : await context.read<IncidentsViewModel>().update(
                        existing.id,
                        input,
                      );
                if (!dialogContext.mounted) return;
                Navigator.of(dialogContext).pop(savedOk);
              },
              child: const Text('Guardar'),
            ),
          ],
        );
      },
    ),
  );

  if (saved == true && context.mounted) {
    final feedback = context.read<IncidentsViewModel>().message;
    _toast(
      context,
      feedback ??
          (existing == null ? 'Incidente creado' : 'Incidente actualizado'),
    );
  }
}

Future<VehicleEntity?> _pickVehicle(
  BuildContext context, {
  required List<VehicleEntity> vehicles,
}) {
  return showModalBottomSheet<VehicleEntity>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(sheetContext).viewInsets.bottom,
        ),
        child: _VehiclePickerSheet(vehicles: vehicles),
      );
    },
  );
}

String _vehicleSelectionLabel(VehicleEntity vehicle) {
  final parts = <String>[
    vehicle.plateNumber,
    if ((vehicle.brand ?? '').trim().isNotEmpty) vehicle.brand!.trim(),
    if ((vehicle.model ?? '').trim().isNotEmpty) vehicle.model!.trim(),
  ];
  return parts.where((part) => part.trim().isNotEmpty).join(' • ');
}

String _vehicleSelectionDetail(VehicleEntity vehicle) {
  final parts = <String>[
    if (vehicle.vehicleType.trim().isNotEmpty) vehicle.vehicleType.trim(),
    if (vehicle.year != null) vehicle.year.toString(),
    if ((vehicle.color ?? '').trim().isNotEmpty) vehicle.color!.trim(),
  ];
  return parts.where((part) => part.trim().isNotEmpty).join(' • ');
}

Future<void> confirmCancelIncident(
  BuildContext context,
  IncidentEntity incident,
) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Cancelar incidente'),
      content: Text('¿Cancelar ${incident.title}?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('No'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.of(dialogContext).pop(true),
          child: const Text('Sí, cancelar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    final cancelled = await context.read<IncidentsViewModel>().cancel(
      incident.id,
      const IncidentCancelInput(),
    );
    if (context.mounted) {
      _toast(
        context,
        cancelled ? 'Incidente cancelado' : 'No se pudo cancelar',
      );
    }
  }
}

Widget _vehiclePickerCard(
  BuildContext context, {
  required String value,
  required String detail,
  required String helper,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return Material(
    color: Colors.transparent,
    child: InkWell(
      borderRadius: BorderRadius.circular(22),
      onTap: onTap,
      child: SurfaceCard(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: Theme.of(context).colorScheme.primary),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Vehículo',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              value,
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 4),
            Text(helper, style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 6),
            Text(
              detail,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
            ),
          ],
        ),
      ),
    ),
  );
}

class _VehiclePickerSheet extends StatelessWidget {
  const _VehiclePickerSheet({required this.vehicles});

  final List<VehicleEntity> vehicles;

  @override
  Widget build(BuildContext context) {
    return _SheetScaffold(
      title: 'Seleccionar vehículo',
      children: vehicles.isEmpty
          ? const [
              EmptyStatePanel(
                title: 'Sin vehículos',
                subtitle: 'Primero registra un vehículo en tu perfil.',
                icon: Icons.directions_car_rounded,
              ),
            ]
          : vehicles
                .map(
                  (vehicle) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: InkWell(
                      borderRadius: BorderRadius.circular(20),
                      onTap: () => Navigator.of(context).pop(vehicle),
                      child: SurfaceCard(
                        padding: const EdgeInsets.all(14),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _vehicleSelectionLabel(vehicle),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: Theme.of(context).textTheme.titleMedium
                                  ?.copyWith(fontWeight: FontWeight.w800),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              _vehicleSelectionDetail(vehicle),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: Theme.of(context).textTheme.bodySmall,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                )
                .toList(),
    );
  }
}

class _SheetScaffold extends StatelessWidget {
  const _SheetScaffold({required this.title, required this.children});

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: ListView(
        shrinkWrap: true,
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 24),
        children: [
          Center(
            child: Container(
              width: 42,
              height: 5,
              decoration: BoxDecoration(
                color: const Color(0xFFD6E2F7),
                borderRadius: BorderRadius.circular(100),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(title, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 14),
          ...children,
        ],
      ),
    );
  }
}

String? _validateCoordinate(String? value, num min, num max) {
  final parsed = double.tryParse((value ?? '').trim());
  if (parsed == null) return 'Ingresa un número válido';
  if (parsed < min || parsed > max) return 'Fuera de rango';
  return null;
}

Future<Position> _resolveCurrentPosition() async {
  return sl<GeolocationService>().resolveCurrentPosition();
}

IncidentPriority? _incidentPriorityFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'LOW':
      return IncidentPriority.low;
    case 'MEDIUM':
      return IncidentPriority.medium;
    case 'HIGH':
      return IncidentPriority.high;
    case 'CRITICAL':
      return IncidentPriority.critical;
    default:
      return null;
  }
}

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}
