import 'package:flutter/material.dart';

import 'app_widgets.dart';

class LoginTab extends StatelessWidget {
  const LoginTab({
    super.key,
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
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Ingresa con tu cuenta',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 6),
          Text(
            'Usa tus credenciales para abrir la app con el rol correcto.',
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
