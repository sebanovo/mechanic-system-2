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
  final List<String> _validVehicleTypes = [
    'CAR',
    'MOTORCYCLE',
    'TRUCK',
    'VAN',
    'OTHER',
  ];

  @override
  void initState() {
    super.initState();
    _viewModel = sl<VehicleViewModel>();
    _viewModel.loadVehicles();
  }

  String? _validateVehicleType(String value) {
    if (!_validVehicleTypes.contains(value.toUpperCase())) {
      return 'El tipo debe ser: ${_validVehicleTypes.join(', ')}';
    }
    return null;
  }

  String? _validateTextField(String value, String fieldName) {
    if (value.trim().length < 3) {
      return '$fieldName debe tener al menos 3 caracteres';
    }
    return null;
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
    final notesController = TextEditingController(text: vehicle?.notes ?? '');

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(vehicle == null ? 'Nuevo vehículo' : 'Editar vehículo'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: plateController,
                  decoration: const InputDecoration(labelText: 'Placa *'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: typeController.text,
                  decoration: const InputDecoration(labelText: 'Tipo *'),
                  items: _validVehicleTypes.map((type) {
                    return DropdownMenuItem(value: type, child: Text(type));
                  }).toList(),
                  onChanged: (value) {
                    if (value != null) typeController.text = value;
                  },
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: brandController,
                  decoration: const InputDecoration(labelText: 'Marca *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: modelController,
                  decoration: const InputDecoration(labelText: 'Modelo *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: yearController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Año *'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: colorController,
                  decoration: const InputDecoration(labelText: 'Color *'),
                ),
                const SizedBox(height: 8),
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

    // Validaciones solo al guardar
    final errors = <String>[];

    // Validar placa
    final plateError = _validateTextField(plateController.text, 'Placa');
    if (plateError != null) errors.add(plateError);

    // Validar tipo de vehículo
    final typeError = _validateVehicleType(typeController.text);
    if (typeError != null) errors.add(typeError);

    // Validar marca
    final brandError = _validateTextField(brandController.text, 'Marca');
    if (brandError != null) errors.add(brandError);

    // Validar modelo
    final modelError = _validateTextField(modelController.text, 'Modelo');
    if (modelError != null) errors.add(modelError);

    // Validar año
    final yearText = yearController.text.trim();
    final year = int.tryParse(yearText);
    if (yearText.isEmpty) {
      errors.add('El año es obligatorio');
    } else if (year == null || year < 1900 || year > DateTime.now().year + 1) {
      errors.add(
        'Ingrese un año válido (entre 1900 y ${DateTime.now().year + 1})',
      );
    }

    // Validar color
    final colorError = _validateTextField(colorController.text, 'Color');
    if (colorError != null) errors.add(colorError);

    // Notas: opcional pero si tiene contenido debe tener al menos 3 caracteres
    final notes = notesController.text.trim();
    if (notes.isNotEmpty && notes.length < 3) {
      errors.add('Las notas deben tener al menos 3 caracteres');
    }

    if (errors.isNotEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: errors.map((e) => Text('• $e')).toList(),
          ),
          backgroundColor: Colors.red.shade700,
          behavior: SnackBarBehavior.floating,
          duration: const Duration(seconds: 3),
        ),
      );
      return;
    }

    final body = {
      "plate_number": plateController.text.trim(),
      "vehicle_type": typeController.text.trim().toUpperCase(),
      "brand": brandController.text.trim(),
      "model": modelController.text.trim(),
      "year": year,
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
                    ? 'Vehículo registrado'
                    : 'Vehículo actualizado')
              : (_viewModel.errorMessage ?? 'No se pudo guardar'),
        ),
        backgroundColor: ok ? Colors.green.shade700 : Colors.red.shade700,
      ),
    );

    if (ok) {
      _viewModel.loadVehicles();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mis vehículos')),
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
            return const Center(child: Text('Aún no registraste vehículos.'));
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
        onPressed: () => _openVehicleForm(),
        child: const Icon(Icons.add),
      ),
    );
  }
}
