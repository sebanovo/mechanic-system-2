import 'package:flutter/material.dart';

class SapphirePalette {
  static const Color sapphire50 = Color(0xFFE8F0FD);
  static const Color sapphire100 = Color(0xFFD0E1FB);
  static const Color sapphire200 = Color(0xFFA2C4F6);
  static const Color sapphire300 = Color(0xFF73A6F2);
  static const Color sapphire400 = Color(0xFF4488EE);
  static const Color sapphire500 = Color(0xFF166AE9);
  static const Color sapphire600 = Color(0xFF1155BB);
  static const Color sapphire700 = Color(0xFF0D408C);
  static const Color sapphire800 = Color(0xFF092B5D);
  static const Color sapphire900 = Color(0xFF04152F);
  static const Color sapphire950 = Color(0xFF030F21);
}

class AppTheme {
  static ThemeData light() {
    const primary = SapphirePalette.sapphire500;
    const surface = Color(0xFFF6F9FF);

    final colorScheme = ColorScheme.fromSeed(
      seedColor: primary,
      primary: primary,
      secondary: SapphirePalette.sapphire700,
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
        foregroundColor: SapphirePalette.sapphire950,
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: Color(0xFFE4ECFB)),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: Colors.white,
        indicatorColor: SapphirePalette.sapphire50,
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
          borderSide: const BorderSide(color: Color(0xFFD8E3F7)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: Color(0xFFD8E3F7)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(
            color: SapphirePalette.sapphire500,
            width: 1.6,
          ),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          minimumSize: const Size.fromHeight(52),
          backgroundColor: SapphirePalette.sapphire500,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size.fromHeight(52),
          foregroundColor: SapphirePalette.sapphire700,
          side: const BorderSide(color: Color(0xFFB9CDEF)),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
        ),
      ),
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          fontWeight: FontWeight.w800,
          letterSpacing: -0.4,
          color: SapphirePalette.sapphire950,
        ),
        titleLarge: TextStyle(
          fontWeight: FontWeight.w700,
          color: SapphirePalette.sapphire950,
        ),
        bodyLarge: TextStyle(color: SapphirePalette.sapphire900, height: 1.35),
        bodyMedium: TextStyle(color: SapphirePalette.sapphire800, height: 1.35),
      ),
    );
  }
}
