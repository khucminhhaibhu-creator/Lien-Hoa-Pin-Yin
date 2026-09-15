const CACHE='lien-hoa-pinyin-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./pinyin-keyboard.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('lien-hoa-pinyin-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(new Request(e.request.url,{cache:'no-store'})).then(async r=>{
   const text=await r.clone().text();
   const html=text.includes('pinyin-keyboard.js')?text:text.replace('</body>','<script src="./pinyin-keyboard.js?v=3"></script></body>');
   const out=new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
   return out;
  }).catch(()=>caches.match('./index.html')));
  return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res})));
});
