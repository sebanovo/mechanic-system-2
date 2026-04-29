import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/incident.dart';
import 'package:mechanic_mobile/domain/usecases/update_incident_usecase.dart';
import '../viewmodels/incidents_viewmodel.dart';

class IncidentsPage extends StatefulWidget {
  const IncidentsPage({super.key});

  @override
  State<IncidentsPage> createState() => _IncidentsPageState();
}

class _IncidentsPageState extends State<IncidentsPage> {
  late IncidentsViewModel _viewModel;
  String _selectedTab = 'active';

  @override
  void initState() {
    super.initState();
    _viewModel = sl<IncidentsViewModel>();
    _viewModel.loadIncidents();
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

  void _showCancelDialog(String incidentId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancelar solicitud'),
        content: const Text(
          '¿Estás seguro de que deseas cancelar esta solicitud? Esta acción no se puede deshacer.',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('No'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.cancelIncident(incidentId);
              if (success) {
                _showSnackBar('Solicitud cancelada exitosamente');
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al cancelar',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Sí, cancelar'),
          ),
        ],
      ),
    );
  }

  void _showEditIncidentDialog(Incident incident) {
    final formKey = GlobalKey<FormState>();
    final titleController = TextEditingController(text: incident.title);
    final descriptionController = TextEditingController(
      text: incident.description,
    );
    String selectedCategory = incident.reportedCategory;
    String selectedPriority = incident.priority;
    final addressController = TextEditingController(
      text: incident.addressReference ?? '',
    );
    final latitudeController = TextEditingController(
      text: incident.incidentLatitude?.toString() ?? '',
    );
    final longitudeController = TextEditingController(
      text: incident.incidentLongitude?.toString() ?? '',
    );

    final categories = [
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
    final priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(Icons.edit, color: Colors.blue.shade800),
            const SizedBox(width: 8),
            const Text('Editar Solicitud'),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: titleController,
                  decoration: const InputDecoration(
                    labelText: 'Título',
                    prefixIcon: Icon(Icons.title),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: descriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Descripción',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 3,
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: selectedCategory,
                  decoration: const InputDecoration(
                    labelText: 'Categoría',
                    prefixIcon: Icon(Icons.category),
                    border: OutlineInputBorder(),
                  ),
                  items: categories.map((category) {
                    return DropdownMenuItem(
                      value: category,
                      child: Text(category),
                    );
                  }).toList(),
                  onChanged: (value) => selectedCategory = value!,
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: selectedPriority,
                  decoration: const InputDecoration(
                    labelText: 'Prioridad',
                    prefixIcon: Icon(Icons.priority_high),
                    border: OutlineInputBorder(),
                  ),
                  items: priorities.map((priority) {
                    return DropdownMenuItem(
                      value: priority,
                      child: Text(priority),
                    );
                  }).toList(),
                  onChanged: (value) => selectedPriority = value!,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: addressController,
                  decoration: const InputDecoration(
                    labelText: 'Referencia de dirección',
                    prefixIcon: Icon(Icons.location_on),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: latitudeController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Latitud',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextFormField(
                        controller: longitudeController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Longitud',
                          border: OutlineInputBorder(),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context);
                final success = await _viewModel.updateIncident(
                  incident.id,
                  UpdateIncidentParams(
                    title: titleController.text.trim(),
                    description: descriptionController.text.trim(),
                    reportedCategory: selectedCategory,
                    priority: selectedPriority,
                    addressReference: addressController.text.trim().isEmpty
                        ? null
                        : addressController.text.trim(),
                    incidentLatitude: double.tryParse(latitudeController.text),
                    incidentLongitude: double.tryParse(
                      longitudeController.text,
                    ),
                  ),
                );
                if (success) {
                  _showSnackBar('Solicitud actualizada exitosamente');
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al actualizar',
                    isError: true,
                  );
                }
                _viewModel.clearError();
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade800,
              foregroundColor: Colors.white,
            ),
            child: const Text('Guardar Cambios'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Solicitudes'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadIncidents(),
            tooltip: 'Actualizar',
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: SegmentedButton<String>(
                    segments: const [
                      ButtonSegment(value: 'active', label: Text('Activas')),
                      ButtonSegment(value: 'history', label: Text('Historial')),
                    ],
                    selected: {_selectedTab},
                    onSelectionChanged: (Set<String> selection) {
                      setState(() {
                        _selectedTab = selection.first;
                      });
                    },
                    style: ButtonStyle(
                      backgroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.blue.shade700;
                        }
                        return Colors.transparent;
                      }),
                      foregroundColor: WidgetStateProperty.resolveWith((
                        states,
                      ) {
                        if (states.contains(WidgetState.selected)) {
                          return Colors.white;
                        }
                        return Colors.blue.shade700;
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading &&
              (_selectedTab == 'active'
                  ? _viewModel.activeIncidents.isEmpty
                  : _viewModel.completedIncidents.isEmpty)) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      _viewModel.errorMessage!,
                      style: TextStyle(color: Colors.grey.shade600),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () => _viewModel.loadIncidents(),
                    icon: const Icon(Icons.refresh),
                    label: const Text('Reintentar'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            );
          }

          final incidents = _selectedTab == 'active'
              ? _viewModel.activeIncidents
              : _viewModel.completedIncidents;

          if (incidents.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    _selectedTab == 'active' ? Icons.inbox : Icons.history,
                    size: 64,
                    color: Colors.blue.shade200,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    _selectedTab == 'active'
                        ? 'No hay solicitudes activas'
                        : 'No hay solicitudes en el historial',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  if (_selectedTab == 'active')
                    Text(
                      'Toca el botón + para solicitar auxilio',
                      style: TextStyle(color: Colors.grey.shade500),
                    ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => _viewModel.loadIncidents(),
            color: Colors.blue,
            child: ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: incidents.length,
              itemBuilder: (context, index) {
                final incident = incidents[index];
                return _buildIncidentCard(incident);
              },
            ),
          );
        },
      ),
      floatingActionButton: _selectedTab == 'active'
          ? FloatingActionButton.extended(
              onPressed: () {
                context.push('/create-incident');
              },
              icon: const Icon(Icons.add),
              label: const Text('Nueva solicitud'),
              backgroundColor: Colors.blue.shade700,
              foregroundColor: Colors.white,
            )
          : null,
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  Widget _buildIncidentCard(Incident incident) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: _getStatusColor(incident.status).withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: InkWell(
        onTap: () {
          context.push('/incident-detail/${incident.id}', extra: incident);
        },
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: _getStatusColor(
                        incident.status,
                      ).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      incident.statusIcon,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          incident.title,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: _getStatusColor(
                              incident.status,
                            ).withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            incident.status,
                            style: TextStyle(
                              fontSize: 12,
                              color: _getStatusColor(incident.status),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (incident.canBeCancelled)
                    IconButton(
                      icon: Icon(
                        Icons.cancel_outlined,
                        color: Colors.red.shade400,
                        size: 20,
                      ),
                      onPressed: () => _showCancelDialog(incident.id),
                      tooltip: 'Cancelar solicitud',
                    ),
                  if (incident.status == 'PENDING')
                    IconButton(
                      icon: Icon(
                        Icons.edit,
                        color: Colors.blue.shade700,
                        size: 20,
                      ),
                      onPressed: () => _showEditIncidentDialog(incident),
                      tooltip: 'Editar solicitud',
                    ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(Icons.category, size: 14, color: Colors.grey.shade500),
                  const SizedBox(width: 4),
                  Text(
                    incident.reportedCategory,
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                  const SizedBox(width: 16),
                  Icon(
                    Icons.priority_high,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    incident.priority,
                    style: TextStyle(
                      fontSize: 12,
                      color: _getPriorityColor(incident.priority),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(
                    Icons.location_on,
                    size: 14,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      incident.addressReference ?? 'Sin dirección especificada',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              if (incident.hasProvider) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.business, size: 14, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        incident.provider?.businessName ?? 'Taller asignado',
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
              if (incident.routeDistanceKm != null) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.route, size: 14, color: Colors.grey.shade500),
                    const SizedBox(width: 4),
                    Text(
                      '${incident.routeDistanceKm?.toStringAsFixed(1)} km · ${incident.routeEtaMinutes} min ETA',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'PENDING':
        return Colors.orange;
      case 'PUBLISHED':
        return Colors.blue;
      case 'ASSIGNED':
        return Colors.purple;
      case 'EN_ROUTE':
        return Colors.cyan;
      case 'ON_SITE':
        return Colors.teal;
      case 'IN_PROGRESS':
        return Colors.indigo;
      case 'COMPLETED':
        return Colors.green;
      case 'CANCELLED':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  Color _getPriorityColor(String priority) {
    switch (priority) {
      case 'LOW':
        return Colors.green;
      case 'MEDIUM':
        return Colors.orange;
      case 'HIGH':
        return Colors.red;
      case 'URGENT':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }
}
