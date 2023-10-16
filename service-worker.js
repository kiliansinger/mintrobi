//might be interesting https://whatwebcando.today/articles/handling-service-worker-updates/
//press in chrome CTRL+SHIFT+R to do a hard refresh ignoring the cache
//use tailwind instead of bulma
//https://www.youtube.com/watch?v=P6gEnVlJPOc
//does not work: npx svelte-add tailwindcss
//
//this should simplify changing the data-cache... https://blog.lutterloh.dev/2020/08/08/service-worker-pwa-workbox-rollup.html

url = self.location.href;
urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);
hostname = urlParts[1]; // www.example.com

//https://stackoverflow.com/questions/64245188/how-to-differentiate-between-svelte-dev-mode-and-build-mode
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./service-worker.js",
  "./manifest.json",
  "./favicon.png",
  "./images/icons/icon-32x32.png",
  "./images/icons/icon-128x128.png",
  "./images/icons/icon-144x144.png",
  "./images/icons/icon-192x192.png",
  "./images/icons/icon-256x256.png",
  "./images/icons/icon-512x512.png",
  "./images/icons/maskable_icon.png",
  "./images/ampel.png",
  "./images/babel.min.js",
  "./images/images/bottlemessage.png",
  "./images/empty.png",
  "./images/kostuem.png",
  "./images/map.png",
  "./images/multifarbe.png",
  "./images/pong.js",
  "./images/poti.png",
  "./images/s1.png",
  "./images/s10.jpg",
  "./images/s10.png",
  "./images/s1oma1.png",
  "./images/s1oma2.png",
  "./images/s2.png",
  "./images/s2krabbe1.png",
  "./images/s2krabbe2.png",
  "./images/s2opa1.png",
  "./images/s2opa2.png",
  "./images/s2tuer1.png",
  "./images/s2tuer2.png",
  "./images/s2vase.png",
  "./images/s3.png",
  "./images/s3frau1.png",
  "./images/s3frau2.png",
  "./images/s3junge1.png",
  "./images/s3junge2.png",
  "./images/s3kind1.png",
  "./images/s3kind2.png",
  "./images/s4.png",
  "./images/s4bar.png",
  "./images/s4barkeeper1.png",
  "./images/s4barkeeper2.png",
  "./images/s4seetang.png",
  "./images/s4torte1.png",
  "./images/s4torte1t..png",
  "./images/s4torte2.png",
  "./images/s4torte2t.png",
  "./images/s4torte3.png",
  "./images/s4torte3t.png",
  "./images/s4torte4.png",
  "./images/s4torte4t.png",
  "./images/s4torte5.png",
  "./images/s4torte5t.png",
  "./images/s4tortentyp1.png",
  "./images/s4tortentyp2.png",
  "./images/S4_5_Tortenplatte_zustand1_2_539.PNG",
  "./images/s5.png",
  "./images/s5artist1.png",
  "./images/s5artist2.png",
  "./images/s5seller1.png",
  "./images/s5seller2.png",
  "./images/s5tante1.png",
  "./images/s5tante2.png",
  "./images/s6.png",
  "./images/s7.png",
  "./images/s7forscher1.png",
  "./images/s7forscher2.png",
  "./images/s8.png",
  "./images/s8b.png",
  "./images/s8block.png",
  "./images/s8schild.png",
  "./images/s8torauf.png",
  "./images/s8torzu.png",
  "./images/s8wache1.png",
  "./images/s8wache2.png",
  "./images/s9.png",
  "./images/s9daiquiri1.png",
  "./images/s9daiquiri2.png",
  "./images/s9daiquiri3.png",
  "./images/s9mauer.png",
  "./images/s9mojito1.png",
  "./images/s9mojito2.png",
  "./images/s9pina1.png",
  "./images/s9pina2.png",
  "./images/test.png",
  "./images/tortenheber.png",
  "./images/transparent.png",
  "./images/unpair.gif",
];

const CACHE_NAME = "3";
const DATA_CACHE_NAME = "3";


// install
self.addEventListener("install", function (evt) {
evt.waitUntil(
  caches
    .open(CACHE_NAME)
    .then((cache) => {
      console.log("Your files were pre-cached successfully!");
      cache
        .addAll(FILES_TO_CACHE)
        .then((result) => {
          // debugger;
          console.log("result of add all", result);
        })
        .catch((err) => {
          // debugger;
          console.log("Add all error: ", err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
);

self.skipWaiting();
});

// activate
self.addEventListener("activate", function (evt) {
evt.waitUntil(
  caches.keys().then((keyList) => {
    return Promise.all(
      keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME || hostname.startsWith("localhost")) {
          console.log("Removing old cache data", key);
          return caches.delete(key);
        }
      })
    );
  })
);

self.clients.claim();
});

// fetch
self.addEventListener("fetch", function (evt) {
if (evt.request.url.includes("/api/")) {
  evt.respondWith(
    caches
      .open(DATA_CACHE_NAME)
      .then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch((err) => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      })
      .catch((err) => console.log(err))
  );

  return;
}

evt.respondWith(
  caches.open(CACHE_NAME).then((cache) => {
    return cache.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    });
  })
);
});
