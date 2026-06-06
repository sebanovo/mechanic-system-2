import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/services/session_storage.dart';
import '../widgets/app_widgets.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final storage = context.watch<SessionStorage>();
    final formKey = GlobalKey<FormState>();
    var baseUrl = storage.apiBaseUrl;
    var token = storage.apiToken;

    return Scaffold(
      appBar: AppBar(title: const Text('Configuración')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
        children: [
          SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Conexión API', style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 12),
                Form(
                  key: formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        initialValue: storage.apiBaseUrl,
                        decoration: const InputDecoration(
                          labelText: 'API Base URL',
                          hintText: 'http://10.0.2.2:8000',
                        ),
                        onChanged: (value) => baseUrl = value,
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        initialValue: storage.apiToken,
                        decoration: const InputDecoration(labelText: 'Bearer token'),
                        maxLines: 3,
                        onChanged: (value) => token = value,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () async {
                    await storage.setApiBaseUrl(baseUrl);
                    await storage.setApiToken(token);
                    if (!context.mounted) return;
                    _toast(context, 'Configuración guardada');
                  },
                  child: const Text('Guardar'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          SurfaceCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Tema', style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 12),
                const Text(
                  'La app usa la paleta sapphire exportada del frontend con primario #166ae9.',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

void _toast(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
}
