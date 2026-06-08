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
