// 创建 Service Worker 实现离线缓存
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('quiz-cache-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/js/quiz.js',
                '/js/questions.js'
            ]);
        })
    );
}); 