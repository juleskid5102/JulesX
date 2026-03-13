/* firebase-messaging-sw.js — Background push notification handler
   File PHẢI đặt ở public/ root để Service Worker scope = '/' */
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyD7JLaAz_p8TI08iPhnS8-rcf-XymYJgqY',
    authDomain: 'jules-studio.firebaseapp.com',
    projectId: 'jules-studio',
    storageBucket: 'jules-studio.firebasestorage.app',
    messagingSenderId: '136778675887',
    appId: '1:136778675887:web:717778dd152396cd59865a',
});

const messaging = firebase.messaging();

// Khi nhận push ở background
messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || 'Thông báo mới';
    self.registration.showNotification(title, {
        body: payload.notification?.body || '',
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        vibrate: [200, 100, 200],
        tag: 'julesstudio-' + Date.now(),
    });
});

// Click notification → focus hoặc mở tab
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            for (const client of list) {
                if ('focus' in client) return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});
