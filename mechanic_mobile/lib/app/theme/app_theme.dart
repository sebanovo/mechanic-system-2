import 'package:flutter/material.dart';

class SapphirePalette {
  static const Color sapphire50 = Color(0xFFFFFDE7);
  static const Color sapphire100 = Color(0xFFFFF9C4);
  static const Color sapphire200 = Color(0xFFFFF59D);
  static const Color sapphire300 = Color(0xFFFFF176);
  static const Color sapphire400 = Color(0xFFFFEB3B);
  static const Color sapphire500 = Color(0xFFFFC107);
  static const Color sapphire600 = Color(0xFFFFB300);
  static const Color sapphire700 = Color(0xFFFFA000);
  static const Color sapphire800 = Color(0xFFFF8F00);
  static const Color sapphire900 = Color(0xFFFF6F00);
  static const Color sapphire950 = Color(0xFF111111);
}

class AppTheme {
  static ThemeData light() {
    const primary = SapphirePalette.sapphire500;
    const surface = Color(0xFFFFFBEB);
    const surfaceVariant = Color(0xFFFFF4CC);
    const outline = Color(0xFF2A2A2A);

    final colorScheme = ColorScheme.fromSeed(
      seedColor: primary,
      primary: primary,
      secondary: Colors.black,
      surface: surface,
      brightness: Brightness.light,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: surface,
      appBarTheme: const AppBarTheme(
        centerTitle: false,
        elevation: 0,
        scrolledUnderElevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
      ),
      cardTheme: CardThemeData(
        color: surfaceVariant,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: outline),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: Colors.white,
        indicatorColor: SapphirePalette.sapphire100,
        labelTextStyle: WidgetStateProperty.resolveWith(
          (states) =>
              const TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 16,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: outline),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: outline),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(
            color: Colors.black,
            width: 1.6,
          ),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          minimumSize: const Size.fromHeight(52),
          backgroundColor: SapphirePalette.sapphire500,
          foregroundColor: Colors.black,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size.fromHeight(52),
          foregroundColor: Colors.black,
          side: const BorderSide(color: outline),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
        ),
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          fontWeight: FontWeight.w800,
          letterSpacing: -0.4,
          color: Colors.black,
        ),
        titleLarge: TextStyle(
          fontWeight: FontWeight.w700,
          color: Colors.black,
        ),
        bodyLarge: TextStyle(color: Colors.black87, height: 1.35),
        bodyMedium: TextStyle(color: Colors.black87, height: 1.35),
      ),
    );
  }
}
