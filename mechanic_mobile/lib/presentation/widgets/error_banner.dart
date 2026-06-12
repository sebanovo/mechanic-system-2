import 'package:flutter/material.dart';

class ErrorBanner extends StatelessWidget {
  const ErrorBanner({super.key, required this.message});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF8D6),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.black, width: 1.2),
        boxShadow: const [
          BoxShadow(
            color: Color(0xFF111111),
            blurRadius: 0,
            offset: Offset(4, 4),
          ),
        ],
      ),
      child: Text(
        message,
        style: const TextStyle(color: Colors.black, fontWeight: FontWeight.w700),
      ),
    );
  }
}
