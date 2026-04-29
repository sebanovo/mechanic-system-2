import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/catalog_service.dart';
import '../viewmodels/catalog_services_viewmodel.dart';

class CatalogServicesPage extends StatefulWidget {
  const CatalogServicesPage({super.key});

  @override
  State<CatalogServicesPage> createState() => _CatalogServicesPageState();
}

class _CatalogServicesPageState extends State<CatalogServicesPage> {
  late CatalogServicesViewModel _viewModel;
  String _selectedTab = 'catalog';

  @override
  void initState() {
    super.initState();
    _viewModel = sl<CatalogServicesViewModel>();
    _viewModel.loadCatalogServices();
    _viewModel.loadProviderServices();
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

  void _showConfigureServiceDialog(CatalogServiceEntry entry) {
    final formKey = GlobalKey<FormState>();
    final customTitleController = TextEditingController(
      text: entry.providerService?.customTitle ?? '',
    );
    final customDescriptionController = TextEditingController(
      text: entry.providerService?.customDescription ?? '',
    );
    final priceMinController = TextEditingController(
      text: entry.providerService?.priceEstimateMin.toString() ?? '80',
    );
    final priceMaxController = TextEditingController(
      text: entry.providerService?.priceEstimateMax.toString() ?? '250',
    );
    final durationController = TextEditingController(
      text: entry.providerService?.estimatedDurationMinutes.toString() ?? '45',
    );
    bool isMobileEnabled =
        entry.providerService?.isMobileServiceEnabled ?? true;
    bool isEmergencyEnabled =
        entry.providerService?.isEmergencyServiceEnabled ?? true;
    bool isActive = entry.providerService?.isActive ?? true;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(
              entry.isConfigured ? Icons.edit : Icons.add,
              color: Colors.blue.shade800,
            ),
            const SizedBox(width: 8),
            Text(
              entry.isConfigured ? 'Editar Servicio' : 'Configurar Servicio',
            ),
          ],
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        content: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        entry.catalogItem.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        entry.catalogItem.description,
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: customTitleController,
                  decoration: const InputDecoration(
                    labelText: 'Título personalizado (opcional)',
                    prefixIcon: Icon(Icons.title),
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: customDescriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Descripción personalizada (opcional)',
                    prefixIcon: Icon(Icons.description),
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 2,
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: priceMinController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Precio mínimo *',
                          prefixIcon: Icon(Icons.attach_money),
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
                        controller: priceMaxController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Precio máximo *',
                          prefixIcon: Icon(Icons.attach_money),
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Campo requerido'
                            : null,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: durationController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Duración estimada (minutos) *',
                    prefixIcon: Icon(Icons.timer),
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value == null || value.isEmpty ? 'Campo requerido' : null,
                ),
                const SizedBox(height: 12),
                SwitchListTile(
                  title: const Text('Servicio móvil habilitado'),
                  value: isMobileEnabled,
                  onChanged: (value) => isMobileEnabled = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
                SwitchListTile(
                  title: const Text('Servicio de emergencia habilitado'),
                  value: isEmergencyEnabled,
                  onChanged: (value) => isEmergencyEnabled = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
                ),
                SwitchListTile(
                  title: const Text('Servicio activo'),
                  value: isActive,
                  onChanged: (value) => isActive = value,
                  activeThumbColor: Colors.blue.shade700,
                  contentPadding: EdgeInsets.zero,
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
                final success = await _viewModel.createProviderService(
                  serviceCatalogItemId: entry.catalogItem.id,
                  customTitle: customTitleController.text.trim().isEmpty
                      ? null
                      : customTitleController.text.trim(),
                  customDescription:
                      customDescriptionController.text.trim().isEmpty
                      ? null
                      : customDescriptionController.text.trim(),
                  priceEstimateMin: double.parse(priceMinController.text),
                  priceEstimateMax: double.parse(priceMaxController.text),
                  estimatedDurationMinutes: int.parse(durationController.text),
                  isMobileServiceEnabled: isMobileEnabled,
                  isEmergencyServiceEnabled: isEmergencyEnabled,
                  isActive: isActive,
                );
                if (success) {
                  _showSnackBar(
                    entry.isConfigured
                        ? 'Servicio actualizado'
                        : 'Servicio configurado',
                  );
                  await _viewModel.loadProviderServices();
                } else {
                  _showSnackBar(
                    _viewModel.errorMessage ?? 'Error al configurar servicio',
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
            child: Text(entry.isConfigured ? 'Actualizar' : 'Configurar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Catálogo de Servicios'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              _viewModel.loadCatalogServices();
              _viewModel.loadProviderServices();
            },
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
                      ButtonSegment(
                        value: 'catalog',
                        label: Text('Catálogo Disponible'),
                      ),
                      ButtonSegment(
                        value: 'configured',
                        label: Text('Mis Servicios'),
                      ),
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
              (_selectedTab == 'catalog'
                  ? _viewModel.catalogServices.isEmpty
                  : _viewModel.providerServices.isEmpty)) {
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
                    onPressed: () {
                      _viewModel.loadCatalogServices();
                      _viewModel.loadProviderServices();
                    },
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

          if (_selectedTab == 'catalog') {
            if (_viewModel.catalogServices.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.category, size: 64, color: Colors.blue.shade200),
                    const SizedBox(height: 16),
                    Text(
                      'No hay servicios disponibles',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.grey.shade600,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              );
            }

            return RefreshIndicator(
              onRefresh: () => _viewModel.loadCatalogServices(),
              color: Colors.blue,
              child: ListView.builder(
                padding: const EdgeInsets.all(12),
                itemCount: _viewModel.catalogServices.length,
                itemBuilder: (context, index) {
                  final entry = _viewModel.catalogServices[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: entry.isConfigured
                          ? BorderSide(color: Colors.green.shade300, width: 1)
                          : BorderSide.none,
                    ),
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: entry.isConfigured
                            ? Colors.green.shade100
                            : Colors.blue.shade100,
                        child: Icon(
                          Icons.miscellaneous_services,
                          color: entry.isConfigured
                              ? Colors.green.shade700
                              : Colors.blue.shade700,
                        ),
                      ),
                      title: Text(
                        entry.catalogItem.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(entry.catalogItem.description),
                          if (entry.isConfigured &&
                              entry.providerService != null)
                            Container(
                              margin: const EdgeInsets.only(top: 4),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.green.shade100,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                '✓ Configurado: ${entry.providerService!.priceRange}',
                                style: TextStyle(
                                  fontSize: 11,
                                  color: Colors.green.shade700,
                                ),
                              ),
                            ),
                        ],
                      ),
                      trailing: IconButton(
                        icon: Icon(
                          entry.isConfigured ? Icons.edit : Icons.add_circle,
                          color: entry.isConfigured
                              ? Colors.orange.shade700
                              : Colors.blue.shade700,
                        ),
                        onPressed: () => _showConfigureServiceDialog(entry),
                      ),
                    ),
                  );
                },
              ),
            );
          } else {
            // Tab "Mis Servicios"
            if (_viewModel.providerServices.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.miscellaneous_services,
                      size: 64,
                      color: Colors.blue.shade200,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'No has configurado ningún servicio',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.grey.shade600,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Ve a la pestaña "Catálogo Disponible" para configurar',
                      style: TextStyle(color: Colors.grey.shade500),
                    ),
                  ],
                ),
              );
            }

            return RefreshIndicator(
              onRefresh: () => _viewModel.loadProviderServices(),
              color: Colors.blue,
              child: ListView.builder(
                padding: const EdgeInsets.all(12),
                itemCount: _viewModel.providerServices.length,
                itemBuilder: (context, index) {
                  final service = _viewModel.providerServices[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: service.isActive
                            ? Colors.green.shade100
                            : Colors.grey.shade200,
                        child: Icon(
                          Icons.build,
                          color: service.isActive
                              ? Colors.green.shade700
                              : Colors.grey.shade600,
                        ),
                      ),
                      title: Text(
                        service.effectiveTitle,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(service.effectiveDescription),
                          const SizedBox(height: 4),
                          Text(
                            '💰 ${service.priceRange} · ⏱️ ${service.estimatedDurationMinutes} min',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey.shade600,
                            ),
                          ),
                          Wrap(
                            spacing: 8,
                            children: [
                              if (service.isMobileServiceEnabled)
                                Chip(
                                  label: Text(
                                    'Móvil',
                                    style: TextStyle(fontSize: 11),
                                  ),
                                  padding: EdgeInsets.zero,
                                  materialTapTargetSize:
                                      MaterialTapTargetSize.shrinkWrap,
                                ),
                              if (service.isEmergencyServiceEnabled)
                                Chip(
                                  label: Text(
                                    'Emergencia',
                                    style: TextStyle(fontSize: 11),
                                  ),
                                  padding: EdgeInsets.zero,
                                  materialTapTargetSize:
                                      MaterialTapTargetSize.shrinkWrap,
                                ),
                            ],
                          ),
                        ],
                      ),
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: service.isActive
                              ? Colors.green.shade100
                              : Colors.red.shade100,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          service.isActive ? 'Activo' : 'Inactivo',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: service.isActive
                                ? Colors.green.shade700
                                : Colors.red.shade700,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            );
          }
        },
      ),
    );
  }
}
