const CACHE_NAME = "video-cache";
const VIDEO_URLS = [
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/eatting.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/u.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/uno.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/wirdos.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/3idiot.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/ad.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/as.mp4",
  "https://dhkyzhpqoreeytuyeioj.supabase.co/storage/v1/object/public/ar-content/Batch2k25.mp4"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(VIDEO_URLS))
  );
});

self.addEventListener("fetch", (event) => {
  if (VIDEO_URLS.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});
