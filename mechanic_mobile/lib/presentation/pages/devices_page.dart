import 'package:flutter/material.dart';
import 'package:mechanic_mobile/core/di/injection_container.dart';
import 'package:mechanic_mobile/domain/entities/device_token.dart';
import '../../domain/usecases/get_my_devices_usecase.dart';
import '../../domain/usecases/unregister_device_usecase.dart';

class DevicesPage extends StatefulWidget {
  const DevicesPage({super.key});

  @override
  State<DevicesPage> createState() => _DevicesPageState();
}

class _DevicesPageState extends State<DevicesPage> {
  late GetMyDevicesUseCase _getMyDevicesUseCase;
  late UnregisterDeviceUseCase _unregisterDeviceUseCase;
  List<DeviceToken> _devices = [];
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _getMyDevicesUseCase = sl<GetMyDevicesUseCase>();
    _unregisterDeviceUseCase = sl<UnregisterDeviceUseCase>();
    _loadDevices();
  }

  Future<void> _loadDevices() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      _devices = await _getMyDevicesUseCase.execute();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _unregisterDevice(String deviceId) async {
    try {
      await _unregisterDeviceUseCase.execute(deviceId);
      await _loadDevices();
      _showSnackBar('Dispositivo desvinculado exitosamente');
    } catch (e) {
      _showSnackBar('Error al desvincular: $e', isError: true);
    }
  }

  void _showSnackBar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red.shade700 : Colors.green.shade700,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mis Dispositivos'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
        elevation: 2,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage != null
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red.shade300,
                  ),
                  const SizedBox(height: 16),
                  Text(_errorMessage!),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _loadDevices,
                    child: const Text('Reintentar'),
                  ),
                ],
              ),
            )
          : _devices.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.close, size: 64, color: Colors.grey.shade400),
                  const SizedBox(height: 16),
                  Text(
                    'No hay dispositivos vinculados',
                    style: TextStyle(fontSize: 18, color: Colors.grey.shade600),
                  ),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: _devices.length,
              itemBuilder: (context, index) {
                final device = _devices[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: device.isActive
                          ? Colors.green.shade100
                          : Colors.red.shade100,
                      child: Text(
                        device.platformIcon,
                        style: const TextStyle(fontSize: 20),
                      ),
                    ),
                    title: Text(device.devicePlatform),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Rol: ${device.appRole}'),
                        Text('Estado: ${device.statusText}'),
                        Text('Último uso: ${_formatDate(device.lastSeenAt)}'),
                      ],
                    ),
                    trailing: device.isActive
                        ? IconButton(
                            icon: const Icon(
                              Icons.delete_outline,
                              color: Colors.red,
                            ),
                            onPressed: () => _unregisterDevice(device.id),
                            tooltip: 'Desvincular',
                          )
                        : null,
                    isThreeLine: true,
                  ),
                );
              },
            ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }
}
