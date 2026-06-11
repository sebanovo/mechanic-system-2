import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../constants/api_enums.dart';
import '../../domain/entities/auth_entities.dart';
import '../viewmodels/auth_form_controller.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../widgets/app_widgets.dart';
import '../widgets/login_tab.dart';
import '../widgets/register_tab.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key, required this.role});

  final AppEntryRole role;

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuthFormController(role: role),
      child: Consumer<AuthFormController>(
        builder: (context, form, _) {
          final vm = context.watch<AuthViewModel>();
          return Scaffold(
            appBar: AppBar(
              title: Text(_titleForRole(role)),
              leading: IconButton(
                tooltip: 'Regresar',
                onPressed: () {
                  if (context.canPop()) {
                    context.pop();
                  } else {
                    context.go('/entry');
                  }
                },
                icon: const Icon(Icons.arrow_back_rounded),
              ),
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
                        _subtitleForRole(role),
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
                                  LoginTab(
                                    formKey: form.loginKey,
                                    email: form.loginEmail,
                                    password: form.loginPassword,
                                    isLoading: vm.submitting,
                                    onSubmit: () => _submitLogin(context, form),
                                  ),
                                  RegisterTab(
                                    role: role,
                                    formKey: form.registerKey,
                                    email: form.regEmail,
                                    password: form.regPassword,
                                    firstName: form.regFirstName,
                                    lastName: form.regLastName,
                                    commercialName: form.regCommercialName,
                                    tenantKind: form.tenantKind,
                                    onTenantKindChanged: form.setTenantKind,
                                    isLoading: vm.submitting,
                                    onSubmit: () =>
                                        _submitRegister(context, form),
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
        },
      ),
    );
  }

  Future<void> _submitLogin(
    BuildContext context,
    AuthFormController form,
  ) async {
    if (!form.loginKey.currentState!.validate()) return;
    final ok = await context.read<AuthViewModel>().login(
      LoginInput(
        email: form.loginEmail.text.trim(),
        password: form.loginPassword.text,
      ),
    );
    if (!context.mounted || !ok) return;
    _goAfterAuth(context);
  }

  Future<void> _submitRegister(
    BuildContext context,
    AuthFormController form,
  ) async {
    if (!form.registerKey.currentState!.validate()) return;
    final vm = context.read<AuthViewModel>();
    final ok = role == AppEntryRole.client
        ? await vm.registerClient(
            RegisterClientInput(
              email: form.regEmail.text.trim(),
              password: form.regPassword.text,
              firstName: form.regFirstName.text.trim(),
              lastName: form.regLastName.text.trim(),
            ),
          )
        : await vm.registerTenant(
            RegisterTenantInput(
              email: form.regEmail.text.trim(),
              password: form.regPassword.text,
              firstName: form.regFirstName.text.trim(),
              lastName: form.regLastName.text.trim(),
              commercialName: form.regCommercialName.text.trim(),
              tenantKind: form.tenantKind.apiValue,
            ),
          );
    if (!context.mounted || !ok) return;
    _goAfterAuth(context);
  }

  void _goAfterAuth(BuildContext context) {
    final auth = context.read<AuthViewModel>();
    if (auth.selectedRole == AppEntryRole.client) {
      context.go('/home');
    } else {
      context.go('/select-tenants');
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
      AppEntryRole.client => 'Accede a tus vehículos, incidentes y sesiones.',
      AppEntryRole.workshop =>
        'Registra tu taller y gestiona tu acceso al sistema.',
      AppEntryRole.mechanic =>
        'Accede como técnico independiente y administra tu cuenta.',
    };
  }
}
