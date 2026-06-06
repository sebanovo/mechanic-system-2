import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../utils/api_enum_labels.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';
import 'vehicles_page.dart';

class VehicleDetailPage extends StatelessWidget {
  const VehicleDetailPage({super.key, required this.vehicleId});

  final String vehicleId;

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<VehiclesViewModel>();
    final vehicle = vm.selectedVehicle?.vehicle;
    if (!vm.detailLoaded && !vm.detailLoading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<VehiclesViewModel>().loadVehicle(vehicleId);
        }
      });
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del vehículo'),
        actions: [
          IconButton(
            onPressed: vehicle == null ? null : () => showVehicleForm(context, existing: vehicle),
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
                : vehicle == null
                    ? const EmptyStatePanel(
                        title: 'Vehículo no encontrado',
                        subtitle: 'Regresa al listado para cargar otro registro.',
                        icon: Icons.directions_car_rounded,
                      )
                    : ListView(
                        children: [
                          SurfaceCard(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        vehicle.plateNumber,
                                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 24),
                                      ),
                                    ),
                                    StatusBadge(label: vehicleStatusLabelFromApi(vehicle.status)),
                                  ],
                                ),
                                const SizedBox(height: 10),
                                Text(
                                  '${vehicleTypeLabelFromApi(vehicle.vehicleType)} - ${vehicle.brand ?? 'Sin marca'}',
                                  style: Theme.of(context).textTheme.bodyLarge,
                                ),
                                const SizedBox(height: 18),
                                InfoRow(label: 'Modelo', value: vehicle.model ?? '-'),
                                const Divider(height: 24),
                                InfoRow(label: 'Año', value: vehicle.year?.toString() ?? '-'),
                                const Divider(height: 24),
                                InfoRow(label: 'Color', value: vehicle.color ?? '-'),
                                const Divider(height: 24),
                                InfoRow(label: 'Creado', value: _formatDate(vehicle.createdAt)),
                              ],
                            ),
                          ),
                          const SizedBox(height: 12),
                          SurfaceCard(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Cliente asociado', style: Theme.of(context).textTheme.titleLarge),
                                const SizedBox(height: 10),
                                Text(_customerName(vm.selectedVehicle?.customer), style: Theme.of(context).textTheme.bodyLarge),
                              ],
                            ),
                          ),
                          const SizedBox(height: 12),
                          ElevatedButton.icon(
                            onPressed: () async {
                              final ok = await context.read<VehiclesViewModel>().remove(vehicleId);
                              if (!context.mounted) return;
                              if (ok) context.pop();
                            },
                            icon: const Icon(Icons.delete_rounded),
                            label: const Text('Eliminar vehículo'),
                          ),
                        ],
                      ),
      ),
    );
  }
}

String _formatDate(DateTime? value) {
  if (value == null) return '-';
  return '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}';
}

String _customerName(Map<String, dynamic>? customer) {
  if (customer == null || customer.isEmpty) return 'Cliente asociado';
  final user = customer['user'];
  if (user is Map) {
    final map = Map<String, dynamic>.from(user);
    final firstName = map['first_name']?.toString() ?? '';
    final lastName = map['last_name']?.toString() ?? '';
    final full = '$firstName $lastName'.trim();
    if (full.isNotEmpty) return full;
    if (map['email'] != null) return map['email'].toString();
  }
  return 'Cliente asociado';
}
