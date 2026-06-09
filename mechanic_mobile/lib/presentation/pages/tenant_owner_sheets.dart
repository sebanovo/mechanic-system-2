import 'package:flutter/material.dart';

import '../viewmodels/tenant_viewmodel.dart';

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
        child: Container(
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
              Text('Nuevo técnico', style: Theme.of(context).textTheme.headlineSmall),
              const SizedBox(height: 14),
              TextField(controller: email, decoration: const InputDecoration(labelText: 'Email')),
              const SizedBox(height: 12),
              TextField(controller: password, obscureText: true, decoration: const InputDecoration(labelText: 'Contraseña')),
              const SizedBox(height: 12),
              TextField(controller: firstName, decoration: const InputDecoration(labelText: 'Nombre')),
              const SizedBox(height: 12),
              TextField(controller: lastName, decoration: const InputDecoration(labelText: 'Apellido')),
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
                        if (!context.mounted) return;
                        if (ok) Navigator.of(sheetContext).pop();
                      },
                child: const Text('Crear técnico'),
              ),
            ],
          ),
        ),
      );
    },
  );
}

void showCreateProviderServiceSheet(BuildContext context, TenantViewModel vm) {
  var selectedServiceCatalogId = vm.serviceCatalog.items.isNotEmpty
      ? vm.serviceCatalog.items.first['id']?.toString() ?? ''
      : '';
  final minPrice = TextEditingController();
  final maxPrice = TextEditingController();

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: Container(
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
              Text('Nuevo servicio', style: Theme.of(context).textTheme.headlineSmall),
              const SizedBox(height: 14),
              DropdownButtonFormField<String>(
                value: selectedServiceCatalogId.isEmpty ? null : selectedServiceCatalogId,
                isExpanded: true,
                menuMaxHeight: 360,
                decoration: const InputDecoration(
                  labelText: 'Servicio de catálogo',
                  helperText: 'Elige el servicio base desde el catálogo del sistema.',
                ),
                selectedItemBuilder: (context) => vm.serviceCatalog.items
                    .map(
                      (item) => Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          _serviceCatalogSummary(item),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    )
                    .toList(),
                items: vm.serviceCatalog.items
                    .map(
                      (item) => DropdownMenuItem<String>(
                        value: item['id']?.toString(),
                        child: SizedBox(
                          width: double.infinity,
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  item['service_name']?.toString() ??
                                      item['name']?.toString() ??
                                      item['code']?.toString() ??
                                      item['id']?.toString() ??
                                      '-',
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                                        fontWeight: FontWeight.w700,
                                      ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  [
                                    item['service_code']?.toString() ?? item['code']?.toString() ?? '-',
                                    item['category']?.toString() ?? '-',
                                    if ((item['description']?.toString() ?? '').trim().isNotEmpty)
                                      item['description'].toString(),
                                  ].join(' • '),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: Theme.of(context).textTheme.bodySmall,
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  _serviceCatalogPricing(item),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                        color: Colors.blueGrey,
                                        fontWeight: FontWeight.w600,
                                      ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (value) {
                  if (value != null) selectedServiceCatalogId = value;
                },
              ),
              const SizedBox(height: 12),
              TextField(controller: minPrice, decoration: const InputDecoration(labelText: 'Precio mínimo')),
              const SizedBox(height: 12),
              TextField(controller: maxPrice, decoration: const InputDecoration(labelText: 'Precio máximo')),
              const SizedBox(height: 18),
              ElevatedButton(
                onPressed: vm.submitting
                    ? null
                    : () async {
                        if (selectedServiceCatalogId.isEmpty) return;
                        final ok = await vm.createProviderService({
                          'service_catalog_id': selectedServiceCatalogId,
                          if (minPrice.text.trim().isNotEmpty) 'custom_min_price': minPrice.text.trim(),
                          if (maxPrice.text.trim().isNotEmpty) 'custom_max_price': maxPrice.text.trim(),
                        });
                        if (!context.mounted) return;
                        if (ok) Navigator.of(sheetContext).pop();
                      },
                child: const Text('Crear servicio'),
              ),
            ],
          ),
        ),
      );
    },
  );
}

void showCreateTechnicianServiceSheet(BuildContext context, TenantViewModel vm) {
  var selectedTechnicianId = vm.technicians.items.isNotEmpty
      ? vm.technicians.items.first['id']?.toString() ?? ''
      : '';
  var selectedProviderServiceId = vm.providerServices.items.isNotEmpty
      ? vm.providerServices.items.first['id']?.toString() ?? ''
      : '';
  final skillLevel = TextEditingController();

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(sheetContext).viewInsets.bottom),
        child: Container(
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
              Text('Nuevo servicio técnico', style: Theme.of(context).textTheme.headlineSmall),
              const SizedBox(height: 14),
              DropdownButtonFormField<String>(
                value: selectedTechnicianId.isEmpty ? null : selectedTechnicianId,
                isExpanded: true,
                menuMaxHeight: 320,
                decoration: const InputDecoration(
                  labelText: 'Técnico',
                  helperText: 'Selecciona el técnico asignado al servicio.',
                ),
                selectedItemBuilder: (context) => vm.technicians.items
                    .map(
                      (item) => Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          [
                            item['technician_code']?.toString() ?? '-',
                            item['full_name']?.toString() ?? '-',
                          ].join(' • '),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    )
                    .toList(),
                items: vm.technicians.items
                    .map(
                      (item) => DropdownMenuItem<String>(
                        value: item['id']?.toString(),
                        child: SizedBox(
                          width: double.infinity,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                item['technician_code']?.toString() ??
                                    item['full_name']?.toString() ??
                                    item['id']?.toString() ??
                                    '-',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                                      fontWeight: FontWeight.w700,
                                    ),
                              ),
                              Text(
                                [
                                  item['availability_status']?.toString() ?? '-',
                                  item['status']?.toString() ?? '-',
                                ].join(' • '),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (value) {
                  if (value != null) selectedTechnicianId = value;
                },
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: selectedProviderServiceId.isEmpty ? null : selectedProviderServiceId,
                isExpanded: true,
                menuMaxHeight: 320,
                decoration: const InputDecoration(
                  labelText: 'Servicio de proveedor',
                  helperText: 'El servicio debe venir del catálogo del proveedor.',
                ),
                selectedItemBuilder: (context) => vm.providerServices.items
                    .map(
                      (item) => Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          [
                            item['service_name']?.toString() ?? item['name']?.toString() ?? '-',
                            if ((item['custom_min_price']?.toString() ?? '').trim().isNotEmpty)
                              'Bs ${item['custom_min_price']}',
                            if ((item['custom_max_price']?.toString() ?? '').trim().isNotEmpty)
                              'Bs ${item['custom_max_price']}',
                          ].join(' • '),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    )
                    .toList(),
                items: vm.providerServices.items
                    .map(
                      (item) => DropdownMenuItem<String>(
                        value: item['id']?.toString(),
                        child: SizedBox(
                          width: double.infinity,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                item['service_name']?.toString() ??
                                    item['name']?.toString() ??
                                    item['id']?.toString() ??
                                    '-',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                                      fontWeight: FontWeight.w700,
                                    ),
                              ),
                              Text(
                                [
                                  item['service_catalog_id']?.toString() ?? '-',
                                  if ((item['custom_min_price']?.toString() ?? '').trim().isNotEmpty)
                                    'Min Bs ${item['custom_min_price']}',
                                  if ((item['custom_max_price']?.toString() ?? '').trim().isNotEmpty)
                                    'Max Bs ${item['custom_max_price']}',
                                ].join(' • '),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: Theme.of(context).textTheme.bodySmall,
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (value) {
                  if (value != null) selectedProviderServiceId = value;
                },
              ),
              const SizedBox(height: 12),
              TextField(
                controller: skillLevel,
                decoration: const InputDecoration(labelText: 'Skill level'),
              ),
              const SizedBox(height: 18),
              ElevatedButton(
                onPressed: vm.submitting
                    ? null
                    : () async {
                        if (selectedTechnicianId.isEmpty || selectedProviderServiceId.isEmpty) return;
                        final ok = await vm.createTechnicianService({
                          'technician_id': selectedTechnicianId,
                          'provider_service_id': selectedProviderServiceId,
                          if (skillLevel.text.trim().isNotEmpty) 'skill_level': skillLevel.text.trim(),
                        });
                        if (!context.mounted) return;
                        if (ok) Navigator.of(sheetContext).pop();
                      },
                child: const Text('Crear servicio técnico'),
              ),
            ],
          ),
        ),
      );
    },
  );
}

void showTechnicianManagementSheet(
  BuildContext context,
  TenantViewModel vm,
  Map<String, dynamic> record,
) {
  final technician = record['technician'] is Map
      ? Map<String, dynamic>.from(record['technician'])
      : record;
  final user = record['user'] is Map
      ? Map<String, dynamic>.from(record['user'])
      : record;
  var status = (technician['status']?.toString().isNotEmpty ?? false)
      ? technician['status'].toString()
      : 'ACTIVE';
  var availabilityStatus = (record['availability_status']?.toString().isNotEmpty ?? false)
      ? record['availability_status'].toString()
      : 'AVAILABLE';
  final availableFrom = TextEditingController(
    text: record['available_from']?.toString() ?? '',
  );
  final availableUntil = TextEditingController(
    text: record['available_until']?.toString() ?? '',
  );

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (sheetContext) {
      return StatefulBuilder(
        builder: (context, setState) {
          return _SheetScaffold(
            title: 'Gestión de técnico',
            children: [
              _sheetSummary('Nombre', '${user['first_name'] ?? ''} ${user['last_name'] ?? ''}'.trim()),
              _sheetSummary('Email', user['email']?.toString() ?? '-'),
              _sheetSummary('Código', technician['technician_code']?.toString() ?? '-'),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: status,
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
                value: availabilityStatus,
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
              _sheetField(availableFrom, 'Disponible desde (ISO 8601)', obscureText: false),
              _sheetField(availableUntil, 'Disponible hasta (ISO 8601)', obscureText: false),
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
  final user = record['user'] is Map
      ? Map<String, dynamic>.from(record['user'])
      : record;
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
          return _SheetScaffold(
            title: 'Gestión de miembro',
            children: [
              _sheetSummary('Nombre', '${user['first_name'] ?? ''} ${user['last_name'] ?? ''}'.trim()),
              _sheetSummary('Email', user['email']?.toString() ?? '-'),
              _sheetSummary('Tenant', membership['tenant_id']?.toString() ?? '-'),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: status,
                decoration: const InputDecoration(labelText: 'Estado'),
                items: const [
                  DropdownMenuItem(value: 'ACTIVE', child: Text('Activo')),
                  DropdownMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
                  DropdownMenuItem(value: 'SUSPENDED', child: Text('Suspendido')),
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
      return _SheetScaffold(
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
          _sheetField(latitude, 'Latitud'),
          _sheetField(longitude, 'Longitud'),
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
      return _SheetScaffold(
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
          return _SheetScaffold(
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
                value: operationalStatus,
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
      return _SheetScaffold(
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
      );
    },
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

String _serviceCatalogSummary(Map<String, dynamic> item) {
  final name = item['service_name']?.toString() ??
      item['name']?.toString() ??
      item['code']?.toString() ??
      item['id']?.toString() ??
      '-';
  final code = item['service_code']?.toString() ??
      item['code']?.toString() ??
      '-';
  final category = item['category']?.toString() ?? '-';
  return '$name • $code • $category';
}

String _serviceCatalogPricing(Map<String, dynamic> item) {
  final minPrice = item['min_price']?.toString();
  final maxPrice = item['max_price']?.toString();
  final minDuration = item['min_duration_minutes']?.toString();
  final maxDuration = item['max_duration_minutes']?.toString();
  final pricePart = [
    if (minPrice != null && minPrice != 'null' && minPrice.trim().isNotEmpty) 'Bs $minPrice',
    if (maxPrice != null && maxPrice != 'null' && maxPrice.trim().isNotEmpty) 'Bs $maxPrice',
  ].join(' - ');
  final durationPart = [
    if (minDuration != null && minDuration != 'null' && minDuration.trim().isNotEmpty) minDuration,
    if (maxDuration != null && maxDuration != 'null' && maxDuration.trim().isNotEmpty) maxDuration,
  ].join(' - ');
  return [
    if (pricePart.isNotEmpty) pricePart,
    if (durationPart.isNotEmpty) 'Duración: $durationPart min',
  ].join(' • ');
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
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
      child: Container(
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
      ),
    );
  }
}
