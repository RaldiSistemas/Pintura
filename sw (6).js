const V='pintura-v1';
self.addEventListener('install',()=>{});
self.addEventListener('message',e=>{ if(e.data&&e.data.tipo==='ativar') self.skipWaiting(); });
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r).then(res=>{ const c=res.clone(); caches.open(V).then(x=>x.put(r,c)); return res; }).catch(()=>caches.match(r)));
});
