import 'package:flutter/material.dart';

class PasswordTextField extends StatefulWidget {
  const PasswordTextField({
    super.key,
    required this.controller,
    required this.label,
    this.validator,
    this.enabled = true,
    this.autofillHints,
    this.textInputAction,
  });

  final TextEditingController controller;
  final String label;
  final String? Function(String?)? validator;
  final bool enabled;
  final Iterable<String>? autofillHints;
  final TextInputAction? textInputAction;

  @override
  State<PasswordTextField> createState() => _PasswordTextFieldState();
}

class _PasswordTextFieldState extends State<PasswordTextField> {
  bool _obscure = true;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: widget.controller,
      enabled: widget.enabled,
      obscureText: _obscure,
      autofillHints: widget.autofillHints,
      textInputAction: widget.textInputAction,
      decoration: InputDecoration(
        labelText: widget.label,
        suffixIcon: IconButton(
          tooltip: _obscure ? 'Mostrar contraseña' : 'Ocultar contraseña',
          onPressed: () => setState(() => _obscure = !_obscure),
          icon: Icon(_obscure ? Icons.visibility_rounded : Icons.visibility_off_rounded),
        ),
      ),
      validator: widget.validator,
    );
  }
}
