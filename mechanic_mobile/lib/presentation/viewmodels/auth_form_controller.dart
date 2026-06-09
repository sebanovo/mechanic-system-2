import 'package:flutter/material.dart';

import '../../constants/api_enums.dart';
import '../../domain/entities/auth_entities.dart';

class AuthFormController extends ChangeNotifier {
  AuthFormController({required this.role}) {
    tenantKind = switch (role) {
      AppEntryRole.client => TenantKind.workshop,
      AppEntryRole.workshop => TenantKind.workshop,
      AppEntryRole.mechanic => TenantKind.independentTechnician,
    };
  }

  final AppEntryRole role;
  late TenantKind tenantKind;

  final GlobalKey<FormState> loginKey = GlobalKey<FormState>();
  final GlobalKey<FormState> registerKey = GlobalKey<FormState>();

  final TextEditingController loginEmail = TextEditingController();
  final TextEditingController loginPassword = TextEditingController();
  final TextEditingController regEmail = TextEditingController();
  final TextEditingController regPassword = TextEditingController();
  final TextEditingController regFirstName = TextEditingController();
  final TextEditingController regLastName = TextEditingController();
  final TextEditingController regCommercialName = TextEditingController();

  void setTenantKind(TenantKind value) {
    tenantKind = value;
    notifyListeners();
  }

  @override
  void dispose() {
    loginEmail.dispose();
    loginPassword.dispose();
    regEmail.dispose();
    regPassword.dispose();
    regFirstName.dispose();
    regLastName.dispose();
    regCommercialName.dispose();
    super.dispose();
  }
}
