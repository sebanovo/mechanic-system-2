import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../domain/entities/auth_context_entity.dart';
import '../helpers/tenant_record_helpers.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';
import 'tenant_owner_hero.dart';
import 'tenant_owner_records_section.dart';
import 'tenant_owner_sheets.dart';

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
            TenantOwnerHero(
              contextData: auth,
              tenant: tenant,
              detail: detail,
              vm: vm,
            ),
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
              onTap: () => showCreateTechnicianSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Nuevo servicio',
              subtitle: 'Dar de alta un servicio de proveedor.',
              icon: Icons.add_business_rounded,
              onTap: () => showCreateProviderServiceSheet(context, vm),
            ),
            const SizedBox(height: 10),
            ActionCard(
              title: 'Actualizar datos',
              subtitle: 'Recargar perfiles y datos base.',
              icon: Icons.refresh_rounded,
              onTap: () => vm.refresh(),
            ),
            SectionHeader(
              title: 'Administración',
              subtitle: 'Perfil, configuración y red del taller.',
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Perfil legal',
              subtitle: '${profile.isEmpty ? 'Sin datos' : (profile['legal_name'] ?? 'Sin datos').toString()} • ${tenant.isEmpty ? 'Taller sin contexto' : tenantRecordSecondaryLabel(tenant)}',
              icon: Icons.badge_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Perfil del taller', record: profile),
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Configuración',
              subtitle: '${settings.isEmpty ? 'Sin datos' : '${settings['default_currency'] ?? '-'} • ${settings['default_language'] ?? '-'}'} • Zona horaria y preferencias',
              icon: Icons.tune_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Configuración del taller', record: settings),
            ),
            const SizedBox(height: 12),
            ActionCard(
              title: 'Proveedor',
              subtitle: '${provider.isEmpty ? 'Sin perfil' : tenantRecordStatusLabel(provider)} • Estado operativo y emergencias',
              icon: Icons.local_shipping_rounded,
              onTap: () => showTenantRecordDetails(context, title: 'Perfil de proveedor', record: provider),
            ),
            const SizedBox(height: 18),
            TenantOwnerRecordsSection(
              title: 'Tenants disponibles',
              subtitle: 'Contextos que el usuario puede usar.',
              items: vm.myTenants,
            ),
            TenantOwnerRecordsSection(
              title: 'Técnicos',
              subtitle: '${vm.technicians.pagination.total} técnicos registrados.',
              items: vm.technicians.items,
              onLoad: vm.reloadTechnicians,
            ),
            TenantOwnerRecordsSection(
              title: 'Miembros',
              subtitle: '${vm.members.pagination.total} membresías activas o históricas.',
              items: vm.members.items,
              onLoad: vm.reloadMembers,
            ),
            TenantOwnerRecordsSection(
              title: 'Catálogo de servicios',
              subtitle: '${vm.serviceCatalog.pagination.total} servicios base.',
              items: vm.serviceCatalog.items,
              onLoad: vm.reloadServiceCatalog,
            ),
            TenantOwnerRecordsSection(
              title: 'Servicios del proveedor',
              subtitle: '${vm.providerServices.pagination.total} vínculos de proveedor.',
              items: vm.providerServices.items,
              onLoad: vm.reloadProviderServices,
            ),
            TenantOwnerRecordsSection(
              title: 'Servicios técnicos',
              subtitle: '${vm.technicianServices.pagination.total} servicios asignados a técnicos.',
              items: vm.technicianServices.items,
              onLoad: vm.reloadTechnicianServices,
            ),
            TenantOwnerRecordsSection(
              title: 'Candidatos',
              subtitle: '${vm.candidateProviders.pagination.total} proveedores candidatos.',
              items: vm.candidateProviders.items,
              onLoad: vm.reloadCandidateProviders,
            ),
            TenantOwnerRecordsSection(
              title: 'Ofertas',
              subtitle: '${vm.offers.pagination.total} ofertas pendientes o históricas.',
              items: vm.offers.items,
              onLoad: vm.reloadOffers,
            ),
            TenantOwnerRecordsSection(
              title: 'Incidentes',
              subtitle: '${vm.incidents.pagination.total} incidentes en el taller.',
              items: vm.incidents.items,
              onLoad: vm.reloadIncidents,
            ),
            TenantOwnerRecordsSection(
              title: 'Asignaciones',
              subtitle: '${vm.assignments.pagination.total} asignaciones operativas.',
              items: vm.assignments.items,
              onLoad: vm.reloadAssignments,
            ),
            TenantOwnerRecordsSection(
              title: 'Sesiones',
              subtitle: '${vm.sessions.pagination.total} sesiones activas y recientes.',
              items: vm.sessions.items,
              onLoad: vm.reloadTenantSessions,
            ),
            TenantOwnerRecordsSection(
              title: 'Auditoría',
              subtitle: '${vm.auditEvents.pagination.total} eventos registrados.',
              items: vm.auditEvents.items,
              onLoad: vm.reloadAuditEvents,
            ),
          ],
        ),
      ),
    );
  }
}
