function cacheVersion(){
    return 'v2020/06/02-1';
}


// キャッシュファイルの指定
// オフライン利用可
var CACHE_NAME = cacheVersion();
var urlsToCache = [
    //'index.html'
    'index.html'
];


// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});

