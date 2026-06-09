import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../app/theme/app_theme.dart';
import '../../core/services/session_storage.dart';
import '../../domain/entities/app_entities.dart';
import '../viewmodels/auth_viewmodel.dart';
import '../viewmodels/app_viewmodels.dart';
import '../widgets/app_widgets.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final profileVm = context.watch<ProfileViewModel>();
    final sessionsVm = context.watch<SessionsViewModel>();
    final storage = context.watch<SessionStorage>();
    if (!profileVm.loaded && !profileVm.loading) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<ProfileViewModel>().loadProfile();
          context.read<SessionsViewModel>().loadSessions();
        }
      });
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        SurfaceCard(
          padding: const EdgeInsets.all(18),
          child: Row(
            children: [
              CircleAvatar(
                radius: 28,
                backgroundColor: SapphirePalette.sapphire50,
                child: Text(
                  _initials(profileVm.profile?.fullName ?? 'CM'),
                  style: const TextStyle(
                    color: SapphirePalette.sapphire700,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      profileVm.profile?.fullName ?? 'Perfil de cliente',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      profileVm.profile?.email ?? 'Sin correo cargado',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () => _showProfileForm(context, profileVm.profile),
                icon: const Icon(Icons.edit_rounded),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        if (profileVm.error != null) ErrorBanner(message: profileVm.error!),
        SectionHeader(
          title: 'Cuenta',
          subtitle: 'Datos de acceso y seguridad.',
        ),
        const SizedBox(height: 12),
        SurfaceCard(
          child: Column(
            children: [
              InfoRow(label: 'Tipo', value: profileVm.profile?.userType ?? '-'),
              const Divider(height: 24),
              InfoRow(label: 'Estado', value: profileVm.profile?.status ?? '-'),
              const Divider(height: 24),
              InfoRow(
                label: 'Verificado',
                value: profileVm.profile?.emailVerified == true ? 'Sí' : 'No',
              ),
              const Divider(height: 24),
              InfoRow(label: 'API', value: storage.apiBaseUrl),
            ],
          ),
        ),
        const SizedBox(height: 16),
        SectionHeader(
          title: 'Seguridad',
          subtitle: 'Gestiona contraseña y sesiones activas.',
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Cambiar contraseña',
          subtitle: 'Actualiza las credenciales de acceso.',
          icon: Icons.lock_reset_rounded,
          onTap: () => _showPasswordDialog(context),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Sesiones activas',
          subtitle:
              '${sessionsVm.sessions?.items.length ?? 0} sesiones registradas',
          icon: Icons.devices_rounded,
          onTap: () => context.push('/sessions'),
        ),
        const SizedBox(height: 12),
        ActionCard(
          title: 'Notificaciones',
          subtitle: 'Dispositivos push y mensajes del backend.',
          icon: Icons.notifications_rounded,
          onTap: () => context.push('/notifications'),
        ),
        const SizedBox(height: 12),
        if (sessionsVm.loading)
          const Center(
            child: Padding(
              padding: EdgeInsets.all(20),
              child: CircularProgressIndicator(),
            ),
          )
        else if (sessionsVm.sessions?.items.isEmpty ?? true)
          const EmptyStatePanel(
            title: 'No hay sesiones activas',
            subtitle: 'Cuando inicies sesión se mostrarán aquí.',
            icon: Icons.devices_rounded,
          )
        else
          ...sessionsVm.sessions!.items
              .take(3)
              .map(
                (session) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SurfaceCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                session.deviceName ?? 'Dispositivo',
                                style: Theme.of(context).textTheme.titleMedium
                                    ?.copyWith(fontWeight: FontWeight.w700),
                              ),
                            ),
                            StatusBadge(label: session.sessionStatus),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Expira: ${_formatDate(session.expiresAt)}',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 12),
                        OutlinedButton(
                          onPressed: () async {
                            final ok = await context
                                .read<SessionsViewModel>()
                                .revoke(session.id);
                            if (!context.mounted) return;
                            _toast(
                              context,
                              ok ? 'Sesión revocada' : 'No se pudo revocar',
                            );
                          },
                          child: const Text('Revocar'),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
        const SizedBox(height: 18),
        ElevatedButton.icon(
          onPressed: () async {
            await context.read<AuthViewModel>().signOut();
            if (!context.mounted) return;
            context.go('/entry');
          },
          icon: const Icon(Icons.logout_rounded),
          label: const Text('Cerrar sesión'),
        ),
      ],
    );
  }
}

Future<void> _showProfileForm(
  BuildContext context,
  ClientEntity? current,
) async {
  final formKey = GlobalKey<FormState>();
  final firstName = TextEditingController(text: current?.firstName ?? '');
  final lastName = TextEditingController(text: current?.lastName ?? '');
  final phone = TextEditingController(text: current?.phone ?? '');
  final avatar = TextEditingController(text: current?.avatarUrl ?? '');

  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Editar perfil'),
      content: SizedBox(
        width: 480,
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: firstName,
                  decoration: const InputDecoration(labelText: 'Nombre'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: lastName,
                  decoration: const InputDecoration(labelText: 'Apellido'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: phone,
                  decoration: const InputDecoration(labelText: 'Teléfono'),
                ),
                const SizedBox(height: 10),
                TextFormField(
                  controller: avatar,
                  decoration: const InputDecoration(labelText: 'Avatar URL'),
                ),
              ],
            ),
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () async {
            final updated = await context
                .read<ProfileViewModel>()
                .updateProfile(
                  ClientUpdateInput(
                    firstName: firstName.text.trim().isEmpty
                        ? null
                        : firstName.text.trim(),
                    lastName: lastName.text.trim().isEmpty
                        ? null
                        : lastName.text.trim(),
                    phone: phone.text.trim().isEmpty ? null : phone.text.trim(),
                    avatarUrl: avatar.text.trim().isEmpty
                        ? null
                        : avatar.text.trim(),
                  ),
                );
            if (!dialogContext.mounted) return;
            Navigator.of(dialogContext).pop(updated);
          },
          child: const Text('Guardar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    _toast(context, 'Perfil actualizado');
  }
}

Future<void> _showPasswordDialog(BuildContext context) async {
  final formKey = GlobalKey<FormState>();
  final currentPassword = TextEditingController();
  final newPassword = TextEditingController();

  final ok = await showDialog<bool>(
    context: context,
    builder: (dialogContext) => AlertDialog(
      title: const Text('Cambiar contraseña'),
      content: SizedBox(
        width: 420,
        child: Form(
          key: formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextFormField(
                controller: currentPassword,
                decoration: const InputDecoration(
                  labelText: 'Contraseña actual',
                ),
                obscureText: true,
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: newPassword,
                decoration: const InputDecoration(
                  labelText: 'Nueva contraseña',
                ),
                obscureText: true,
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(dialogContext).pop(false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () async {
            final changed = await context
                .read<ProfileViewModel>()
                .updatePassword(
                  PasswordChangeInput(
                    currentPassword: currentPassword.text,
                    newPassword: newPassword.text,
                  ),
                );
            if (!dialogContext.mounted) return;
            Navigator.of(dialogContext).pop(changed);
          },
          child: const Text('Cambiar'),
        ),
      ],
    ),
  );

  if (ok == true && context.mounted) {
    _toast(context, 'Contraseña actualizada');
  }
}

String _initials(String value) {
  final parts = value.trim().split(RegExp(r'\s+'));
  if (parts.isEmpty) return 'CM';
  if (parts.length == 1)
    return parts.first.isEmpty
        ? 'CM'
        : parts.first.substring(0, 1).toUpperCase();
  return ('${parts.first[0]}${parts[1][0]}').toUpperCase();
}

String _formatDate(DateTime? value) {
  if (value == null) return '-';
  return '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}';
}

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}
