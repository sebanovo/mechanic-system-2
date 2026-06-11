import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';

import '../helpers/tenant_record_helpers.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

void showCreateTechnicianSheet(BuildContext context, TenantViewModel vm) {
  final email = TextEditingController();
  final password = TextEditingController();
  final firstName = TextEditingController();
  final lastName = TextEditingController();

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: _SheetScaffold(
          title: 'Nuevo técnico',
          children: [
            _sheetField(email, 'Email'),
            PasswordTextField(controller: password, label: 'Contraseña'),
            _sheetField(firstName, 'Nombre'),
            _sheetField(lastName, 'Apellido'),
            const SizedBox(height: 18),
            ElevatedButton(
              onPressed: vm.submitting
                  ? null
                  : () async {
                      final ok = await vm.createTechnician({
                        'email': email.text.trim(),
                        'password': password.text,
                        'first_name': firstName.text.trim(),
                        'last_name': lastName.text.trim(),
                      });
                      if (!sheetContext.mounted) return;
                      if (ok) Navigator.of(sheetContext).pop();
                    },
              child: const Text('Crear técnico'),
            ),
          ],
        ),
      );
    },
  );
}

void showCreateProviderServiceSheet(BuildContext context, TenantViewModel vm) {
  Map<String, dynamic>? selectedServiceCatalog = vm.serviceCatalog.items.isNotEmpty
      ? Map<String, dynamic>.from(vm.serviceCatalog.items.first)
      : null;
  final minPrice = TextEditingController();
  final maxPrice = TextEditingController();

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return StatefulBuilder(
        builder: (context, setState) {
          return Padding(
            padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
            child: _SheetScaffold(
              title: 'Nuevo servicio',
              children: [
                _recordPickerCard(
                  context,
                  label: 'Servicio de catálogo',
                  helper: 'Elige el servicio base desde el catálogo del sistema.',
                  value: selectedServiceCatalog == null
                      ? 'Selecciona un servicio'
                      : tenantCatalogSummary(selectedServiceCatalog!),
                  detail: selectedServiceCatalog == null
                      ? 'Mostrará nombre, código, categoría, precio y duración.'
                      : tenantServiceDetailsLabel(selectedServiceCatalog!),
                  icon: Icons.inventory_2_rounded,
                  onTap: () async {
                    final chosen = await _pickRecord(
                      context,
                      title: 'Seleccionar servicio de catálogo',
                      items: vm.serviceCatalog.items,
                      titleBuilder: (item) => tenantCatalogSummary(item),
                      subtitleBuilder: (item) => tenantServiceDetailsLabel(item),
                    );
                    if (!sheetContext.mounted || chosen == null) return;
                    setState(() => selectedServiceCatalog = chosen);
                  },
                ),
                const SizedBox(height: 12),
                _sheetField(minPrice, 'Precio mínimo'),
                _sheetField(maxPrice, 'Precio máximo'),
                const SizedBox(height: 18),
                ElevatedButton(
                  onPressed: vm.submitting
                      ? null
                      : () async {
                          final selectedId = selectedServiceCatalog?['id']?.toString() ?? '';
                          if (selectedId.isEmpty) return;
                          final ok = await vm.createProviderService({
                            'service_catalog_id': selectedId,
                            if (minPrice.text.trim().isNotEmpty) 'custom_min_price': minPrice.text.trim(),
                            if (maxPrice.text.trim().isNotEmpty) 'custom_max_price': maxPrice.text.trim(),
                          });
                          if (!sheetContext.mounted) return;
                          if (ok) Navigator.of(sheetContext).pop();
                        },
                  child: const Text('Crear servicio'),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

void showCreateTechnicianServiceSheet(BuildContext context, TenantViewModel vm) {
  Map<String, dynamic>? selectedTechnician = vm.technicians.items.isNotEmpty
      ? Map<String, dynamic>.from(vm.technicians.items.first)
      : null;
  Map<String, dynamic>? selectedProviderService = vm.providerServices.items.isNotEmpty
      ? Map<String, dynamic>.from(vm.providerServices.items.first)
      : null;
  var selectedSkillLevel = 'BASIC';

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return StatefulBuilder(
        builder: (context, setState) {
          return Padding(
            padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
            child: _SheetScaffold(
              title: 'Nuevo servicio técnico',
              children: [
                _recordPickerCard(
                  context,
                  label: 'Técnico',
                  helper: 'Selecciona el técnico asignado al servicio.',
                  value: selectedTechnician == null
                      ? 'Selecciona un técnico'
                      : _technicianSelectionLabel(selectedTechnician!),
                  detail: selectedTechnician == null
                      ? 'Muestra código, nombre y estado.'
                      : _technicianSelectionDetail(selectedTechnician!),
                  icon: Icons.person_rounded,
                  onTap: () async {
                    final chosen = await _pickRecord(
                      context,
                      title: 'Seleccionar técnico',
                      items: vm.technicians.items,
                      titleBuilder: (item) => _technicianSelectionLabel(item),
                      subtitleBuilder: (item) => _technicianSelectionDetail(item),
                    );
                    if (!sheetContext.mounted || chosen == null) return;
                    setState(() => selectedTechnician = chosen);
                  },
                ),
                const SizedBox(height: 12),
                _recordPickerCard(
                  context,
                  label: 'Servicio proveedor',
                  helper: 'Selecciona el vínculo comercial que será atendido por el técnico.',
                  value: selectedProviderService == null
                      ? 'Selecciona un servicio proveedor'
                      : tenantProviderServiceSummary(selectedProviderService!),
                  detail: selectedProviderService == null
                      ? 'Incluye disponibilidad, categoría y precios.'
                      : tenantProviderServiceDetailsLabel(selectedProviderService!),
                  icon: Icons.handyman_rounded,
                  onTap: () async {
                    final chosen = await _pickRecord(
                      context,
                      title: 'Seleccionar servicio proveedor',
                      items: vm.providerServices.items,
                      titleBuilder: (item) => tenantProviderServiceSummary(item),
                      subtitleBuilder: (item) => tenantProviderServiceDetailsLabel(item),
                    );
                    if (!sheetContext.mounted || chosen == null) return;
                    setState(() => selectedProviderService = chosen);
                  },
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: selectedSkillLevel,
                  decoration: const InputDecoration(
                    labelText: 'Skill level',
                  ),
                  items: const [
                    DropdownMenuItem(value: 'BASIC', child: Text('BASIC')),
                    DropdownMenuItem(value: 'INTERMEDIATE', child: Text('INTERMEDIATE')),
                    DropdownMenuItem(value: 'ADVANCED', child: Text('ADVANCED')),
                    DropdownMenuItem(value: 'EXPERT', child: Text('EXPERT')),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() => selectedSkillLevel = value);
                  },
                ),
                const SizedBox(height: 18),
                ElevatedButton(
                  onPressed: vm.submitting
                      ? null
                      : () async {
                          final technicianId =
                              selectedTechnician == null ? '' : _selectedTechnicianId(selectedTechnician!);
                          final providerServiceId =
                              selectedProviderService == null ? '' : _selectedProviderServiceId(selectedProviderService!);
                          if (technicianId.isEmpty || providerServiceId.isEmpty) {
                            showAppSnackBar(
                              sheetContext,
                              'Selecciona un técnico y un servicio proveedor válidos antes de continuar.',
                            );
                            return;
                          }
                          final ok = await vm.createTechnicianService({
                            'technician_id': technicianId,
                            'provider_service_id': providerServiceId,
                            'skill_level': selectedSkillLevel,
                          });
                          if (!sheetContext.mounted) return;
                          if (ok) {
                            Navigator.of(sheetContext).pop();
                          } else if (vm.error != null && vm.error!.isNotEmpty) {
                            showAppSnackBar(sheetContext, vm.error!);
                          }
                        },
                  child: const Text('Crear servicio técnico'),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

String _selectedTechnicianId(Map<String, dynamic> record) {
  final technician = record['technician'] is Map
      ? Map<String, dynamic>.from(record['technician'])
      : record;
  final id = technician['id']?.toString().trim() ?? '';
  return id;
}

String _selectedProviderServiceId(Map<String, dynamic> record) {
  final providerService = record['provider_service'] is Map
      ? Map<String, dynamic>.from(record['provider_service'])
      : record;
  final id = providerService['id']?.toString().trim() ?? '';
  return id;
}

void showTechnicianManagementSheet(
  BuildContext context,
  TenantViewModel vm,
  Map<String, dynamic> record,
) {
  final technician = record['technician'] is Map
      ? Map<String, dynamic>.from(record['technician'])
      : record;
  final user = record['user'] is Map ? Map<String, dynamic>.from(record['user']) : record;
  var status = (technician['status']?.toString().isNotEmpty ?? false)
      ? technician['status'].toString()
      : 'ACTIVE';
  var availabilityStatus = (record['availability_status']?.toString().isNotEmpty ?? false)
      ? record['availability_status'].toString()
      : 'AVAILABLE';
  final availableFrom = TextEditingController(text: record['available_from']?.toString() ?? '');
  final availableUntil = TextEditingController(text: record['available_until']?.toString() ?? '');

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return StatefulBuilder(
        builder: (context, setState) {
          return Padding(
            padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
            child: _SheetScaffold(
              title: 'Gestión de técnico',
              children: [
                _sheetSummary('Nombre', '${user['first_name'] ?? ''} ${user['last_name'] ?? ''}'.trim()),
                _sheetSummary('Email', user['email']?.toString() ?? '-'),
                _sheetSummary('Código', technician['technician_code']?.toString() ?? '-'),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: status,
                  decoration: const InputDecoration(labelText: 'Estado del técnico'),
                  items: const [
                    DropdownMenuItem(value: 'ACTIVE', child: Text('Activo')),
                    DropdownMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
                    DropdownMenuItem(value: 'BLOCKED', child: Text('Bloqueado')),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() => status = value);
                  },
                ),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: availabilityStatus,
                  decoration: const InputDecoration(labelText: 'Disponibilidad'),
                  items: const [
                    DropdownMenuItem(value: 'AVAILABLE', child: Text('Disponible')),
                    DropdownMenuItem(value: 'BUSY', child: Text('Ocupado')),
                    DropdownMenuItem(value: 'OFFLINE', child: Text('Desconectado')),
                    DropdownMenuItem(value: 'ON_BREAK', child: Text('En pausa')),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() => availabilityStatus = value);
                  },
                ),
                const SizedBox(height: 12),
                _sheetField(availableFrom, 'Disponible desde (ISO 8601)'),
                _sheetField(availableUntil, 'Disponible hasta (ISO 8601)'),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: vm.submitting
                      ? null
                      : () async {
                          final technicianId = technician['id']?.toString() ?? '';
                          final okStatus = technicianId.isNotEmpty
                              ? await vm.updateTechnicianStatus(technicianId, status)
                              : false;
                          final okAvailability = technicianId.isNotEmpty
                              ? await vm.updateTechnicianAvailability(technicianId, {
                                  'availability_status': availabilityStatus,
                                  'available_from': _parseNullableDateTime(availableFrom.text),
                                  'available_until': _parseNullableDateTime(availableUntil.text),
                                })
                              : false;
                          if (!sheetContext.mounted) return;
                          if (okStatus && okAvailability) Navigator.of(sheetContext).pop();
                        },
                  child: const Text('Guardar técnico'),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

void showMemberManagementSheet(
  BuildContext context,
  TenantViewModel vm,
  Map<String, dynamic> record,
) {
  final membership = record['membership'] is Map
      ? Map<String, dynamic>.from(record['membership'])
      : record;
  final user = record['user'] is Map ? Map<String, dynamic>.from(record['user']) : record;
  var status = (membership['status']?.toString().isNotEmpty ?? false)
      ? membership['status'].toString()
      : 'ACTIVE';

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return StatefulBuilder(
        builder: (context, setState) {
          return Padding(
            padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
            child: _SheetScaffold(
              title: 'Gestión de miembro',
              children: [
                _sheetSummary('Nombre', '${user['first_name'] ?? ''} ${user['last_name'] ?? ''}'.trim()),
                _sheetSummary('Email', user['email']?.toString() ?? '-'),
                _sheetSummary('Tenant', membership['tenant_id']?.toString() ?? '-'),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  initialValue: status,
                  decoration: const InputDecoration(labelText: 'Estado'),
                  items: const [
                    DropdownMenuItem(value: 'ACTIVE', child: Text('Activo')),
                    DropdownMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
                    DropdownMenuItem(value: 'BLOCKED', child: Text('Bloqueado')),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() => status = value);
                  },
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: vm.submitting
                      ? null
                      : () async {
                          final membershipId = membership['id']?.toString() ?? '';
                          final ok = membershipId.isNotEmpty
                              ? await vm.changeCurrentMemberStatus(membershipId, {'status': status})
                              : false;
                          if (!sheetContext.mounted) return;
                          if (ok) Navigator.of(sheetContext).pop();
                        },
                  child: const Text('Guardar miembro'),
                ),
                const SizedBox(height: 10),
                OutlinedButton(
                  onPressed: vm.submitting
                      ? null
                      : () async {
                          final membershipId = membership['id']?.toString() ?? '';
                          final ok = membershipId.isNotEmpty
                              ? await vm.removeCurrentMember(membershipId)
                              : false;
                          if (!sheetContext.mounted) return;
                          if (ok) Navigator.of(sheetContext).pop();
                        },
                  child: const Text('Dar de baja'),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

void showEditTenantProfileSheet(BuildContext context, TenantViewModel vm) {
  final current = vm.currentProfile ?? const <String, dynamic>{};
  final legalName = TextEditingController(text: current['legal_name']?.toString() ?? '');
  final taxIdentifier = TextEditingController(text: current['tax_identifier']?.toString() ?? '');
  final businessEmail = TextEditingController(text: current['business_email']?.toString() ?? '');
  final businessPhone = TextEditingController(text: current['business_phone']?.toString() ?? '');
  final websiteUrl = TextEditingController(text: current['website_url']?.toString() ?? '');
  final addressLine = TextEditingController(text: current['address_line']?.toString() ?? '');
  final city = TextEditingController(text: current['city']?.toString() ?? '');
  final state = TextEditingController(text: current['state']?.toString() ?? '');
  final country = TextEditingController(text: current['country']?.toString() ?? '');
  final latitude = TextEditingController(text: current['latitude']?.toString() ?? '');
  final longitude = TextEditingController(text: current['longitude']?.toString() ?? '');

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: _SheetScaffold(
          title: 'Editar perfil del taller',
          children: [
            _sheetField(legalName, 'Razón social'),
            _sheetField(taxIdentifier, 'Identificación fiscal'),
            _sheetField(businessEmail, 'Email comercial'),
            _sheetField(businessPhone, 'Teléfono comercial'),
            _sheetField(websiteUrl, 'Sitio web'),
            _sheetField(addressLine, 'Dirección'),
            _sheetField(city, 'Ciudad'),
            _sheetField(state, 'Estado'),
            _sheetField(country, 'País'),
            Row(
              children: [
                Expanded(child: _sheetField(latitude, 'Latitud')),
                const SizedBox(width: 10),
                Expanded(child: _sheetField(longitude, 'Longitud')),
                const SizedBox(width: 8),
                FilledButton.tonalIcon(
                  onPressed: () async {
                    try {
                      final position = await _resolveCurrentPosition();
                      latitude.text = position.latitude.toString();
                      longitude.text = position.longitude.toString();
                    } catch (exception) {
                      if (!sheetContext.mounted) return;
                      showAppSnackBar(
                        sheetContext,
                        exception.toString().replaceFirst('Exception: ', ''),
                      );
                    }
                  },
                  icon: const Icon(Icons.my_location_rounded),
                  label: const Text('Usar GPS'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: vm.submitting
                  ? null
                  : () async {
                      final ok = await vm.updateCurrentProfile({
                        'legal_name': legalName.text.trim(),
                        'tax_identifier': taxIdentifier.text.trim(),
                        'business_email': businessEmail.text.trim(),
                        'business_phone': businessPhone.text.trim(),
                        'website_url': websiteUrl.text.trim(),
                        'address_line': addressLine.text.trim(),
                        'city': city.text.trim(),
                        'state': state.text.trim(),
                        'country': country.text.trim(),
                        'latitude': _parseNullableDouble(latitude.text),
                        'longitude': _parseNullableDouble(longitude.text),
                      });
                      if (!sheetContext.mounted) return;
                      if (ok) Navigator.of(sheetContext).pop();
                    },
              child: const Text('Guardar perfil'),
            ),
          ],
        ),
      );
    },
  );
}

void showEditTenantSettingsSheet(BuildContext context, TenantViewModel vm) {
  final current = vm.currentSettings ?? const <String, dynamic>{};
  final defaultCurrency = TextEditingController(text: current['default_currency']?.toString() ?? '');
  final defaultTimezone = TextEditingController(text: current['default_timezone']?.toString() ?? '');
  final defaultLanguage = TextEditingController(text: current['default_language']?.toString() ?? '');

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: _SheetScaffold(
          title: 'Editar configuración',
          children: [
            _sheetField(defaultCurrency, 'Moneda por defecto'),
            _sheetField(defaultTimezone, 'Zona horaria'),
            _sheetField(defaultLanguage, 'Idioma'),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: vm.submitting
                  ? null
                  : () async {
                      final ok = await vm.updateCurrentSettings({
                        'default_currency': defaultCurrency.text.trim(),
                        'default_timezone': defaultTimezone.text.trim(),
                        'default_language': defaultLanguage.text.trim(),
                      });
                      if (!sheetContext.mounted) return;
                      if (ok) Navigator.of(sheetContext).pop();
                    },
              child: const Text('Guardar configuración'),
            ),
          ],
        ),
      );
    },
  );
}

void showEditProviderProfileSheet(BuildContext context, TenantViewModel vm) {
  final current = vm.currentProviderProfile ?? const <String, dynamic>{};
  var acceptsEmergency = current['accepts_emergency_requests'] == true;
  var operationalStatus = (current['operational_status']?.toString().isNotEmpty ?? false)
      ? current['operational_status'].toString()
      : 'ACTIVE';

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return StatefulBuilder(
        builder: (context, setState) {
          return Padding(
            padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
            child: _SheetScaffold(
              title: 'Editar proveedor',
              children: [
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  value: acceptsEmergency,
                  onChanged: (value) => setState(() => acceptsEmergency = value),
                  title: const Text('Acepta emergencias'),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  initialValue: operationalStatus,
                  decoration: const InputDecoration(labelText: 'Estado operativo'),
                  items: const [
                    DropdownMenuItem(value: 'ACTIVE', child: Text('Activo')),
                    DropdownMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
                    DropdownMenuItem(value: 'SUSPENDED', child: Text('Suspendido')),
                  ],
                  onChanged: (value) {
                    if (value == null) return;
                    setState(() => operationalStatus = value);
                  },
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: vm.submitting
                      ? null
                      : () async {
                          final ok = await vm.updateCurrentProviderProfile({
                            'accepts_emergency_requests': acceptsEmergency,
                            'operational_status': operationalStatus,
                          });
                          if (!sheetContext.mounted) return;
                          if (ok) Navigator.of(sheetContext).pop();
                        },
                  child: const Text('Guardar proveedor'),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}

void showCreateTenantNetworkSheet(BuildContext context, TenantViewModel vm) {
  final commercialName = TextEditingController(
    text: vm.currentTenant?['commercial_name']?.toString() ?? '',
  );

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: _SheetScaffold(
          title: 'Crear red de taller',
          children: [
            _sheetField(commercialName, 'Nombre comercial'),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: vm.submitting
                  ? null
                  : () async {
                      final ok = await vm.createCurrentTenantNetwork({
                        'commercial_name': commercialName.text.trim(),
                      });
                      if (!sheetContext.mounted) return;
                      if (ok) Navigator.of(sheetContext).pop();
                    },
              child: const Text('Crear red'),
            ),
          ],
        ),
      );
    },
  );
}

Future<Map<String, dynamic>?> _pickRecord(
  BuildContext context, {
  required String title,
  required List<Map<String, dynamic>> items,
  required String Function(Map<String, dynamic> item) titleBuilder,
  required String Function(Map<String, dynamic> item) subtitleBuilder,
}) {
  return showModalBottomSheet<Map<String, dynamic>>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: _SheetScaffold(
          title: title,
          children: items.isEmpty
              ? const [
                  EmptyStatePanel(
                    title: 'Sin opciones',
                    subtitle: 'No hay registros disponibles para seleccionar.',
                    icon: Icons.inbox_rounded,
                  ),
                ]
              : items
                  .map(
                    (item) => Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(20),
                        onTap: () => Navigator.of(sheetContext).pop(item),
                        child: SurfaceCard(
                          padding: const EdgeInsets.all(14),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                titleBuilder(item),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                      fontWeight: FontWeight.w800,
                                    ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                subtitleBuilder(item),
                                maxLines: 3,
                                overflow: TextOverflow.ellipsis,
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  )
                  .toList(),
        ),
      );
    },
  );
}

Widget _recordPickerCard(
  BuildContext context, {
  required String label,
  required String helper,
  required String value,
  required String detail,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return Material(
    color: Colors.transparent,
    child: InkWell(
      borderRadius: BorderRadius.circular(22),
      onTap: onTap,
      child: SurfaceCard(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: const Color(0xFF166AE9)),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    label,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              value,
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 4),
            Text(helper, style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 6),
            Text(
              detail,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.blueGrey,
                  ),
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _sheetField(
  TextEditingController controller,
  String label, {
  bool obscureText = false,
}) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(labelText: label),
    ),
  );
}

Widget _sheetSummary(String label, String value) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 110,
          child: Text(
            label,
            style: const TextStyle(fontWeight: FontWeight.w800),
          ),
        ),
        Expanded(child: Text(value)),
      ],
    ),
  );
}

double? _parseNullableDouble(String value) {
  final trimmed = value.trim();
  if (trimmed.isEmpty) return null;
  return double.tryParse(trimmed);
}

String? _parseNullableDateTime(String value) {
  final trimmed = value.trim();
  if (trimmed.isEmpty) return null;
  return trimmed;
}

Future<Position> _resolveCurrentPosition() async {
  final enabled = await Geolocator.isLocationServiceEnabled();
  if (!enabled) {
    throw Exception('Activa la ubicación para usar coordenadas actuales.');
  }
  var permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
  }
  if (permission == LocationPermission.denied) {
    throw Exception('Permiso de ubicación denegado.');
  }
  if (permission == LocationPermission.deniedForever) {
    throw Exception('El permiso de ubicación está bloqueado en el sistema.');
  }
  return Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
}

String _technicianSelectionLabel(Map<String, dynamic> record) {
  final technician = record['technician'] is Map
      ? Map<String, dynamic>.from(record['technician'])
      : record;
  final user = record['user'] is Map ? Map<String, dynamic>.from(record['user']) : record;
  final name = [
    user['first_name']?.toString().trim() ?? '',
    user['last_name']?.toString().trim() ?? '',
  ].where((part) => part.isNotEmpty).join(' ').trim();
  final code = technician['technician_code']?.toString().trim() ?? '';
  final status = technician['status']?.toString().trim() ?? '';
  final parts = <String>[
    if (name.isNotEmpty) name,
    if (code.isNotEmpty) code,
    if (status.isNotEmpty) status,
  ];
  return parts.isEmpty ? tenantRecordPrimaryLabel(record) : parts.join(' • ');
}

String _technicianSelectionDetail(Map<String, dynamic> record) {
  final technician = record['technician'] is Map
      ? Map<String, dynamic>.from(record['technician'])
      : record;
  final user = record['user'] is Map ? Map<String, dynamic>.from(record['user']) : record;
  final email = user['email']?.toString().trim() ?? '';
  final availability = record['availability_status']?.toString().trim() ?? '';
  final rating = technician['average_rating']?.toString().trim() ?? '';
  final reviews = technician['total_reviews']?.toString().trim() ?? '';
  final parts = <String>[
    if (email.isNotEmpty) email,
    if (availability.isNotEmpty) availability,
    if (rating.isNotEmpty) 'Rating $rating',
    if (reviews.isNotEmpty) '$reviews reseñas',
  ];
  return parts.isEmpty ? tenantRecordSecondaryLabel(record) : parts.join(' • ');
}

class _SheetScaffold extends StatelessWidget {
  const _SheetScaffold({
    required this.title,
    required this.children,
  });

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: ListView(
        shrinkWrap: true,
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 24),
        children: [
          Center(
            child: Container(
              width: 42,
              height: 5,
              decoration: BoxDecoration(
                color: const Color(0xFFD6E2F7),
                borderRadius: BorderRadius.circular(100),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(title, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 14),
          ...children,
        ],
      ),
    );
  }
}
