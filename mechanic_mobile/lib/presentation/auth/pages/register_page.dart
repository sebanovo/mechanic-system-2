import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/di/injection_container.dart';
import '../viewmodels/auth_viewmodel.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late final AuthViewModel _authViewModel;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _phoneController = TextEditingController();

  final _businessNameController = TextEditingController();
  final _legalNameController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _contactEmailController = TextEditingController();
  final _contactPhoneController = TextEditingController();
  final _cityController = TextEditingController();
  final _addressController = TextEditingController();

  bool _showPassword = false;
  String _accountType = 'CLIENT';

  @override
  void initState() {
    super.initState();
    _authViewModel = sl<AuthViewModel>();
  }

  Map<String, dynamic> _buildRegisterBody() {
    final body = <String, dynamic>{
      "email": _emailController.text.trim(),
      "password": _passwordController.text,
      "first_name": _firstNameController.text.trim(),
      "last_name": _lastNameController.text.trim(),
      "account_type": _accountType,
      "phone_number": _phoneController.text.trim(),
    };

    if (_accountType == 'WORKSHOP') {
      body["provider_profile"] = {
        "business_name": _businessNameController.text.trim(),
        "legal_name": _legalNameController.text.trim(),
        "description": _descriptionController.text.trim(),
        "contact_email": _contactEmailController.text.trim(),
        "contact_phone": _contactPhoneController.text.trim(),
        "city": _cityController.text.trim(),
        "address": _addressController.text.trim(),
      };
    }
    return body;
  }

  Future<void> _onRegister() async {
    final success = await _authViewModel.register(_buildRegisterBody());
    if (!mounted) return;
    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Registro exitoso. Ahora puedes ingresar.'),
        ),
      );
      context.go('/login');
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(_authViewModel.errorMessage ?? 'Error de registro'),
      ),
    );
  }

  Widget _textField(
    TextEditingController controller,
    String label, {
    bool obscure = false,
    Widget? suffixIcon,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: TextField(
        controller: controller,
        obscureText: obscure,
        decoration: InputDecoration(
          labelText: label,
          border: const OutlineInputBorder(),
          suffixIcon: suffixIcon,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Crear cuenta')),
      body: ListenableBuilder(
        listenable: _authViewModel,
        builder: (context, _) {
          final isLoading = _authViewModel.isLoading;
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                _textField(_emailController, 'Email'),
                _textField(
                  _passwordController,
                  'Password',
                  obscure: !_showPassword,
                  suffixIcon: IconButton(
                    onPressed: () {
                      setState(() => _showPassword = !_showPassword);
                    },
                    icon: Icon(
                      _showPassword ? Icons.visibility_off : Icons.visibility,
                    ),
                  ),
                ),
                _textField(_firstNameController, 'Nombre'),
                _textField(_lastNameController, 'Apellido'),
                _textField(_phoneController, 'Telefono'),
                DropdownButtonFormField<String>(
                  initialValue: _accountType,
                  decoration: const InputDecoration(
                    labelText: 'Tipo de cuenta',
                    border: OutlineInputBorder(),
                  ),
                  items: const [
                    DropdownMenuItem(value: 'CLIENT', child: Text('CLIENT')),
                    DropdownMenuItem(
                      value: 'INDEPENDENT_MECHANIC',
                      child: Text('INDEPENDENT_MECHANIC'),
                    ),
                    DropdownMenuItem(
                      value: 'WORKSHOP',
                      child: Text('WORKSHOP'),
                    ),
                  ],
                  onChanged: (value) {
                    if (value != null) setState(() => _accountType = value);
                  },
                ),
                const SizedBox(height: 12),
                if (_accountType == 'WORKSHOP') ...[
                  _textField(_businessNameController, 'Business name'),
                  _textField(_legalNameController, 'Legal name'),
                  _textField(_descriptionController, 'Description'),
                  _textField(_contactEmailController, 'Contact email'),
                  _textField(_contactPhoneController, 'Contact phone'),
                  _textField(_cityController, 'City'),
                  _textField(_addressController, 'Address'),
                ],
                const SizedBox(height: 8),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: isLoading ? null : _onRegister,
                    child: isLoading
                        ? const CircularProgressIndicator()
                        : const Text('Registrarme'),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
