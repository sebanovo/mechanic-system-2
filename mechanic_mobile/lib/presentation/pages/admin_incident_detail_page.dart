import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import '../viewmodels/admin_incidents_viewmodel.dart';

class AdminIncidentDetailPage extends StatefulWidget {
  final String incidentId;

  const AdminIncidentDetailPage({super.key, required this.incidentId});

  @override
  State<AdminIncidentDetailPage> createState() =>
      _AdminIncidentDetailPageState();
}

class _AdminIncidentDetailPageState extends State<AdminIncidentDetailPage> {
  late AdminIncidentsViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = sl<AdminIncidentsViewModel>();
    _viewModel.loadIncidentDetails(widget.incidentId);
  }

  @override
  void dispose() {
    _viewModel.clearSelectedIncident();
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

  Future<void> _showPublishConfirmDialog() async {
    final incident = _viewModel.selectedIncident;
    if (incident == null) return;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Publicar Incidente'),
        content: Text(
          '¿Estás seguro de que deseas publicar el incidente "${incident.title}"? Esto lo hará visible para los talleres.',
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              final success = await _viewModel.publishIncident(incident.id);
              if (success) {
                _showSnackBar('Incidente publicado exitosamente');
                await _viewModel.loadIncidentDetails(incident.id);
              } else {
                _showSnackBar(
                  _viewModel.errorMessage ?? 'Error al publicar',
                  isError: true,
                );
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green.shade700,
              foregroundColor: Colors.white,
            ),
            child: const Text('Publicar'),
          ),
        ],
      ),
    );
  }

  Future<void> _showCandidatesDialog() async {
    final incident = _viewModel.selectedIncident;
    if (incident == null) return;

    await _viewModel.loadCandidates(incident.id);

    if (!mounted) return;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Candidatos para el Incidente'),
        content: _viewModel.candidates.isEmpty
            ? const SizedBox(
                height: 100,
                child: Center(child: Text('No hay candidatos disponibles')),
              )
            : SizedBox(
                width: double.maxFinite,
                height: 400,
                child: ListView.builder(
                  itemCount: _viewModel.candidates.length,
                  itemBuilder: (context, index) {
                    final candidate = _viewModel.candidates[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 8),
                      child: ListTile(
                        leading: const CircleAvatar(
                          child: Icon(Icons.business),
                        ),
                        title: Text(candidate.providerName),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Distancia: ${candidate.distanceKm.toStringAsFixed(1)} km',
                            ),
                            Text(
                              'Puntuación: ${candidate.score.toStringAsFixed(1)}',
                            ),
                            Text(
                              'Servicios: ${candidate.matchedServices.join(", ")}',
                            ),
                          ],
                        ),
                        trailing: Chip(
                          label: Text(candidate.providerType),
                          backgroundColor: Colors.blue.shade100,
                        ),
                      ),
                    );
                  },
                ),
              ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime? date) {
    if (date == null) return 'N/A';
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del Incidente'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => _viewModel.loadIncidentDetails(widget.incidentId),
            tooltip: 'Actualizar',
          ),
        ],
      ),
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, _) {
          if (_viewModel.isLoading && _viewModel.selectedIncident == null) {
            return const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
              ),
            );
          }

          if (_viewModel.errorMessage != null &&
              _viewModel.selectedIncident == null) {
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
                    onPressed: () =>
                        _viewModel.loadIncidentDetails(widget.incidentId),
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

          final incident = _viewModel.selectedIncident;
          if (incident == null) return const SizedBox.shrink();

          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Botones de acción
                if (incident.canBePublished)
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: _showPublishConfirmDialog,
                          icon: const Icon(Icons.publish),
                          label: const Text('Publicar Incidente'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green.shade700,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _showCandidatesDialog,
                          icon: const Icon(Icons.people_outline),
                          label: const Text('Ver Candidatos'),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: Colors.blue.shade700,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                          ),
                        ),
                      ),
                    ],
                  ),
                const SizedBox(height: 16),

                // Resumen IA
                if (incident.aiSummaryStatus == 'SUCCEEDED' &&
                    incident.structuredSummary != null)
                  Card(
                    color: Colors.blue.shade50,
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
                                Icons.auto_awesome,
                                color: Colors.blue.shade700,
                              ),
                              const SizedBox(width: 8),
                              const Text(
                                'Análisis IA',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(incident.structuredSummary!),
                          if (incident.suggestedCategory != null) ...[
                            const SizedBox(height: 8),
                            Row(
                              children: [
                                const Text(
                                  'Categoría sugerida: ',
                                  style: TextStyle(fontSize: 12),
                                ),
                                Text(
                                  incident.suggestedCategory!,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                          if (incident.suggestedPriority != null)
                            Row(
                              children: [
                                const Text(
                                  'Prioridad sugerida: ',
                                  style: TextStyle(fontSize: 12),
                                ),
                                Text(
                                  incident.suggestedPriority!,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
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
                        _buildInfoRow('ID', incident.id, icon: Icons.numbers),
                        _buildInfoRow(
                          'Estado',
                          incident.status,
                          icon: Icons.info_outline,
                        ),
                        _buildInfoRow(
                          'Prioridad',
                          incident.priority,
                          icon: Icons.priority_high,
                        ),
                        _buildInfoRow(
                          'Categoría',
                          incident.reportedCategory,
                          icon: Icons.category,
                        ),
                        _buildInfoRow(
                          'Título',
                          incident.title,
                          icon: Icons.title,
                        ),
                        _buildInfoRow(
                          'Descripción',
                          incident.description,
                          icon: Icons.description,
                        ),
                        if (incident.addressReference != null)
                          _buildInfoRow(
                            'Dirección',
                            incident.addressReference!,
                            icon: Icons.location_on,
                          ),
                        _buildInfoRow(
                          'Fecha',
                          _formatDate(incident.createdAt),
                          icon: Icons.calendar_today,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Información del cliente
                if (incident.clientUser != null)
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
                            incident.clientUser!.fullName,
                            icon: Icons.person,
                          ),
                          _buildInfoRow(
                            'Email',
                            incident.clientUser!.email,
                            icon: Icons.email,
                          ),
                          _buildInfoRow(
                            'Teléfono',
                            incident.clientUser!.phoneNumber ?? 'N/A',
                            icon: Icons.phone,
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Información del vehículo
                if (incident.vehicle != null)
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
                            'Información del Vehículo',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Marca',
                            incident.vehicle!.brand,
                            icon: Icons.directions_car,
                          ),
                          _buildInfoRow('Modelo', incident.vehicle!.model),
                          _buildInfoRow('Placa', incident.vehicle!.plateNumber),
                          _buildInfoRow(
                            'Año',
                            incident.vehicle!.year.toString(),
                          ),
                          _buildInfoRow('Color', incident.vehicle!.color),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Información del proveedor
                if (incident.provider != null)
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
                            'Información del Proveedor',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Divider(),
                          _buildInfoRow(
                            'Nombre',
                            incident.provider!.businessName,
                            icon: Icons.business,
                          ),
                          if (incident.provider!.contactPhone != null)
                            _buildInfoRow(
                              'Teléfono',
                              incident.provider!.contactPhone!,
                              icon: Icons.phone,
                            ),
                          if (incident.provider!.city != null)
                            _buildInfoRow(
                              'Ciudad',
                              incident.provider!.city!,
                              icon: Icons.location_city,
                            ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 16),

                // Timeline
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
                          'Línea de Tiempo',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Divider(),
                        _buildTimelineItem(
                          'Solicitud creada',
                          incident.requestedAt ?? incident.createdAt,
                          Icons.add_circle_outline,
                          true,
                        ),
                        if (incident.assignedAt != null)
                          _buildTimelineItem(
                            'Asignado a taller',
                            incident.assignedAt,
                            Icons.assignment_ind,
                            true,
                          ),
                        if (incident.enRouteAt != null)
                          _buildTimelineItem(
                            'Técnico en camino',
                            incident.enRouteAt,
                            Icons.directions_car,
                            true,
                          ),
                        if (incident.arrivedAt != null)
                          _buildTimelineItem(
                            'Técnico en el lugar',
                            incident.arrivedAt,
                            Icons.location_on,
                            true,
                          ),
                        if (incident.startedAt != null)
                          _buildTimelineItem(
                            'Servicio iniciado',
                            incident.startedAt,
                            Icons.build,
                            true,
                          ),
                        if (incident.completedAt != null)
                          _buildTimelineItem(
                            'Servicio completado',
                            incident.completedAt,
                            Icons.check_circle,
                            true,
                          ),
                        if (incident.cancelledAt != null)
                          _buildTimelineItem(
                            'Solicitud cancelada',
                            incident.cancelledAt,
                            Icons.cancel,
                            true,
                          ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildInfoRow(String label, String value, {IconData? icon}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null)
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Icon(icon, size: 20, color: Colors.blue.shade700),
            ),
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

  Widget _buildTimelineItem(
    String label,
    DateTime? date,
    IconData icon,
    bool isCompleted,
  ) {
    final color = isCompleted && date != null
        ? Colors.green
        : Colors.grey.shade400;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, size: 18, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(fontWeight: FontWeight.w500, color: color),
                ),
                if (date != null)
                  Text(
                    _formatDate(date),
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade500),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
