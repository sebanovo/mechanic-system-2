import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/usecases/create_incident_usecase.dart';
import 'package:mechanic_mobile/presentation/viewmodels/incidents_viewmodel.dart';
import 'package:mechanic_mobile/presentation/viewmodels/vehicle_viewmodel.dart';

class CreateIncidentPage extends StatefulWidget {
  const CreateIncidentPage({super.key});

  @override
  State<CreateIncidentPage> createState() => _CreateIncidentPageState();
}

class _CreateIncidentPageState extends State<CreateIncidentPage> {
  late IncidentsViewModel _incidentsViewModel;
  late VehicleViewModel _vehicleViewModel;

  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _addressController = TextEditingController();
  final _latitudeController = TextEditingController();
  final _longitudeController = TextEditingController();

  String? _selectedVehicleId;
  String _selectedCategory = 'BATTERY';
  String _selectedPriority = 'MEDIUM';

  final List<String> _categories = [
    'BATTERY',
    'ENGINE',
    'TIRE',
    'TOWING',
    'LOCKOUT',
    'OVERHEATING',
    'ACCIDENT',
    'ELECTRICAL',
    'FUEL',
  ];
  final List<String> _priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

  @override
  void initState() {
    super.initState();
    _incidentsViewModel = sl<IncidentsViewModel>();
    _vehicleViewModel = sl<VehicleViewModel>();
    _vehicleViewModel.loadVehicles();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _addressController.dispose();
    _latitudeController.dispose();
    _longitudeController.dispose();
    super.dispose();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline : Icons.check_circle_outline,
              color: Colors.white,
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(message)),
          ],
        ),
        backgroundColor: isError ? Colors.red.shade700 : Colors.blue.shade700,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        margin: const EdgeInsets.all(12),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  /// Método actualizado usando la API correcta de geolocator
  Future<void> _getCurrentLocation() async {
    try {
      // Verificar si los servicios de ubicación están activos
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _showSnackBar(
          'Los servicios de ubicación están desactivados. Actívalos para continuar.',
          isError: true,
        );
        return;
      }

      // Verificar permisos
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _showSnackBar(
            'Permiso de ubicación denegado. No se puede obtener la ubicación.',
            isError: true,
          );
          return;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        _showSnackBar(
          'Permiso de ubicación denegado permanentemente. Ve a ajustes de la app para habilitarlo.',
          isError: true,
        );
        return;
      }

      _showSnackBar('Obteniendo ubicación...');

      // Configuración de precisión
      const locationSettings = LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 100, // metros
      );

      // Obtener posición actual con la API correcta
      Position position = await Geolocator.getCurrentPosition(
        locationSettings: locationSettings,
      );

      // Actualizar campos de latitud y longitud
      setState(() {
        _latitudeController.text = position.latitude.toStringAsFixed(6);
        _longitudeController.text = position.longitude.toStringAsFixed(6);
      });

      _showSnackBar(
        'Ubicación obtenida: ${position.latitude.toStringAsFixed(4)}, ${position.longitude.toStringAsFixed(4)}',
      );
    } catch (e) {
      _showSnackBar('Error al obtener ubicación: $e', isError: true);
    }
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;
    if (_selectedVehicleId == null) {
      _showSnackBar('Selecciona un vehículo', isError: true);
      return;
    }

    final latitude = double.tryParse(_latitudeController.text);
    final longitude = double.tryParse(_longitudeController.text);

    if (latitude == null || longitude == null) {
      _showSnackBar('Ingresa coordenadas válidas', isError: true);
      return;
    }

    final params = CreateIncidentParams(
      vehicleId: _selectedVehicleId!,
      title: _titleController.text.trim(),
      description: _descriptionController.text.trim(),
      reportedCategory: _selectedCategory,
      priority: _selectedPriority,
      incidentLatitude: latitude,
      incidentLongitude: longitude,
      addressReference: _addressController.text.trim(),
    );

    final success = await _incidentsViewModel.createIncident(params);

    if (success && mounted) {
      _showSnackBar('Solicitud creada exitosamente');
      context.go('/incidents');
    } else if (mounted) {
      _showSnackBar(
        _incidentsViewModel.errorMessage ?? 'Error al crear solicitud',
        isError: true,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nueva Solicitud'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      body: ListenableBuilder(
        listenable: _vehicleViewModel,
        builder: (context, _) {
          if (_vehicleViewModel.isLoading &&
              _vehicleViewModel.vehicles.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_vehicleViewModel.vehicles.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.directions_car,
                    size: 64,
                    color: Colors.blue.shade200,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'No tienes vehículos registrados',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Registra un vehículo para solicitar auxilio',
                    style: TextStyle(color: Colors.grey.shade500),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton.icon(
                    onPressed: () {
                      context.push('/vehicles');
                    },
                    icon: const Icon(Icons.add),
                    label: const Text('Registrar Vehículo'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Selección de vehículo
                  DropdownButtonFormField<String>(
                    initialValue: _selectedVehicleId,
                    decoration: const InputDecoration(
                      labelText: 'Vehículo *',
                      prefixIcon: Icon(Icons.directions_car),
                      border: OutlineInputBorder(),
                    ),
                    items: _vehicleViewModel.vehicles.map((vehicle) {
                      return DropdownMenuItem(
                        value: vehicle.id,
                        child: Text(
                          '${vehicle.brand} ${vehicle.model} - ${vehicle.plateNumber}',
                        ),
                      );
                    }).toList(),
                    onChanged: (value) =>
                        setState(() => _selectedVehicleId = value),
                    validator: (value) =>
                        value == null ? 'Selecciona un vehículo' : null,
                  ),
                  const SizedBox(height: 16),

                  // Título
                  TextFormField(
                    controller: _titleController,
                    decoration: const InputDecoration(
                      labelText: 'Título *',
                      prefixIcon: Icon(Icons.title),
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) => value == null || value.isEmpty
                        ? 'Campo requerido'
                        : null,
                  ),
                  const SizedBox(height: 16),

                  // Descripción
                  TextFormField(
                    controller: _descriptionController,
                    decoration: const InputDecoration(
                      labelText: 'Descripción *',
                      prefixIcon: Icon(Icons.description),
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                    validator: (value) => value == null || value.isEmpty
                        ? 'Campo requerido'
                        : null,
                  ),
                  const SizedBox(height: 16),

                  // Categoría
                  DropdownButtonFormField<String>(
                    initialValue: _selectedCategory,
                    decoration: const InputDecoration(
                      labelText: 'Categoría *',
                      prefixIcon: Icon(Icons.category),
                      border: OutlineInputBorder(),
                    ),
                    items: _categories.map((category) {
                      return DropdownMenuItem(
                        value: category,
                        child: Text(category),
                      );
                    }).toList(),
                    onChanged: (value) =>
                        setState(() => _selectedCategory = value!),
                  ),
                  const SizedBox(height: 16),

                  // Prioridad
                  DropdownButtonFormField<String>(
                    initialValue: _selectedPriority,
                    decoration: const InputDecoration(
                      labelText: 'Prioridad *',
                      prefixIcon: Icon(Icons.priority_high),
                      border: OutlineInputBorder(),
                    ),
                    items: _priorities.map((priority) {
                      return DropdownMenuItem(
                        value: priority,
                        child: Text(priority),
                      );
                    }).toList(),
                    onChanged: (value) =>
                        setState(() => _selectedPriority = value!),
                  ),
                  const SizedBox(height: 16),

                  // Dirección
                  TextFormField(
                    controller: _addressController,
                    decoration: InputDecoration(
                      labelText: 'Referencia de dirección',
                      prefixIcon: const Icon(Icons.location_on),
                      border: const OutlineInputBorder(),
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.my_location),
                        onPressed: _getCurrentLocation,
                        tooltip: 'Usar mi ubicación',
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Coordenadas
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _latitudeController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            labelText: 'Latitud *',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) => value == null || value.isEmpty
                              ? 'Campo requerido'
                              : null,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: TextFormField(
                          controller: _longitudeController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            labelText: 'Longitud *',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) => value == null || value.isEmpty
                              ? 'Campo requerido'
                              : null,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 32),

                  // Botón de enviar
                  ListenableBuilder(
                    listenable: _incidentsViewModel,
                    builder: (context, _) {
                      return SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _incidentsViewModel.isLoading
                              ? null
                              : _submitForm,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.blue.shade800,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: _incidentsViewModel.isLoading
                              ? const SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                      Colors.white,
                                    ),
                                  ),
                                )
                              : const Text(
                                  'Enviar Solicitud',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
