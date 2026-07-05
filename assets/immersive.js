/* SUPERIOR PDR — 首頁沉浸式效果（游標跟隨光暈 + 卡片 hover 光掃 + 分隔線）
   自成一體：注入 CSS + lamp 元素 + 事件，供教學等子頁載入。 */
(function(){
  if(document.getElementById('immersive-fx')) return;

  var css = ''
    + '#lamp{position:fixed;left:0;top:0;width:600px;height:600px;border-radius:50%;z-index:3;pointer-events:none;'
    +   'transform:translate3d(-50%,-50%,0);opacity:0;transition:opacity .5s ease;will-change:transform,opacity;'
    +   'mix-blend-mode:screen;'
    +   'background:radial-gradient(circle,rgba(255,64,84,.16) 0%,rgba(120,150,220,.06) 34%,transparent 68%)}'
    + '@media(hover:none){#lamp{display:none}}'
    + '@media(prefers-reduced-motion:reduce){#lamp{display:none}}'
    + '.fx-shine,[class*="-card"]:not([class*="-label"]){position:relative;isolation:isolate;overflow:hidden}'
    + '.fx-shine::after,[class*="-card"]:not([class*="-label"])::after{'
    +   'content:"";position:absolute;top:0;left:-80%;width:55%;height:100%;z-index:6;pointer-events:none;'
    +   'background:linear-gradient(105deg,transparent,rgba(255,255,255,.14) 45%,rgba(255,64,84,.15) 60%,transparent);'
    +   'transform:skew(-16deg);opacity:0}'
    + '.fx-shine:hover::after,[class*="-card"]:not([class*="-label"]):hover::after{'
    +   'animation:shinePass .85s cubic-bezier(.5,0,.4,1)}'
    + '@keyframes shinePass{0%{opacity:0;left:-80%}10%{opacity:1}90%{opacity:1}to{opacity:0;left:135%}}'
    + '.fx-divider{height:1px;border:0;max-width:1200px;margin:0 auto;'
    +   'background:linear-gradient(90deg,transparent,rgba(255,42,61,.28),rgba(120,150,220,.18),transparent)}';

  var st = document.createElement('style');
  st.id = 'immersive-fx';
  st.textContent = css;
  document.head.appendChild(st);

  var lamp = document.createElement('div');
  lamp.id = 'lamp';
  lamp.setAttribute('aria-hidden','true');
  document.body.appendChild(lamp);

  if(matchMedia('(hover:none)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var x=0,y=0,tx=0,ty=0,shown=false,raf=0;
  function loop(){ x+=(tx-x)*0.18; y+=(ty-y)*0.18;
    lamp.style.transform='translate3d('+x+'px,'+y+'px,0) translate(-50%,-50%)';
    if(Math.abs(tx-x)>0.5||Math.abs(ty-y)>0.5){raf=requestAnimationFrame(loop);}else{raf=0;} }
  window.addEventListener('mousemove',function(e){ tx=e.clientX; ty=e.clientY;
    if(!shown){shown=true;lamp.style.opacity='1';}
    if(!raf)raf=requestAnimationFrame(loop); },{passive:true});
  document.addEventListener('mouseleave',function(){shown=false;lamp.style.opacity='0';});
})();
