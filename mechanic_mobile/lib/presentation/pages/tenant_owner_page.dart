import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../../domain/entities/auth_context_entity.dart';
import '../helpers/tenant_record_helpers.dart';
import '../utils/api_enum_labels.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

class TenantOwnerPage extends StatelessWidget {
  const TenantOwnerPage({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthViewModel>().contextData;
    final vm = context.watch<TenantViewModel>();
    vm.scheduleBootstrap();

    final tenant = vm.currentTenant ?? const <String, dynamic>{};
    final detail = vm.currentTenantDetail ?? const <String, dynamic>{};
    final profile = vm.currentProfile ?? const <String, dynamic>{};
    final settings = vm.currentSettings ?? const <String, dynamic>{};
    final provider = vm.currentProviderProfile ?? const <String, dynamic>{};

    return Scaffold(
      appBar: AppBar(
        title: const Text('Taller'),
        actions: [
          IconButton(
            onPressed: vm.loading ? null : () => vm.refresh(),
            icon: const Icon(Icons.refresh_rounded),
          ),
          IconButton(
            onPressed: () => context.push('/sessions'),
            icon: const Icon(Icons.devices_other_rounded),
          ),
          IconButton(
            onPressed: () => context.push('/settings'),
            icon: const Icon(Icons.settings_rounded),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: vm.refresh,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
          children: [
            _ownerHero(context, auth, tenant, detail, vm),
            const SizedBox(height: 16),
            if (vm.error != null) ...[
              ErrorBanner(message: vm.error!),
              const SizedBox(height: 12),
            ],
            if (vm.loading) ...[
              const LinearProgressIndicator(),
              const SizedBox(height: 12),
            ],
            SectionHeader(
              title: 'Acciones',
              subtitle: 'Operaciones rápidas del taller.',
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nuevo técnico',
              subtitle: 'Registrar un nuevo técnico en el tenant actual.',
              icon: Icons.person_add_alt_1_rounded,
              onTap: () => _showCreateTechnicianSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nuevo servicio',
              subtitle: 'Dar de alta un servicio de proveedor.',
              icon: Icons.add_business_rounded,
              onTap: () => _showCreateProviderServiceSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Actualizar datos',
              subtitle: 'Recargar perfiles, técnicos y servicios.',
              icon: Icons.refresh_rounded,
              onTap: () => vm.refresh(),
            ),
            SectionHeader(
              title: 'Administración',
              subtitle: 'Perfil, configuración y red del taller.',
            ),
            const SizedBox(height: 12),
            _summaryCard(
              context,
              title: 'Perfil legal',
              value: profile.isEmpty ? 'Sin datos' : (profile['legal_name'] ?? 'Sin datos').toString(),
              subtitle: tenant.isEmpty ? 'Taller sin contexto' : tenantRecordSecondaryLabel(tenant),
              icon: Icons.badge_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Perfil del taller', record: profile),
            ),
            const SizedBox(height: 12),
            _summaryCard(
              context,
              title: 'Configuración',
              value: settings.isEmpty ? 'Sin datos' : '${settings['default_currency'] ?? '-'} • ${settings['default_language'] ?? '-'}',
              subtitle: 'Zona horaria y preferencias',
              icon: Icons.tune_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Configuración del taller', record: settings),
            ),
            const SizedBox(height: 12),
            _summaryCard(
              context,
              title: 'Proveedor',
              value: provider.isEmpty ? 'Sin perfil' : tenantRecordStatusLabel(provider),
              subtitle: 'Estado operativo y emergencias',
              icon: Icons.local_shipping_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Perfil de proveedor', record: provider),
            ),
            const SizedBox(height: 18),
            _recordsSection(
              context,
              title: 'Tenants disponibles',
              subtitle: 'Contextos que el usuario puede usar.',
              items: vm.myTenants,
            ),
            _recordsSection(
              context,
              title: 'Técnicos',
              subtitle: '${vm.technicians.pagination.total} técnicos registrados.',
              items: vm.technicians.items,
            ),
            _recordsSection(
              context,
              title: 'Miembros',
              subtitle: '${vm.members.pagination.total} membresías activas o históricas.',
              items: vm.members.items,
            ),
            _recordsSection(
              context,
              title: 'Catálogo de servicios',
              subtitle: '${vm.serviceCatalog.pagination.total} servicios base.',
              items: vm.serviceCatalog.items,
            ),
            _recordsSection(
              context,
              title: 'Servicios del proveedor',
              subtitle: '${vm.providerServices.pagination.total} vínculos de proveedor.',
              items: vm.providerServices.items,
            ),
            _recordsSection(
              context,
              title: 'Servicios técnicos',
              subtitle: '${vm.technicianServices.pagination.total} servicios asignados a técnicos.',
              items: vm.technicianServices.items,
            ),
            _recordsSection(
              context,
              title: 'Candidatos',
              subtitle: '${vm.candidateProviders.pagination.total} proveedores candidatos.',
              items: vm.candidateProviders.items,
            ),
            _recordsSection(
              context,
              title: 'Ofertas',
              subtitle: '${vm.offers.pagination.total} ofertas pendientes o históricas.',
              items: vm.offers.items,
            ),
            _recordsSection(
              context,
              title: 'Incidentes',
              subtitle: '${vm.incidents.pagination.total} incidentes en el taller.',
              items: vm.incidents.items,
            ),
            _recordsSection(
              context,
              title: 'Asignaciones',
              subtitle: '${vm.assignments.pagination.total} asignaciones operativas.',
              items: vm.assignments.items,
            ),
            _recordsSection(
              context,
              title: 'Sesiones',
              subtitle: '${vm.sessions.pagination.total} sesiones activas y recientes.',
              items: vm.sessions.items,
            ),
            _recordsSection(
              context,
              title: 'Auditoría',
              subtitle: '${vm.auditEvents.pagination.total} eventos registrados.',
              items: vm.auditEvents.items,
            ),
          ],
        ),
      ),
    );
  }
}

Widget _ownerHero(
  BuildContext context,
  AuthContextEntity? auth,
  Map<String, dynamic> tenant,
  Map<String, dynamic> detail,
  TenantViewModel vm,
) {
  final current = detail['tenant'] is Map ? Map<String, dynamic>.from(detail['tenant']) : tenant;
  return SurfaceCard(
    padding: const EdgeInsets.all(0),
    child: Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            SapphirePalette.sapphire700,
            SapphirePalette.sapphire500,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.all(Radius.circular(28)),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              auth?.user.fullName ?? 'Propietario de taller',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              tenant.isEmpty ? 'Sin tenant actual seleccionado' : tenant['commercial_name'].toString(),
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: Colors.white.withOpacity(0.9),
                  ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                _heroChip(context, tenantUserTypeLabelFromApi(auth?.userType), Icons.verified_user_rounded),
                _heroChip(context, tenantKindLabelFromApi(current['tenant_kind']?.toString()), Icons.apartment_rounded),
                _heroChip(context, tenantRecordStatusLabel(current), Icons.bolt_rounded),
              ],
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                Expanded(
                  child: _heroAction(
                    context,
                    label: 'Recargar',
                    icon: Icons.refresh_rounded,
                    onTap: () => vm.refresh(),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _heroAction(
                    context,
                    label: 'Sesiones',
                    icon: Icons.devices_other_rounded,
                    onTap: () => context.push('/sessions'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _heroChip(BuildContext context, String label, IconData icon) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: Colors.white.withOpacity(0.14),
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: Colors.white.withOpacity(0.16)),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white, size: 18),
        const SizedBox(width: 8),
        Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w800,
              ),
        ),
      ],
    ),
  );
}

Widget _heroAction(
  BuildContext context, {
  required String label,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return Material(
    color: Colors.white,
    borderRadius: BorderRadius.circular(18),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: SapphirePalette.sapphire700, size: 20),
            const SizedBox(width: 8),
            Flexible(
              child: Text(
                label,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                      color: SapphirePalette.sapphire900,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

Widget _summaryCard(
  BuildContext context, {
  required String title,
  required String value,
  required String subtitle,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return ActionCard(
    title: title,
    subtitle: '$value • $subtitle',
    icon: icon,
    onTap: onTap,
  );
}

Widget _recordsSection(
  BuildContext context, {
  required String title,
  required String subtitle,
  required List<Map<String, dynamic>> items,
}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      SectionHeader(title: title, subtitle: subtitle),
      const SizedBox(height: 10),
      if (items.isEmpty)
        const Padding(
          padding: EdgeInsets.only(bottom: 12),
          child: EmptyStatePanel(
            title: 'Sin resultados',
            subtitle: 'No hay elementos para mostrar en esta sección.',
            icon: Icons.inbox_rounded,
          ),
        )
      else
        ...items.take(3).map(
          (item) => Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: SurfaceCard(
              child: ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(tenantRecordPrimaryLabel(item)),
                subtitle: Text(tenantRecordSecondaryLabel(item)),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    StatusBadge(label: tenantRecordStatusLabel(item)),
                    const SizedBox(width: 8),
                    _recordActions(context, title, item),
                  ],
                ),
                onTap: () => showTenantRecordDetails(
                  context,
                  title: title,
                  record: item,
                ),
              ),
            ),
          ),
        ),
    ],
  );
}

Widget _recordActions(
  BuildContext context,
  String title,
  Map<String, dynamic> item,
) {
  final recordId = tenantRecordId(item);
  if (recordId.isEmpty) return const SizedBox.shrink();

  if (title == 'Técnicos') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar estado',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.updateTechnicianStatus(recordId, value);
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'ACTIVE', child: Text('Activo')),
        PopupMenuItem(value: 'INACTIVE', child: Text('Inactivo')),
        PopupMenuItem(value: 'BLOCKED', child: Text('Bloqueado')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  if (title == 'Servicios del proveedor') {
    return PopupMenuButton<String>(
      tooltip: 'Cambiar disponibilidad',
      onSelected: (value) async {
        final vm = context.read<TenantViewModel>();
        await vm.updateProviderServiceStatus(recordId, value == 'true');
      },
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'true', child: Text('Disponible')),
        PopupMenuItem(value: 'false', child: Text('No disponible')),
      ],
      child: const Icon(Icons.more_vert_rounded),
    );
  }

  return const SizedBox.shrink();
}

void _showCreateTechnicianSheet(BuildContext context, TenantViewModel vm) {
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

void _showCreateProviderServiceSheet(BuildContext context, TenantViewModel vm) {
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
