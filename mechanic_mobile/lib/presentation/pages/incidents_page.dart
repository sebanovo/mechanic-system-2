import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../../constants/api_enums.dart';
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
  final vehicleController = TextEditingController(
    text: existing?.vehicleId ?? '',
  );
  final titleController = TextEditingController(text: existing?.title ?? '');
  final descriptionController = TextEditingController(
    text: existing?.description ?? '',
  );
  final addressController = TextEditingController(
    text: existing?.addressText ?? '',
  );
  final latController = TextEditingController(
    text: existing?.latitude.toString() ?? '',
  );
  final lngController = TextEditingController(
    text: existing?.longitude.toString() ?? '',
  );
  final serviceCatalogController = TextEditingController(
    text: existing?.serviceCatalogId ?? '',
  );
  var selectedPriority =
      _incidentPriorityFromApi(existing?.priority) ?? IncidentPriority.medium;

  final saved = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: Text(existing == null ? 'Nuevo incidente' : 'Editar incidente'),
      content: SizedBox(
        width: 500,
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: vehicleController,
                  decoration: const InputDecoration(labelText: 'Vehicle ID'),
                  validator: (value) => value == null || value.trim().isEmpty
                      ? 'Requerido'
                      : null,
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: titleController,
                  decoration: const InputDecoration(labelText: 'Título'),
                  validator: (value) => value == null || value.trim().isEmpty
                      ? 'Requerido'
                      : null,
                ),
                const SizedBox(height: 10),
                DropdownButtonFormField<IncidentPriority>(
                  value: selectedPriority,
                  decoration: const InputDecoration(labelText: 'Prioridad'),
                  items: incidentPriorityOptions
                      .map(
                        (item) => DropdownMenuItem<IncidentPriority>(
                          value: item,
                          child: Text(item.label),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    if (value != null) selectedPriority = value;
                  },
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: descriptionController,
                  decoration: const InputDecoration(labelText: 'Descripción'),
                  maxLines: 3,
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: addressController,
                  decoration: const InputDecoration(labelText: 'Dirección'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: latController,
                  decoration: const InputDecoration(labelText: 'Latitud'),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: lngController,
                  decoration: const InputDecoration(labelText: 'Longitud'),
                  keyboardType: TextInputType.number,
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: serviceCatalogController,
                  decoration: const InputDecoration(
                    labelText: 'Service Catalog ID',
                  ),
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
            final input = IncidentUpsertInput(
              vehicleId: vehicleController.text.trim(),
              title: titleController.text.trim(),
              priority: selectedPriority.apiValue,
              description: descriptionController.text.trim().isEmpty
                  ? null
                  : descriptionController.text.trim(),
              addressText: addressController.text.trim().isEmpty
                  ? null
                  : addressController.text.trim(),
              latitude:
                  double.tryParse(latController.text.trim())
                      as double, // forzar double
              longitude:
                  double.tryParse(lngController.text.trim())
                      as double, // forzar double
              serviceCatalogId: serviceCatalogController.text.trim().isEmpty
                  ? null
                  : serviceCatalogController.text.trim(),
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
