import 'package:geolocator/geolocator.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';
import 'package:speech_to_text/speech_to_text.dart';

import '../../constants/api_enums.dart';
import '../../domain/entities/app_entities.dart';
import '../../domain/entities/vehicle_entity.dart';
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

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        SectionHeader(
          title: 'Incidentes',
          subtitle: 'Crea, revisa y cancela reportes de auxilio.',
          actionLabel: 'Nuevo',
          onAction: () => showIncidentForm(context),
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
  final vehicleController = TextEditingController(text: existing?.vehicleId ?? '');
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
        final vehicleIds = vehicles.map((vehicle) => vehicle.id).toSet();
        final selectedVehicleId = vehicleController.text.isEmpty ||
                !vehicleIds.contains(vehicleController.text)
            ? null
            : vehicleController.text;
        return AlertDialog(
          title: Text(existing == null ? 'Nuevo incidente' : 'Editar incidente'),
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
                    DropdownButtonFormField<String>(
                      value: selectedVehicleId,
                      isExpanded: true,
                      menuMaxHeight: 320,
                      decoration: const InputDecoration(
                        labelText: 'Vehículo',
                        helperText: 'Selecciona el vehículo afectado.',
                      ),
                      items: vehicles
                          .map(
                            (vehicle) => DropdownMenuItem<String>(
                              value: vehicle.id,
                              child: _vehicleOptionLabel(vehicle),
                            ),
                          )
                          .toList(),
                      onChanged: (value) {
                        vehicleController.text = value ?? '';
                        setState(() {});
                      },
                      validator: (value) => value == null || value.trim().isEmpty
                          ? 'Selecciona un vehículo'
                          : null,
                    ),
                    const SizedBox(height: 10),
                    DropdownButtonFormField<IncidentPriority>(
                      value: selectedPriority,
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
                          tooltip: isListening ? 'Detener dictado' : 'Dictar descripción',
                          icon: Icon(
                            isListening ? Icons.mic_off_rounded : Icons.mic_rounded,
                            color: isListening ? Colors.red : null,
                          ),
                          onPressed: () async {
                            if (!speechReady) {
                              speechReady = await speech.initialize(
                                onStatus: (status) {
                                  if (!sheetContext.mounted) return;
                                  if (status == 'done' || status == 'notListening') {
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
                              listenMode: ListenMode.confirmation,
                              onResult: (result) {
                                if (!sheetContext.mounted) return;
                                descriptionController.text = result.recognizedWords;
                                descriptionController.selection = TextSelection.collapsed(
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
                      validator: (value) => value == null || value.trim().isEmpty
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
                              helperText: 'Se completa manualmente o con ubicación actual.',
                            ),
                            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
                            validator: (value) => _validateCoordinate(value, -90, 90),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: TextFormField(
                            controller: lngController,
                            decoration: const InputDecoration(
                              labelText: 'Longitud',
                              helperText: 'Se completa manualmente o con ubicación actual.',
                            ),
                            keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
                            validator: (value) => _validateCoordinate(value, -180, 180),
                          ),
                        ),
                        const SizedBox(width: 8),
                        IconButton.filledTonal(
                          tooltip: 'Usar ubicación actual',
                          onPressed: () async {
                            try {
                              final position = await _resolveCurrentPosition();
                              if (!sheetContext.mounted) return;
                              latController.text = position.latitude.toString();
                              lngController.text = position.longitude.toString();
                              setState(() {});
                            } catch (exception) {
                              formError = exception.toString().replaceFirst('Exception: ', '');
                              setState(() {});
                            }
                          },
                          icon: const Icon(Icons.my_location_rounded),
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
    _toast(
      context,
      existing == null ? 'Incidente creado' : 'Incidente actualizado',
    );
  }
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

Widget _vehicleOptionLabel(VehicleEntity vehicle) {
  final parts = <String>[
    vehicle.plateNumber,
    if ((vehicle.brand ?? '').trim().isNotEmpty) vehicle.brand!.trim(),
    if ((vehicle.model ?? '').trim().isNotEmpty) vehicle.model!.trim(),
    if (vehicle.year != null) vehicle.year.toString(),
    if ((vehicle.vehicleType).trim().isNotEmpty) vehicle.vehicleType,
  ];
  final subtitle = parts.where((part) => part.trim().isNotEmpty).join(' • ');
  return SizedBox(
    width: double.infinity,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          vehicle.plateNumber,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        Text(
          subtitle,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(fontSize: 12),
        ),
      ],
    ),
  );
}

String? _validateCoordinate(String? value, num min, num max) {
  final parsed = double.tryParse((value ?? '').trim());
  if (parsed == null) return 'Ingresa un número válido';
  if (parsed < min || parsed > max) return 'Fuera de rango';
  return null;
}

Future<Position> _resolveCurrentPosition() async {
  final enabled = await Geolocator.isLocationServiceEnabled();
  if (!enabled) {
    throw Exception('Activa la ubicación para usar coordenadas actuales.');
  }
  var permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
  }
  if (permission == LocationPermission.denied) {
    throw Exception('Permiso de ubicación denegado.');
  }
  if (permission == LocationPermission.deniedForever) {
    throw Exception('El permiso de ubicación está bloqueado en el sistema.');
  }
  return Geolocator.getCurrentPosition(
    desiredAccuracy: LocationAccuracy.high,
  );
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
