import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../domain/entities/auth_context_entity.dart';
import '../helpers/tenant_record_helpers.dart';
import '../utils/api_enum_labels.dart';
import '../viewmodels/tenant_viewmodel.dart';
import '../widgets/app_widgets.dart';

class TenantOwnerHero extends StatelessWidget {
  const TenantOwnerHero({
    super.key,
    required this.contextData,
    required this.tenant,
    required this.detail,
    required this.vm,
  });

  final AuthContextEntity? contextData;
  final Map<String, dynamic> tenant;
  final Map<String, dynamic> detail;
  final TenantViewModel vm;

  @override
  Widget build(BuildContext context) {
    final current = detail['tenant'] is Map
        ? Map<String, dynamic>.from(detail['tenant'])
        : tenant;

    return SurfaceCard(
      padding: const EdgeInsets.all(0),
      child: Container(
        decoration: const BoxDecoration(
          color: Color(0xFFFFC107),
          borderRadius: BorderRadius.all(Radius.circular(28)),
          border: Border.fromBorderSide(
            BorderSide(color: Colors.black, width: 1.2),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                contextData?.user.fullName ?? 'Propietario de taller',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w900,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                tenant.isEmpty
                    ? 'Sin tenant actual seleccionado'
                    : tenant['commercial_name']?.toString() ?? 'Sin nombre',
                style: Theme.of(
                  context,
                ).textTheme.bodyLarge?.copyWith(color: Colors.black87),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: [
                  _heroChip(
                    context,
                    tenantUserTypeLabelFromApi(contextData?.userType),
                    Icons.verified_user_rounded,
                  ),
                  _heroChip(
                    context,
                    tenantKindLabelFromApi(current['tenant_kind']?.toString()),
                    Icons.apartment_rounded,
                  ),
                  _heroChip(
                    context,
                    tenantRecordStatusLabel(current),
                    Icons.bolt_rounded,
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Row(
                children: [
                  Expanded(
                    child: _heroAction(
                      context,
                      label: 'Recargar',
                      icon: Icons.refresh_rounded,
                      onTap: () => vm.refresh(),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _heroAction(
                      context,
                      label: 'Sesiones',
                      icon: Icons.devices_other_rounded,
                      onTap: () => context.push('/tenant-sessions'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Widget _heroChip(BuildContext context, String label, IconData icon) {
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
    decoration: BoxDecoration(
      color: Colors.black,
      borderRadius: BorderRadius.circular(999),
      border: Border.all(color: Colors.black, width: 1),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: Colors.white, size: 18),
        const SizedBox(width: 8),
        Flexible(
          child: Text(
            label,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w800,
            ),
          ),
        ),
      ],
    ),
  );
}

Widget _heroAction(
  BuildContext context, {
  required String label,
  required IconData icon,
  required VoidCallback onTap,
}) {
  return Material(
    color: const Color(0xFFFFF8D6),
    borderRadius: BorderRadius.circular(18),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: Colors.black, size: 20),
            const SizedBox(width: 8),
            Flexible(
              child: Text(
                label,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
