import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class MapPage extends StatelessWidget {
  const MapPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mapa de prueba'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
      ),
      body: FlutterMap(
        options: MapOptions(
          initialCenter: LatLng(-17.7833, -63.1821), // Santa Cruz de la Sierra
          initialZoom: 15,
          minZoom: 12,
          maxZoom: 18,
        ),
        children: [
          TileLayer(
            urlTemplate:
                'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=Wz3sO6ej1k66cNR8Lzcr',
            userAgentPackageName: 'com.example.mechanic_mobile',
          ),
        ],
      ),
    );
  }
}
