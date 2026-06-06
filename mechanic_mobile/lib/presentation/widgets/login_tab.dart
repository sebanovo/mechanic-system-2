import 'package:flutter/material.dart';

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
