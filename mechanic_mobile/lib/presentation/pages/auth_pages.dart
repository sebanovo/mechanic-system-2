import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../../constants/api_enums.dart';
import '../../domain/entities/auth_entities.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../widgets/app_widgets.dart';
import '../utils/api_enum_labels.dart';

class EntryPage extends StatelessWidget {
  const EntryPage({super.key});

  @override
  Widget build(BuildContext context) {
    final authVm = context.watch<AuthViewModel>();

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              SapphirePalette.sapphire950,
              SapphirePalette.sapphire800,
              SapphirePalette.sapphire500,
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 8),
                Text(
                  'Auxilio mecánico',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        color: Colors.white,
                        fontSize: 32,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Elige tu puerta de entrada para continuar con el flujo correcto.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white.withOpacity(0.84),
                      ),
                ),
                if (authVm.loading) ...[
                  const SizedBox(height: 10),
                  Text(
                    'Restaurando sesión...',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white.withOpacity(0.75),
                        ),
                  ),
                ],
                if (authVm.error != null) ...[
                  const SizedBox(height: 12),
                  ErrorBanner(message: authVm.error!),
                ],
                const SizedBox(height: 24),
                Expanded(
                  child: ListView(
                    children: [
                      _RoleEntryCard(
                        title: 'Soy Cliente',
                        subtitle: 'Gestiona vehículos, incidentes y sesiones.',
                        icon: Icons.person_rounded,
                        accent: SapphirePalette.sapphire500,
                        onTap: () => context.go('/auth/client'),
                      ),
                      const SizedBox(height: 14),
                      _RoleEntryCard(
                        title: 'Soy Taller',
                        subtitle: 'Registra tu taller y administra tu presencia.',
                        icon: Icons.handyman_rounded,
                        accent: SapphirePalette.sapphire700,
                        onTap: () => context.go('/auth/workshop'),
                      ),
                      const SizedBox(height: 14),
                      _RoleEntryCard(
                        title: 'Soy Mecanico',
                        subtitle: 'Entra como técnico independiente.',
                        icon: Icons.build_rounded,
                        accent: SapphirePalette.sapphire900,
                        onTap: () => context.go('/auth/mechanic'),
                      ),
                      if (authVm.contextData != null) ...[
                        const SizedBox(height: 18),
                        SurfaceCard(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Sesión guardada',
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(height: 6),
                              Text(
                                authVm.contextData!.user.fullName,
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                              const SizedBox(height: 12),
                              ElevatedButton(
                                onPressed: () {
                                  if (authVm.selectedRole == AppEntryRole.client) {
                                    context.go('/home');
                                  } else {
                                    context.go('/tenant-home');
                                  }
                                },
                                child: const Text('Continuar sesión'),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class AuthPage extends StatefulWidget {
  const AuthPage({super.key, required this.role});

  final AppEntryRole role;

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  final _loginKey = GlobalKey<FormState>();
  final _registerKey = GlobalKey<FormState>();
  late final TextEditingController _loginEmail;
  late final TextEditingController _loginPassword;
  late final TextEditingController _regEmail;
  late final TextEditingController _regPassword;
  late final TextEditingController _regFirstName;
  late final TextEditingController _regLastName;
  late final TextEditingController _regCommercialName;
  late TenantKind _tenantKind;

  @override
  void initState() {
    super.initState();
    _loginEmail = TextEditingController();
    _loginPassword = TextEditingController();
    _regEmail = TextEditingController();
    _regPassword = TextEditingController();
    _regFirstName = TextEditingController();
    _regLastName = TextEditingController();
    _regCommercialName = TextEditingController();
    _tenantKind = switch (widget.role) {
      AppEntryRole.client => TenantKind.workshop,
      AppEntryRole.workshop => TenantKind.workshop,
      AppEntryRole.mechanic => TenantKind.independentTechnician,
    };
  }

  @override
  void dispose() {
    _loginEmail.dispose();
    _loginPassword.dispose();
    _regEmail.dispose();
    _regPassword.dispose();
    _regFirstName.dispose();
    _regLastName.dispose();
    _regCommercialName.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<AuthViewModel>();

    return Scaffold(
      appBar: AppBar(
        title: Text(_titleForRole(widget.role)),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SurfaceCard(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Acceso rápido',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  _subtitleForRole(widget.role),
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                if (vm.error != null) ...[
                  const SizedBox(height: 12),
                  ErrorBanner(message: vm.error!),
                ],
                const SizedBox(height: 12),
                DefaultTabController(
                  length: 2,
                  child: Column(
                    children: [
                      const TabBar(
                        tabs: [
                          Tab(text: 'Ingresar'),
                          Tab(text: 'Registrarme'),
                        ],
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        height: 700,
                        child: TabBarView(
                          children: [
                            _LoginTab(
                              formKey: _loginKey,
                              email: _loginEmail,
                              password: _loginPassword,
                              isLoading: vm.submitting,
                              onSubmit: () => _submitLogin(context),
                            ),
                            _RegisterTab(
                              role: widget.role,
                              formKey: _registerKey,
                              email: _regEmail,
                              password: _regPassword,
                              firstName: _regFirstName,
                              lastName: _regLastName,
                              commercialName: _regCommercialName,
                              tenantKind: _tenantKind,
                              onTenantKindChanged: (value) {
                                setState(() {
                                  _tenantKind = value;
                                });
                              },
                              isLoading: vm.submitting,
                              onSubmit: () => _submitRegister(context),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _submitLogin(BuildContext context) async {
    if (!_loginKey.currentState!.validate()) return;
    final ok = await context.read<AuthViewModel>().login(
          LoginInput(
            email: _loginEmail.text.trim(),
            password: _loginPassword.text,
          ),
        );
    if (!context.mounted || !ok) return;
    _goAfterAuth(context);
  }

  Future<void> _submitRegister(BuildContext context) async {
    if (!_registerKey.currentState!.validate()) return;
    final vm = context.read<AuthViewModel>();
    final ok = widget.role == AppEntryRole.client
        ? await vm.registerClient(
            RegisterClientInput(
              email: _regEmail.text.trim(),
              password: _regPassword.text,
              firstName: _regFirstName.text.trim(),
              lastName: _regLastName.text.trim(),
            ),
          )
        : await vm.registerTenant(
              RegisterTenantInput(
              email: _regEmail.text.trim(),
              password: _regPassword.text,
              firstName: _regFirstName.text.trim(),
              lastName: _regLastName.text.trim(),
              commercialName: _regCommercialName.text.trim(),
              tenantKind: _tenantKind.apiValue,
            ),
          );
    if (!context.mounted || !ok) return;
    _goAfterAuth(context);
  }

  void _goAfterAuth(BuildContext context) {
    final role = context.read<AuthViewModel>().selectedRole;
    if (role == AppEntryRole.client) {
      context.go('/home');
    } else {
      context.go('/tenant-home');
    }
  }

  String _titleForRole(AppEntryRole role) {
    return switch (role) {
      AppEntryRole.client => 'Soy Cliente',
      AppEntryRole.workshop => 'Soy Taller',
      AppEntryRole.mechanic => 'Soy Mecanico',
    };
  }

  String _subtitleForRole(AppEntryRole role) {
    return switch (role) {
      AppEntryRole.client =>
        'Accede a tus vehículos, incidentes y sesiones.',
      AppEntryRole.workshop =>
        'Registra tu taller y gestiona tu acceso al sistema.',
      AppEntryRole.mechanic =>
        'Accede como técnico independiente y administra tu cuenta.',
    };
  }
}

class TenantHubPage extends StatelessWidget {
  const TenantHubPage({super.key});

  @override
  Widget build(BuildContext context) {
    final vm = context.watch<AuthViewModel>();
    final auth = vm.contextData;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Panel de taller'),
        actions: [
          IconButton(
            onPressed: vm.loading ? null : () => vm.refresh(),
            icon: const Icon(Icons.refresh_rounded),
          ),
          IconButton(
            onPressed: () async {
              await context.read<AuthViewModel>().signOut();
              if (!context.mounted) return;
              context.go('/entry');
            },
            icon: const Icon(Icons.logout_rounded),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  auth?.user.fullName ?? 'Usuario autenticado',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontSize: 26,
                      ),
                ),
                const SizedBox(height: 8),
                Text(auth?.user.email ?? '-'),
                const SizedBox(height: 12),
                Text('Rol: ${auth?.userType ?? '-'}'),
                const SizedBox(height: 4),
                Text('Tenant actual: ${auth?.currentTenant?.commercialName ?? 'No seleccionado'}'),
              ],
            ),
          ),
          const SizedBox(height: 16),
          SectionHeader(
            title: 'Tenants disponibles',
            subtitle: 'Selecciona el contexto de trabajo cuando sea necesario.',
          ),
          const SizedBox(height: 12),
          if (auth?.availableTenants.isEmpty ?? true)
            const EmptyStatePanel(
              title: 'Sin tenants',
              subtitle: 'El backend no devolvió tenants disponibles.',
              icon: Icons.apartment_rounded,
            )
          else
            ...auth!.availableTenants.map(
              (tenant) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: SurfaceCard(
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              tenant.commercialName,
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 6),
                            Text(
                              '${tenantKindLabelFromApi(tenant.tenantKind)} • ${tenant.status}',
                            ),
                          ],
                        ),
                      ),
                      OutlinedButton(
                        onPressed: vm.submitting
                            ? null
                            : () async {
                                final ok = await context
                                    .read<AuthViewModel>()
                                    .selectTenant(tenant.id);
                                if (!context.mounted) return;
                                if (ok) {
                                  showAppSnackBar(context, 'Tenant seleccionado');
                                }
                              },
                        child: const Text('Usar'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class TenantHomePage extends StatelessWidget {
  const TenantHomePage({super.key});

  @override
  Widget build(BuildContext context) => const TenantHubPage();
}

class _RoleEntryCard extends StatelessWidget {
  const _RoleEntryCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.accent,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final Color accent;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(28),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(28),
          color: Colors.white.withOpacity(0.08),
          border: Border.all(color: Colors.white.withOpacity(0.12)),
        ),
        child: Row(
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: accent.withOpacity(0.18),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Icon(icon, color: Colors.white, size: 28),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          color: Colors.white,
                        ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    subtitle,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white.withOpacity(0.82),
                        ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right_rounded, color: Colors.white),
          ],
        ),
      ),
    );
  }
}

class _LoginTab extends StatelessWidget {
  const _LoginTab({
    required this.formKey,
    required this.email,
    required this.password,
    required this.isLoading,
    required this.onSubmit,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController email;
  final TextEditingController password;
  final bool isLoading;
  final VoidCallback onSubmit;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        children: [
          TextFormField(
            controller: email,
            decoration: const InputDecoration(labelText: 'Correo electrónico'),
            keyboardType: TextInputType.emailAddress,
            validator: (value) =>
                value == null || value.trim().isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: password,
            decoration: const InputDecoration(labelText: 'Contraseña'),
            obscureText: true,
            validator: (value) =>
                value == null || value.isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: isLoading ? null : onSubmit,
            child: Text(isLoading ? 'Procesando...' : 'Ingresar'),
          ),
        ],
      ),
    );
  }
}

class _RegisterTab extends StatelessWidget {
  const _RegisterTab({
    required this.role,
    required this.formKey,
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    required this.commercialName,
    required this.tenantKind,
    required this.onTenantKindChanged,
    required this.isLoading,
    required this.onSubmit,
  });

  final AppEntryRole role;
  final GlobalKey<FormState> formKey;
  final TextEditingController email;
  final TextEditingController password;
  final TextEditingController firstName;
  final TextEditingController lastName;
  final TextEditingController commercialName;
  final TenantKind tenantKind;
  final ValueChanged<TenantKind> onTenantKindChanged;
  final bool isLoading;
  final VoidCallback onSubmit;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        children: [
          TextFormField(
            controller: email,
            decoration: const InputDecoration(labelText: 'Correo electrónico'),
            keyboardType: TextInputType.emailAddress,
            validator: (value) =>
                value == null || value.trim().isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: password,
            decoration: const InputDecoration(labelText: 'Contraseña'),
            obscureText: true,
            validator: (value) =>
                value == null || value.isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: firstName,
            decoration: const InputDecoration(labelText: 'Nombre'),
            validator: (value) =>
                value == null || value.trim().isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: lastName,
            decoration: const InputDecoration(labelText: 'Apellido'),
            validator: (value) =>
                value == null || value.trim().isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 12),
          if (role != AppEntryRole.client) ...[
            TextFormField(
              controller: commercialName,
              decoration: const InputDecoration(labelText: 'Nombre comercial'),
              validator: (value) =>
                  value == null || value.trim().isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<TenantKind>(
              value: tenantKind,
              decoration: const InputDecoration(labelText: 'Tipo de tenant'),
              items: tenantKindOptions
                  .map(
                    (item) => DropdownMenuItem<TenantKind>(
                      value: item,
                      child: Text(item.label),
                    ),
                  )
                  .toList(),
              onChanged: (value) {
                if (value != null) onTenantKindChanged(value);
              },
            ),
            const SizedBox(height: 12),
          ],
          ElevatedButton(
            onPressed: isLoading ? null : onSubmit,
            child: Text(isLoading ? 'Procesando...' : 'Registrarme'),
          ),
        ],
      ),
    );
  }
}
