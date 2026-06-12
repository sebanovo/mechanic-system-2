import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../../constants/api_enums.dart';
import '../../domain/entities/app_entities.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class VehiclesPage extends StatelessWidget {
  const VehiclesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<VehiclesViewModel>();
    if (!vm.loaded && !vm.loading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<VehiclesViewModel>().loadVehicles();
        }
      });
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        SectionHeader(
          title: 'Mis vehículos',
          subtitle: 'Administra placas, estado y datos de mantenimiento.',
          actionLabel: 'Nuevo',
          onAction: () => showVehicleForm(context),
        ),
        const SizedBox(height: 12),
        Align(
          alignment: Alignment.centerRight,
          child: OutlinedButton.icon(
            onPressed: vm.loading
                ? null
                : () => context.read<VehiclesViewModel>().loadVehicles(),
            icon: const Icon(Icons.refresh_rounded),
            label: const Text('Refresh'),
          ),
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
                        Text('Placa ABC-123'),
                        SizedBox(height: 10),
                        Text('SUV - Activo'),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          )
        else if (vm.vehicles?.items.isEmpty ?? true)
          const EmptyStatePanel(
            title: 'No hay vehículos registrados',
            subtitle: 'Crea el primero para poder abrir incidentes.',
            icon: Icons.directions_car_rounded,
          )
        else
          ...vm.vehicles!.items.map(
            (vehicle) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: VehicleCard(
                vehicle: vehicle,
                onTap: () => context.go('/vehicles/${vehicle.id}'),
                onEdit: () => showVehicleForm(context, existing: vehicle),
                onDelete: () => confirmDeleteVehicle(context, vehicle),
              ),
            ),
          ),
      ],
    );
  }
}

Future<void> showVehicleForm(
  BuildContext context, {
  VehicleEntity? existing,
}) async {
  final formKey = GlobalKey<FormState>();
  final plateController = TextEditingController(
    text: existing?.plateNumber ?? '',
  );
  final brandController = TextEditingController(text: existing?.brand ?? '');
  final modelController = TextEditingController(text: existing?.model ?? '');
  final yearController = TextEditingController(
    text: existing?.year?.toString() ?? '',
  );
  final colorController = TextEditingController(text: existing?.color ?? '');
  var selectedVehicleType =
      _vehicleTypeFromApi(existing?.vehicleType) ?? VehicleType.car;
  var selectedVehicleStatus =
      _vehicleStatusFromApi(existing?.status) ?? VehicleStatus.active;

  final saved = await showDialog<bool>(
    context: context,
    builder: (dialogContext) {
      return AlertDialog(
        title: Text(existing == null ? 'Nuevo vehículo' : 'Editar vehículo'),
        content: SizedBox(
          width: 500,
          child: SingleChildScrollView(
            child: Form(
              key: formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextFormField(
                    controller: plateController,
                    decoration: const InputDecoration(labelText: 'Placa'),
                    validator: (value) => value == null || value.trim().isEmpty
                        ? 'Requerido'
                        : null,
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<VehicleType>(
                    initialValue: selectedVehicleType,
                    decoration: const InputDecoration(labelText: 'Tipo'),
                    items: vehicleTypeOptions
                        .map(
                          (item) => DropdownMenuItem<VehicleType>(
                            value: item,
                            child: Text(item.label),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value != null) {
                        selectedVehicleType = value;
                      }
                    },
                  ),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<VehicleStatus>(
                    initialValue: selectedVehicleStatus,
                    decoration: const InputDecoration(labelText: 'Estado'),
                    items: vehicleStatusOptions
                        .map(
                          (item) => DropdownMenuItem<VehicleStatus>(
                            value: item,
                            child: Text(item.label),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value != null) {
                        selectedVehicleStatus = value;
                      }
                    },
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: brandController,
                    decoration: const InputDecoration(labelText: 'Marca'),
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: modelController,
                    decoration: const InputDecoration(labelText: 'Modelo'),
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: yearController,
                    decoration: const InputDecoration(labelText: 'Año'),
                    keyboardType: TextInputType.number,
                  ),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: colorController,
                    decoration: const InputDecoration(labelText: 'Color'),
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
              final input = VehicleUpsertInput(
                plateNumber: plateController.text.trim(),
                vehicleType: selectedVehicleType.apiValue,
                // status: selectedVehicleStatus.apiValue,
                brand: brandController.text.trim().isEmpty
                    ? null
                    : brandController.text.trim(),
                model: modelController.text.trim().isEmpty
                    ? null
                    : modelController.text.trim(),
                year: int.tryParse(yearController.text.trim()),
                color: colorController.text.trim().isEmpty
                    ? null
                    : colorController.text.trim(),
              );
              final savedOk = existing == null
                  ? await context.read<VehiclesViewModel>().create(input)
                  : await context.read<VehiclesViewModel>().update(
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
  );

  if (saved == true && context.mounted) {
    _toast(
      context,
      existing == null ? 'Vehículo creado' : 'Vehículo actualizado',
    );
  }
}

Future<void> confirmDeleteVehicle(
  BuildContext context,
  VehicleEntity vehicle,
) async {
  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Eliminar vehículo'),
      content: Text('¿Eliminar ${vehicle.plateNumber}?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.of(dialogContext).pop(true),
          child: const Text('Eliminar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    final removed = await context.read<VehiclesViewModel>().remove(vehicle.id);
    if (context.mounted) {
      _toast(context, removed ? 'Vehículo eliminado' : 'No se pudo eliminar');
    }
  }
}

VehicleType? _vehicleTypeFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'CAR':
      return VehicleType.car;
    case 'MOTORCYCLE':
      return VehicleType.motorcycle;
    case 'TRUCK':
      return VehicleType.truck;
    case 'VAN':
      return VehicleType.van;
    case 'SUV':
      return VehicleType.suv;
    case 'OTHER':
      return VehicleType.other;
    default:
      return null;
  }
}

VehicleStatus? _vehicleStatusFromApi(String? value) {
  switch ((value ?? '').toUpperCase()) {
    case 'ACTIVE':
      return VehicleStatus.active;
    case 'INACTIVE':
      return VehicleStatus.inactive;
    default:
      return null;
  }
}

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}
