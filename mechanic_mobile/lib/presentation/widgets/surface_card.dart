import 'package:flutter/material.dart';

class SurfaceCard extends StatelessWidget {
  const SurfaceCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(18),
  });

  final Widget child;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: padding,
      decoration: BoxDecoration(
        color: const Color(0xFFFFF8D6),
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.black, width: 1.2),
        boxShadow: const [
          BoxShadow(
            color: Color(0xFF111111),
            blurRadius: 0,
            offset: Offset(5, 5),
          ),
        ],
      ),
      child: child,
    );
  }
}
