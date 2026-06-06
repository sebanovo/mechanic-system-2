importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.13.0/firebase-messaging-compat.js');

// ✅ Tu configuración de Firebase (misma que en index.html)
firebase.initializeApp({
  apiKey: "AIzaSyAiJtT0pDTgUmLa61eWyE-TCA4v9oHdN3s",
  authDomain: "mechanic-system-60380.firebaseapp.com",
  projectId: "mechanic-system-60380",
  storageBucket: "mechanic-system-60380.firebasestorage.app",
  messagingSenderId: "249326114363",
  appId: "1:249326114363:web:a949b8f9c786313831ae1e",
  measurementId: "G-707G8X95T4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensaje en segundo plano:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icons/Icon-192.png',
    badge: '/icons/Icon-192.png',
    data: payload.data || {},
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});