import 'package:flutter/material.dart';

import '../../../core/di/injection_container.dart';
import '../../../domain/entities/vehicle.dart';
import '../viewmodels/vehicle_viewmodel.dart';

class VehiclesPage extends StatefulWidget {
  const VehiclesPage({super.key});

  @override
  State<VehiclesPage> createState() => _VehiclesPageState();
}

class _VehiclesPageState extends State<VehiclesPage> {
  late final VehicleViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<VehicleViewModel>();
    _viewModel.loadVehicles();
  }

  Future<void> _openVehicleForm({Vehicle? vehicle}) async {
    final plateController = TextEditingController(text: vehicle?.plateNumber);
    final typeController = TextEditingController(
      text: vehicle?.vehicleType ?? 'CAR',
    );
    final brandController = TextEditingController(text: vehicle?.brand);
    final modelController = TextEditingController(text: vehicle?.model);
    final yearController = TextEditingController(
      text: vehicle != null ? vehicle.year.toString() : '',
    );
    final colorController = TextEditingController(text: vehicle?.color);
    final notesController = TextEditingController(text: vehicle?.notes);

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(vehicle == null ? 'Nuevo vehiculo' : 'Editar vehiculo'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: plateController,
                  decoration: const InputDecoration(labelText: 'Placa'),
                ),
                TextField(
                  controller: typeController,
                  decoration: const InputDecoration(labelText: 'Tipo'),
                ),
                TextField(
                  controller: brandController,
                  decoration: const InputDecoration(labelText: 'Marca'),
                ),
                TextField(
                  controller: modelController,
                  decoration: const InputDecoration(labelText: 'Modelo'),
                ),
                TextField(
                  controller: yearController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Anio'),
                ),
                TextField(
                  controller: colorController,
                  decoration: const InputDecoration(labelText: 'Color'),
                ),
                TextField(
                  controller: notesController,
                  decoration: const InputDecoration(labelText: 'Notas'),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text('Guardar'),
            ),
          ],
        );
      },
    );

    if (confirmed != true) return;

    final body = {
      "plate_number": plateController.text.trim(),
      "vehicle_type": typeController.text.trim(),
      "brand": brandController.text.trim(),
      "model": modelController.text.trim(),
      "year": int.tryParse(yearController.text.trim()) ?? 0,
      "color": colorController.text.trim(),
      "notes": notesController.text.trim(),
    };

    final ok = vehicle == null
        ? await _viewModel.createVehicle(body)
        : await _viewModel.updateVehicle(vehicle.id, body);

    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          ok
              ? (vehicle == null
                    ? 'Vehiculo registrado'
                    : 'Vehiculo actualizado')
              : (_viewModel.errorMessage ?? 'No se pudo guardar'),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mis vehiculos')),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.vehicles.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          if (_viewModel.errorMessage != null && _viewModel.vehicles.isEmpty) {
            return Center(child: Text(_viewModel.errorMessage!));
          }

          if (_viewModel.vehicles.isEmpty) {
            return const Center(child: Text('Aun no registraste vehiculos.'));
          }

          return RefreshIndicator(
            onRefresh: _viewModel.loadVehicles,
            child: ListView.builder(
              itemCount: _viewModel.vehicles.length,
              itemBuilder: (context, index) {
                final vehicle = _viewModel.vehicles[index];
                return ListTile(
                  title: Text('${vehicle.brand} ${vehicle.model}'),
                  subtitle: Text(
                    '${vehicle.plateNumber} - ${vehicle.vehicleType} (${vehicle.year})',
                  ),
                  trailing: const Icon(Icons.edit),
                  onTap: () => _openVehicleForm(vehicle: vehicle),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openVehicleForm,
        child: const Icon(Icons.add),
      ),
    );
  }
}
