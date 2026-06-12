import 'package:flutter/material.dart';
import 'package:mechanic_mobile/domain/entities/auth_entities.dart';

import '../../constants/api_enums.dart';
import 'app_widgets.dart';

class RegisterTab extends StatelessWidget {
  const RegisterTab({
    super.key,
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
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Crea tu acceso',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 6),
          Text(
            role == AppEntryRole.client
                ? 'Regístrate como cliente para manejar tus vehículos e incidentes.'
                : 'Completa tus datos para entrar al flujo de taller.',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: email,
            decoration: const InputDecoration(labelText: 'Correo electrónico'),
            keyboardType: TextInputType.emailAddress,
            validator: (value) =>
                value == null || value.trim().isEmpty ? 'Requerido' : null,
          ),
          const SizedBox(height: 12),
          PasswordTextField(
            controller: password,
            label: 'Contraseña',
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
              initialValue: tenantKind,
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
