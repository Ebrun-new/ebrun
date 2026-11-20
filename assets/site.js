(()=>{const body=document.body;const panel=document.querySelector('#access-panel');const access=document.querySelector('[data-access]');const reading=document.querySelector('[data-reading]');const images=document.querySelector('[data-images]');let prefs={reading:false,images:false};try{prefs={...prefs,...JSON.parse(localStorage.getItem('brun-display')||'{}')}}catch{}function apply(){body.classList.toggle('reading-mode',prefs.reading);body.classList.toggle('hide-images',prefs.images);reading.setAttribute('aria-pressed',String(prefs.reading));images.setAttribute('aria-pressed',String(prefs.images));try{localStorage.setItem('brun-display',JSON.stringify(prefs))}catch{}}function close(){panel.hidden=true;access.setAttribute('aria-expanded','false')}apply();access.addEventListener('click',()=>{panel.hidden=!panel.hidden;access.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)reading.focus()});reading.addEventListener('click',()=>{prefs.reading=!prefs.reading;apply()});images.addEventListener('click',()=>{prefs.images=!prefs.images;apply()});document.querySelector('[data-reset]').addEventListener('click',()=>{prefs={reading:false,images:false};apply()});document.querySelector('[data-access-close]').addEventListener('click',()=>{close();access.focus()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();access.focus()}});const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=document.querySelector('.header').classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');menu.textContent=open?'×':'☰'});document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.header').classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());const search=document.querySelector('#document-search');if(search){const area=search.closest('.education-content');const items=[...area.querySelectorAll('p')].filter(p=>p.querySelector('a[href*="disk.yandex.ru"]'));items.forEach(p=>p.classList.add('doc-item'));function filter(){const value=search.value.trim().toLocaleLowerCase('ru');let count=0;items.forEach(p=>{p.hidden=!p.textContent.toLocaleLowerCase('ru').includes(value);if(!p.hidden)count++});document.querySelector('#document-count').textContent=value?`Найдено: ${count} из ${items.length}`:`Документов и ссылок: ${items.length}`}search.addEventListener('input',filter);filter()}})();
(()=>{const select=document.querySelector('#case-category');if(!select)return;const cards=[...document.querySelectorAll('.catalog-card')];const status=document.querySelector('#case-count');const empty=document.querySelector('.catalog-empty');try{const v=new URLSearchParams(location.search).get('niche');if([...select.options].some(o=>o.value===v))select.value=v}catch{}function filter(updateUrl=false){let n=0;for(const card of cards){card.hidden=!!select.value&&!card.dataset.categories.split('|').includes(select.value);if(!card.hidden)n++}status.textContent=`Показано ${n} из ${cards.length}`;empty.hidden=n!==0;if(updateUrl){try{const u=new URL(location.href);if(select.value)u.searchParams.set('niche',select.value);else u.searchParams.delete('niche');history.replaceState(null,'',u)}catch{}}}select.addEventListener('change',()=>filter(true));document.querySelector('[data-reset-cases]')?.addEventListener('click',()=>{select.value='';filter(true);select.focus()});filter()})();
(()=>{const dialog=document.querySelector('#contact-dialog');if(!dialog)return;let opener=null;document.querySelectorAll('[data-contact-open]').forEach(b=>b.addEventListener('click',()=>{opener=b;dialog.showModal()}));dialog.querySelector('[data-contact-close]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>opener?.focus())})();
(()=>{
/* Согласие на cookie и Яндекс Метрику (20.11.2026). Метрика загружается только после «Принять».
   Номер счётчика вписать в METRIKA_ID (пока счётчика нет — ничего не загружается).
   Выбор хранится в cookie brun_cookie_consent = v2:accepted | v2:declined на год; «Настройки cookie» в подвале открывают окно снова. */
const METRIKA_ID=114385375;
const NAME='brun_cookie_consent',VERSION='v2';
const read=()=>{try{const c=document.cookie.split('; ').find(x=>x.startsWith(NAME+'='));const v=c?decodeURIComponent(c.split('=')[1]):localStorage.getItem(NAME);return v&&v.startsWith(VERSION+':')?v.slice(VERSION.length+1):null}catch{return null}};
const save=v=>{const val=VERSION+':'+v;try{document.cookie=NAME+'='+encodeURIComponent(val)+'; max-age=31536000; path=/; SameSite=Lax'}catch{}try{localStorage.setItem(NAME,val)}catch{}};
let metrikaOn=false;
function loadMetrika(){if(!METRIKA_ID||metrikaOn)return;metrikaOn=true;(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');window.ym(METRIKA_ID,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false})}
function clearMetrika(){document.cookie.split('; ').map(c=>c.split('=')[0]).filter(n=>/^_ym/.test(n)).forEach(n=>{[location.hostname,'.'+location.hostname.replace(/^www\./,''),''].forEach(d=>{document.cookie=n+'=; max-age=0; path=/'+(d?'; domain='+d:'')})});try{Object.keys(localStorage).filter(k=>/^_ym/.test(k)).forEach(k=>localStorage.removeItem(k))}catch{}}
const doc=k=>document.querySelector(`.footer-links [data-doc="${k}"]`)?.getAttribute('href')||(k==='privacy'?'/privacy/':'/soglasie/');
let box=null;
function close(){if(box){box.remove();box=null}}
function show(){if(box)return;box=document.createElement('div');box.className='cookie-banner';box.setAttribute('role','region');box.setAttribute('aria-label','Согласие на использование cookie');
box.innerHTML='<p class="cookie-title">Это не воронка продаж. Просто cookie</p><p>Маркетолог без них — как запуск без аналитики. С вашего разрешения сайт включит cookie и Яндекс Метрику, чтобы я видела, что здесь читают и какая реклама работает.</p><p>Нажимая «Принять», вы даёте <a href="'+doc('consent')+'">согласие</a> на обработку персональных данных по <a href="'+doc('privacy')+'">Политике</a>. Без него Метрика не включится.</p><div class="cookie-actions"><button class="button button--accent" type="button" data-cookie-accept>Принять</button><button class="button cookie-decline" type="button" data-cookie-decline>Отказаться</button></div>';
box.querySelector('[data-cookie-accept]').addEventListener('click',()=>{save('accepted');close();loadMetrika()});
box.querySelector('[data-cookie-decline]').addEventListener('click',()=>{const was=metrikaOn;save('declined');clearMetrika();close();if(was)location.reload()});
document.body.appendChild(box)}
document.querySelectorAll('[data-cookie-settings]').forEach(b=>b.addEventListener('click',()=>{close();show();box.querySelector('[data-cookie-accept]').focus()}));
const choice=read();if(choice==='accepted')loadMetrika();else if(choice!=='declined')show();
})();
(()=>{const box=document.querySelector('[data-formats]');if(!box)return;box.querySelectorAll('.format').forEach(f=>{const b=f.querySelector('.format-toggle');const more=f.querySelector('.format-more');const set=open=>{f.classList.toggle('is-open',open);b.setAttribute('aria-expanded',String(open));b.querySelector('.format-toggle-label').textContent=open?'Свернуть':'Подробнее';b.querySelector('.format-toggle-sign').textContent=open?'−':'+';if('inert' in more)more.inert=!open};set(false);b.addEventListener('click',()=>set(b.getAttribute('aria-expanded')!=='true'))});box.classList.add('formats-ready')})();
(()=>{
/* Анимация схемы автоворонки: один проход ~10,5 с при появлении схемы на экране. Тексты всё время видны; при «уменьшении движения» схема статична. */
const fig=document.querySelector('[data-funnel]');
if(!fig||!('IntersectionObserver' in window)||!window.requestAnimationFrame||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const svg=fig.querySelector('.fl-desktop'),mob=fig.querySelector('.fl-mobile');
const desk=()=>getComputedStyle(svg).display!=='none';
const root=()=>desk()?svg:mob;
const step=n=>root().querySelector(`[data-fl="${n}"]`);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
const NS='http://www.w3.org/2000/svg';
let dots=[];
function makeDots(){dots.forEach(d=>d.remove());dots=[];for(let i=0;i<2;i++){let d;if(desk()){d=document.createElementNS(NS,'g');d.setAttribute('class','fl-dot');d.innerHTML='<circle class="fl-dot-halo" r="8"/><circle class="fl-dot-core" r="3.5"/>';svg.appendChild(d)}else{d=document.createElement('span');d.className='fl-dot-m';d.setAttribute('aria-hidden','true');mob.appendChild(d)}dots.push(d)}}
function place(d,x,y){if(d instanceof SVGElement)d.setAttribute('transform',`translate(${x} ${y})`);else d.style.transform=`translate(${x}px,${y}px)`}
/* Маршруты на телефоне считаются по положению плашек */
function box(n){const r=step(n).getBoundingClientRect(),o=mob.getBoundingClientRect();return{l:r.left-o.left,r:r.right-o.left,t:r.top-o.top,b:r.bottom-o.top,cx:(r.left+r.right)/2-o.left,cy:(r.top+r.bottom)/2-o.top}}
function mobileRoute(name){const v=(a,b)=>{const A=box(a),B=box(b);return[[A.cx,A.b],[B.cx,B.t]]};
 const sp=mob.querySelector('.fl-split').getBoundingClientRect(),o=mob.getBoundingClientRect(),sy=sp.top-o.top+12;
 switch(name){case'r1a':return v('s1','s2');case'r1b':return v('s2','s3');case'r1c':return v('s3','s4');
 case'to-buy':case'to-wait':{const A=box('s4'),B=box(name==='to-buy'?'buy':'wait');return[[A.cx,A.b],[A.cx,sy],[B.cx,sy],[B.cx,B.t]]}
 case'r2a':return v('buy','learn');case'r2b':return v('learn','repeat');case'r3a':return v('wait','stay');case'r3b':return v('stay','back');
 case'return':{const A=box('back'),B=box('buy'),gx=(B.r+A.l)/2;return[[A.l,A.cy],[gx,A.cy],[gx,B.cy],[B.r,B.cy]]}}}
function track(name){if(desk()){const p=svg.querySelector(`[data-fl-path="${name}"]`),L=p.getTotalLength();return e=>{const q=p.getPointAtLength(e*L);return[q.x,q.y]}}
 const pts=mobileRoute(name),seg=[];let L=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);L+=d}
 return e=>{let s=e*L;for(let i=0;i<seg.length;i++){if(s<=seg[i]||i===seg.length-1){const k=seg[i]?Math.min(1,s/seg[i]):1;return[pts[i][0]+(pts[i+1][0]-pts[i][0])*k,pts[i][1]+(pts[i+1][1]-pts[i][1])*k]}s-=seg[i]}}}
function line(name,on){const el=desk()?svg.querySelector(`[data-fl-path="${name}"]`):(name==='return'?mob.querySelector('.fl-return'):null);if(el)el.classList.toggle('is-active',on);if(desk()&&name==='to-wait')line('wait-feed',on)}
function move(names,dur){const ts=names.map(track);names.forEach(n=>line(n,true));ts.forEach((t,i)=>{const[x,y]=t(0);place(dots[i],x,y);dots[i].classList.add('is-on')});
 return new Promise(res=>{const t0=performance.now();const frame=now=>{const p=Math.min(1,(now-t0)/dur),e=ease(p);ts.forEach((t,i)=>{const[x,y]=t(e);place(dots[i],x,y)});if(p<1)requestAnimationFrame(frame);else{ts.forEach((t,i)=>dots[i].classList.remove('is-on'));names.forEach(n=>line(n,false));res()}};requestAnimationFrame(frame)})}
const on=(...n)=>n.forEach(x=>step(x).classList.add('is-active'));
const off=(...n)=>n.forEach(x=>step(x).classList.remove('is-active'));
const reach=(...n)=>n.forEach(x=>step(x).classList.add('is-reached'));
async function play(){
 fig.classList.add('is-anim');makeDots();
 on('s1');await sleep(600);
 for(const[a,b,p]of[['s1','s2','r1a'],['s2','s3','r1b'],['s3','s4','r1c']]){await move([p],850);off(a);on(b);await sleep(300)}
 await move(['to-buy','to-wait'],1500);off('s4');reach('buy');on('buy','wait');await sleep(450);
 await move(['r2a','r3a'],850);off('buy','wait');on('learn','stay');await sleep(300);
 await move(['r2b','r3b'],850);off('learn','stay');reach('repeat');on('repeat','back');await sleep(600);
 off('repeat');await move(['return'],1400);off('back');on('buy');await sleep(600);
 off('buy');fig.querySelectorAll('[data-fl]').forEach(e=>e.classList.add('is-reached'));fig.classList.remove('is-anim');dots.forEach(d=>d.remove());dots=[]}
const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();play()}},{threshold:.5});
io.observe(svg);io.observe(mob);
})();
