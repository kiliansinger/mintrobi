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
  "./ampel.png",
  "./babel.min.js",
  "./bottlemessage.png",
  "./empty.png",
  "./Inventory.png",
  "./Inventory_closed.png",
  "./Inventory_down.png",
  "./Inventory_open_bottom.png",
  "./Inventory_open_mid.png",
  "./Inventory_open_top.png",
  "./Inventory_up.png",
  "./kostuem.png",
  "./Look.png",
  "./map.png",
  "./multifarbe.png",
  "./pong.js",
  "./poti.png",
  "./s1.png",
  "./s10.jpg",
  "./s10.png",
  "./s1oma1.png",
  "./s1oma2.png",
  "./s2.png",
  "./s2krabbe1.png",
  "./s2krabbe2.png",
  "./s2opa1.png",
  "./s2opa2.png",
  "./s2tuer1.png",
  "./s2tuer2.png",
  "./s2vase.png",
  "./s3.png",
  "./s3frau1.png",
  "./s3frau2.png",
  "./s3junge1.png",
  "./s3junge2.png",
  "./s3kind1.png",
  "./s3kind2.png",
  "./s4.png",
  "./s4bar.png",
  "./s4barkeeper1.png",
  "./s4barkeeper2.png",
  "./s4seetang.png",
  "./s4torte1.png",
  "./s4torte1t..png",
  "./s4torte2.png",
  "./s4torte2t.png",
  "./s4torte3.png",
  "./s4torte3t.png",
  "./s4torte4.png",
  "./s4torte4t.png",
  "./s4torte5.png",
  "./s4torte5t.png",
  "./s4tortentyp1.png",
  "./s4tortentyp2.png",
  "./S4_5_Tortenplatte_zustand1_2_539.PNG",
  "./s5.png",
  "./s5artist1.png",
  "./s5artist2.png",
  "./s5seller1.png",
  "./s5seller2.png",
  "./s5tante1.png",
  "./s5tante2.png",
  "./s6.png",
  "./s7.png",
  "./s7forscher1.png",
  "./s7forscher2.png",
  "./s8.png",
  "./s8b.png",
  "./s8block.png",
  "./s8schild.png",
  "./s8torauf.png",
  "./s8torzu.png",
  "./s8wache1.png",
  "./s8wache2.png",
  "./s9.png",
  "./s9daiquiri1.png",
  "./s9daiquiri2.png",
  "./s9daiquiri3.png",
  "./s9mauer.png",
  "./s9mojito1.png",
  "./s9mojito2.png",
  "./s9pina1.png",
  "./s9pina2.png",
  "./Take.png",
  "./Talk.png",
  "./test.png",
  "./tortenheber.png",
  "./transparent.png",
  "./unpair.gif",
  "./Use.png",
  "./View.png",
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
