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
  final serviceCatalogId = TextEditingController();
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
              TextField(controller: serviceCatalogId, decoration: const InputDecoration(labelText: 'Service catalog ID')),
              const SizedBox(height: 12),
              TextField(controller: minPrice, decoration: const InputDecoration(labelText: 'Precio mínimo')),
              const SizedBox(height: 12),
              TextField(controller: maxPrice, decoration: const InputDecoration(labelText: 'Precio máximo')),
              const SizedBox(height: 18),
              ElevatedButton(
                onPressed: vm.submitting
                    ? null
                    : () async {
                        final ok = await vm.createProviderService({
                          'service_catalog_id': serviceCatalogId.text.trim(),
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

double? _parseNullableDouble(String value) {
  final trimmed = value.trim();
  if (trimmed.isEmpty) return null;
  return double.tryParse(trimmed);
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
