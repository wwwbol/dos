/* 
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyCfQJkd0XrMLK7sVDHo-17SDbJg4fc2zuE",
    authDomain: "emausiglesiaelalto.firebaseapp.com",
    databaseURL: "https://emausiglesiaelalto.firebaseio.com",
    projectId: "emausiglesiaelalto",
    storageBucket: "emausiglesiaelalto.appspot.com",
    messagingSenderId: "950915271154",
    appId: "1:950915271154:web:91a6e37ecacb54f2"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Iglesia Cristiana Biblica Sola Escritura';
    const notificationOptions = {
      body: payload["data"]["txt"],
      icon: '/img/icono.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
*/
const CACHE_NAME = 'static-cache-v10';
const FILES_TO_CACHE = [
  '/',
  
  '/font/Splatch.ttf',
  '/video/video1.mp4',

];

self.addEventListener('install', (evt) => {
  evt.waitUntil( caches.open(CACHE_NAME).then((cache) => { return cache.addAll(FILES_TO_CACHE); })  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) { return caches.delete(key); }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {  return response || fetch(evt.request); });
    })
  );
});
