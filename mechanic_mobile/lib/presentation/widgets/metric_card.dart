import 'package:flutter/material.dart';

import '../../app/theme/app_theme.dart';

class MetricCard extends StatelessWidget {
  const MetricCard({
    super.key,
    required this.label,
    required this.value,
    required this.icon,
    this.accentColor = SapphirePalette.sapphire500,
    this.onTap,
  });

  final String label;
  final String value;
  final IconData icon;
  final Color accentColor;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          color: const Color(0xFFFFF8D6),
          border: Border.all(color: Colors.black, width: 1.2),
          boxShadow: const [
            BoxShadow(
              color: Color(0xFF111111),
              blurRadius: 0,
              offset: Offset(5, 5),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: accentColor,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.black, width: 1.2),
              ),
              child: Icon(icon, color: Colors.black),
            ),
            const SizedBox(height: 14),
            Text(
              value,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontSize: 28,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.black87,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}
