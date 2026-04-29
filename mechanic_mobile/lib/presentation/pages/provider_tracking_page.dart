import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../../domain/entities/tracking.dart';
import '../viewmodels/provider_tracking_viewmodel.dart';

class ProviderTrackingPage extends StatefulWidget {
  final String incidentId;
  final String technicianId;

  const ProviderTrackingPage({
    super.key,
    required this.incidentId,
    required this.technicianId,
  });

  @override
  State<ProviderTrackingPage> createState() => _ProviderTrackingPageState();
}

class _ProviderTrackingPageState extends State<ProviderTrackingPage> {
  late ProviderTrackingViewModel _viewModel;
  late TrackingData _trackingData;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<ProviderTrackingViewModel>();
    _loadData();
  }

  Future<void> _loadData() async {
    await _viewModel.loadLiveTracking(widget.incidentId);
    await _viewModel.loadTrackingHistory(widget.incidentId);

    if (_viewModel.trackingData != null && mounted) {
      setState(() {
        _trackingData = _viewModel.trackingData!;
      });
    }
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

  Future<void> _showReportLocationDialog() async {
    final latController = TextEditingController();
    final lngController = TextEditingController();
    final accuracyController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Reportar Ubicación'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: latController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Latitud *',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: lngController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Longitud *',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: accuracyController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Precisión (metros)',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final lat = double.tryParse(latController.text);
              final lng = double.tryParse(lngController.text);

              if (lat == null || lng == null) {
                _showSnackBar('Ingrese coordenadas válidas', isError: true);
                return;
              }

              Navigator.pop(context);
              final result = await _viewModel.reportLocation(
                incidentId: widget.incidentId,
                latitude: lat,
                longitude: lng,
                technicianId: widget.technicianId,
                accuracyMeters: double.tryParse(accuracyController.text),
              );

              if (result != null) {
                setState(() {
                  _trackingData = result;
                });
                _showSnackBar('Ubicación reportada exitosamente');
                await _viewModel.loadTrackingHistory(widget.incidentId);
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al reportar ubicación',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Reportar'),
          ),
        ],
      ),
    );
  }

  Future<void> _refreshRoute() async {
    final result = await _viewModel.refreshRoute(widget.incidentId);
    if (result != null) {
      setState(() {
        _trackingData = result;
      });
      _showSnackBar('Ruta actualizada');
    } else {
      _showSnackBar(
        _viewModel.errorMessage ?? 'Error al actualizar ruta',
        isError: true,
      );
    }
  }

  String _formatDateTime(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Seguimiento de Servicio'),
          backgroundColor: Colors.blue.shade800,
          foregroundColor: Colors.white,
          elevation: 2,
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.location_pin), text: 'En Vivo'),
              Tab(icon: Icon(Icons.history), text: 'Historial'),
            ],
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: _loadData,
              tooltip: 'Actualizar',
            ),
          ],
        ),
        body: ListenableBuilder(
          listenable: _viewModel,
          builder: (context, _) {
            if (_viewModel.isLoading && _viewModel.trackingData == null) {
              return const Center(
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                ),
              );
            }

            if (_viewModel.errorMessage != null &&
                _viewModel.trackingData == null) {
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
                      onPressed: _loadData,
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

            if (_viewModel.trackingData == null) {
              return const SizedBox.shrink();
            }

            return TabBarView(
              children: [
                // Live Tracking Tab
                RefreshIndicator(
                  onRefresh: _loadData,
                  color: Colors.blue,
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Estado actual
                        Card(
                          color: _getStatusColor(
                            _trackingData.status,
                          ).withValues(alpha: 0.1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Row(
                              children: [
                                Icon(
                                  _getStatusIcon(_trackingData.status),
                                  color: _getStatusColor(_trackingData.status),
                                  size: 32,
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Estado Actual',
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey,
                                        ),
                                      ),
                                      Text(
                                        _getStatusText(_trackingData.status),
                                        style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: _getStatusColor(
                                            _trackingData.status,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información del incidente
                        Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Información del Incidente',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const Divider(),
                                _buildInfoRow('Título', _trackingData.title),
                                _buildInfoRow(
                                  'Descripción',
                                  _trackingData.description,
                                ),
                                _buildInfoRow(
                                  'Prioridad',
                                  _trackingData.priority,
                                ),
                                if (_trackingData.addressReference != null)
                                  _buildInfoRow(
                                    'Dirección',
                                    _trackingData.addressReference!,
                                  ),
                                _buildInfoRow(
                                  'Ubicación',
                                  _trackingData.incidentLocation,
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información del cliente
                        if (_trackingData.clientUser != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Información del Cliente',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Nombre',
                                    _trackingData.clientUser!.fullName,
                                  ),
                                  _buildInfoRow(
                                    'Teléfono',
                                    _trackingData.clientUser!.phoneNumber ??
                                        'N/A',
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Ubicación actual del respondedor
                        if (_trackingData.responderPosition != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.location_on,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Ubicación Actual',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Coordenadas',
                                    _trackingData.responderPosition!.location,
                                  ),
                                  _buildInfoRow(
                                    'Actualizado',
                                    _formatDateTime(
                                      _trackingData
                                          .responderPosition!
                                          .recordedAt,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Información de ruta
                        if (_trackingData.route != null)
                          Card(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Icon(
                                        Icons.route,
                                        color: Colors.blue.shade700,
                                      ),
                                      const SizedBox(width: 8),
                                      const Text(
                                        'Información de Ruta',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(),
                                  _buildInfoRow(
                                    'Distancia',
                                    _trackingData.formattedDistance,
                                  ),
                                  _buildInfoRow(
                                    'ETA estimado',
                                    _trackingData.formattedEta,
                                  ),
                                  if (_trackingData.route!.errorMessage != null)
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: BoxDecoration(
                                        color: Colors.orange.shade50,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Row(
                                        children: [
                                          Icon(
                                            Icons.warning_amber,
                                            size: 16,
                                            color: Colors.orange.shade700,
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              _trackingData
                                                  .route!
                                                  .errorMessage!,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Colors.orange.shade800,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          ),
                        const SizedBox(height: 16),

                        // Botones de acción
                        Row(
                          children: [
                            Expanded(
                              child: ElevatedButton.icon(
                                onPressed: _showReportLocationDialog,
                                icon: const Icon(Icons.my_location),
                                label: const Text('Reportar Ubicación'),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.blue.shade700,
                                  foregroundColor: Colors.white,
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: OutlinedButton.icon(
                                onPressed: _refreshRoute,
                                icon: const Icon(Icons.refresh),
                                label: const Text('Actualizar Ruta'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.blue.shade700,
                                  padding: const EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Tracking History Tab
                RefreshIndicator(
                  onRefresh: () =>
                      _viewModel.loadTrackingHistory(widget.incidentId),
                  color: Colors.blue,
                  child: _viewModel.history.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.history,
                                size: 64,
                                color: Colors.blue.shade200,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'No hay historial de ubicaciones',
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Colors.grey.shade600,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Las ubicaciones reportadas aparecerán aquí',
                                style: TextStyle(color: Colors.grey.shade500),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(12),
                          itemCount: _viewModel.history.length,
                          itemBuilder: (context, index) {
                            final item = _viewModel.history[index];
                            return Card(
                              margin: const EdgeInsets.only(bottom: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: Colors.blue.shade100,
                                  child: const Icon(
                                    Icons.location_on,
                                    color: Colors.blue,
                                  ),
                                ),
                                title: Text(
                                  item.location,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                subtitle: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('📡 ${item.sourceType}'),
                                    if (item.accuracyMeters != null)
                                      Text(
                                        '🎯 Precisión: ${item.accuracyMeters!.toStringAsFixed(0)} m',
                                      ),
                                    if (item.technicianFullName != null)
                                      Text('👨‍🔧 ${item.technicianFullName}'),
                                  ],
                                ),
                                trailing: Text(
                                  item.formattedTime,
                                  style: TextStyle(
                                    color: Colors.grey.shade600,
                                    fontSize: 12,
                                  ),
                                ),
                                isThreeLine: true,
                              ),
                            );
                          },
                        ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.grey,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'ASSIGNED':
        return const Color(0xFF9C27B0);
      case 'EN_ROUTE':
        return const Color(0xFF00BCD4);
      case 'ON_SITE':
        return const Color(0xFF00897B);
      case 'IN_PROGRESS':
        return const Color(0xFF3F51B5);
      case 'COMPLETED':
        return const Color(0xFF4CAF50);
      case 'CANCELLED':
        return const Color(0xFFF44336);
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(String status) {
    switch (status) {
      case 'ASSIGNED':
        return Icons.person_add;
      case 'EN_ROUTE':
        return Icons.directions_car;
      case 'ON_SITE':
        return Icons.location_on;
      case 'IN_PROGRESS':
        return Icons.build;
      case 'COMPLETED':
        return Icons.check_circle;
      case 'CANCELLED':
        return Icons.cancel;
      default:
        return Icons.info;
    }
  }

  String _getStatusText(String status) {
    switch (status) {
      case 'ASSIGNED':
        return 'Asignado';
      case 'EN_ROUTE':
        return 'En camino';
      case 'ON_SITE':
        return 'En el lugar';
      case 'IN_PROGRESS':
        return 'En progreso';
      case 'COMPLETED':
        return 'Completado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  }
}
