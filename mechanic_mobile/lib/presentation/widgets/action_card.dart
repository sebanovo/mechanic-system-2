import 'package:flutter/material.dart';

import '../../app/theme/app_theme.dart';

class ActionCard extends StatelessWidget {
  const ActionCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFFFF8D6),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.black, width: 1.2),
          boxShadow: const [
            BoxShadow(
              color: Color(0xFF111111),
              blurRadius: 0,
              offset: Offset(5, 5),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: SapphirePalette.sapphire500,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: Colors.black, width: 1.2),
              ),
              child: Icon(icon, color: Colors.black),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: Colors.black,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.black87,
                        ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right_rounded, color: Colors.black),
          ],
        ),
      ),
    );
  }
}
