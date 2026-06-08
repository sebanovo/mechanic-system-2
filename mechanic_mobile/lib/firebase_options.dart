import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }

    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
      case TargetPlatform.windows:
      case TargetPlatform.linux:
      default:
        return android;
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyAiJtT0pDTgUmLa61eWyE-TCA4v9oHdN3s',
    appId: '1:249326114363:web:a949b8f9c786313831ae1e',
    messagingSenderId: '249326114363',
    projectId: 'mechanic-system-60380',
    authDomain: 'mechanic-system-60380.firebaseapp.com',
    storageBucket: 'mechanic-system-60380.firebasestorage.app',
    measurementId: 'G-707G8X95T4',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAnQhkGs2ZgBqM-RceSeGyQX7yS4N9ImDM',
    appId: '1:249326114363:android:ba37e3019c4bac3031ae1e',
    messagingSenderId: '249326114363',
    projectId: 'mechanic-system-60380',
    storageBucket: 'mechanic-system-60380.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAiJtT0pDTgUmLa61eWyE-TCA4v9oHdN3s',
    appId: '1:249326114363:web:a949b8f9c786313831ae1e',
    messagingSenderId: '249326114363',
    projectId: 'mechanic-system-60380',
    authDomain: 'mechanic-system-60380.firebaseapp.com',
    storageBucket: 'mechanic-system-60380.firebasestorage.app',
    measurementId: 'G-707G8X95T4',
  );
}
