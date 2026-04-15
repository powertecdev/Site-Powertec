function powertecROI() {
  var fat   = parseInt((document.getElementById('cFat').value   || '').replace(/[^0-9]/g, '')) || 0;
  var func  = parseInt((document.getElementById('cFunc').value  || '').replace(/[^0-9]/g, '')) || 0;
  var horas = parseInt((document.getElementById('cHoras').value || '').replace(/[^0-9]/g, '')) || 0;
  var furto = parseInt((document.getElementById('cFurto').value || '').replace(/[^0-9]/g, '')) || 0;

  if (fat <= 0) {
    alert('Informe o faturamento mensal');
    document.getElementById('cFat').focus();
    return;
  }

  var eco   = Math.round(fat * 0.04 + func * 150 * 0.12);
  var err   = Math.round(furto > 0 ? furto * 0.72 : fat * 0.018);
  var hMes  = horas > 0 ? Math.round(horas * 4.3 * 0.6) : 8;
  var total = eco + err;
  var pb    = total > 0 ? Math.round(149 / total * 10) / 10 : 0;

  function brl(v) { return 'R$ ' + v.toLocaleString('pt-BR'); }

  document.getElementById('cEco').textContent   = brl(eco);
  document.getElementById('cErr').textContent   = brl(err);
  document.getElementById('cTempo').textContent = hMes + 'h';
  document.getElementById('cTotal').textContent = brl(total);
  document.getElementById('cPayback').textContent = pb > 0 && pb <= 6 ? 'Payback em ' + pb + ' mes(es)' : 'ROI positivo no 1o mes';

  var max = Math.max(eco, err, hMes * 20, 1);
  setTimeout(function() {
    document.getElementById('cEcoB').style.width   = Math.min(eco / max * 92, 92) + '%';
    document.getElementById('cErrB').style.width   = Math.min(err / max * 92, 92) + '%';
    document.getElementById('cTempoB').style.width = Math.min(hMes * 20 / max * 92, 92) + '%';
  }, 60);

  var msg = 'Calculei meu ROI no site PowerTec! Faturamento: R$ ' + fat.toLocaleString('pt-BR') + '/mes. Economia estimada: R$ ' + total.toLocaleString('pt-BR') + '/mes. Quero saber mais!';
  document.getElementById('cWpp').href = 'https://wa.me/5513981916256?text=' + encodeURIComponent(msg);

  document.getElementById('cPh').style.display  = 'none';
  document.getElementById('cData').style.display = 'flex';
  document.getElementById('cData').style.flexDirection = 'column';
  document.getElementById('cData').style.gap = '18px';
}

function powertecROIReset() {
  ['cFat','cFunc','cHoras','cFurto'].forEach(function(id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('cPh').style.display  = 'flex';
  document.getElementById('cData').style.display = 'none';
  ['cEcoB','cErrB','cTempoB'].forEach(function(id) {
    document.getElementById(id).style.width = '0';
  });
}

/* ════════════════════════════════ */


/* CURSOR */
(function(){
  var dot  = document.getElementById('cur');
  var ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  var mx = 0, my = 0;
  var rx = 0, ry = 0;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // ring follows with smooth lag
  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // hover state via class on body
  var hoverTargets = 'a, button, [role="button"], label, select, .sol-tab, .svc-card, .marca, .plan-card, .chip-btn, .nav-cta, .btn-main, .btn-ghost, .wpp-btn, .si-cta';
  document.querySelectorAll(hoverTargets).forEach(function(el) {
    el.addEventListener('mouseenter', function() { document.body.classList.add('cur-hover'); });
    el.addEventListener('mouseleave', function() { document.body.classList.remove('cur-hover'); });
  });

  // click burst
  document.addEventListener('mousedown', function() { document.body.classList.add('cur-click'); });
  document.addEventListener('mouseup',   function() { document.body.classList.remove('cur-click'); });

  // hide when leaving window
  document.addEventListener('mouseleave', function() { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', function() { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

var mx = 0, my = 0;

/* PARTICLES */
const pcv=document.getElementById('pcv'),pctx=pcv.getContext('2d');
let PW,PH,pts=[];
function rsz(){PW=pcv.width=window.innerWidth;PH=pcv.height=window.innerHeight;}
rsz();window.addEventListener('resize',rsz);
class Pt{constructor(){this.reset();}reset(){this.x=Math.random()*PW;this.y=Math.random()*PH;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.r=Math.random()*1.8+.4;this.o=Math.random()*.45+.15;const r=Math.random();this.c=r<.5?'255,68,0':r<.78?'0,204,255':'0,255,136';}
update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0)this.x=PW;if(this.x>PW)this.x=0;if(this.y<0)this.y=PH;if(this.y>PH)this.y=0;}
draw(){pctx.beginPath();pctx.arc(this.x,this.y,this.r,0,Math.PI*2);pctx.fillStyle=`rgba(${this.c},${this.o})`;pctx.fill();}}
for(let i=0;i<75;i++)pts.push(new Pt());
(function animP(){pctx.clearRect(0,0,PW,PH);
  for(let i=0;i<pts.length;i++){pts[i].update();pts[i].draw();
    for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<115){pctx.beginPath();pctx.moveTo(pts[i].x,pts[i].y);pctx.lineTo(pts[j].x,pts[j].y);
        pctx.strokeStyle=`rgba(0,204,255,${.12*(1-d/115)})`;pctx.lineWidth=.55;pctx.stroke();}}}
  requestAnimationFrame(animP);})();

/* REVEAL */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');}),{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

/* STAT BARS REVEAL */
const so=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){
  e.target.classList.add('on');
  const el=e.target.querySelector('.stat-n');
  if(el&&!el.dataset.done){el.dataset.done='1';
    const t=parseInt(el.dataset.to),s=el.dataset.suf||'';let v=0;
    const step=t/(800/16);const ti=setInterval(()=>{v=Math.min(v+step,t);el.textContent=Math.floor(v)+s;if(v>=t)clearInterval(ti);},16);}
}});},{threshold:.4});
document.querySelectorAll('.stat-b').forEach(el=>so.observe(el));

/* SDEV STATUS CARDS REVEAL */
const sdevObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.sdev-status').forEach(c=>c.classList.add('on'));}});},{threshold:.1});
const sdevGrid=document.querySelector('.sdev-status-grid');if(sdevGrid)sdevObs.observe(sdevGrid.parentElement||sdevGrid);

/* COUNT UP */
function cUp(id,target,pre,suf,dur){
  const el=document.getElementById(id);if(!el)return;
  let v=0;const step=target/(dur/16);
  const t=setInterval(()=>{v=Math.min(v+step,target);el.textContent=pre+Math.floor(v).toLocaleString('pt-BR')+suf;if(v>=target)clearInterval(t);},16);
}

/* CAM SCENE GENERATOR */
function drawCam(cv,seed,night){
  if(!cv)return;
  const p=cv.parentElement;cv.width=p.offsetWidth||300;cv.height=p.offsetHeight||150;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  ctx.fillStyle=night?'#020507':'#060a0f';ctx.fillRect(0,0,W,H);
  // grid
  ctx.strokeStyle='rgba(0,204,255,.05)';ctx.lineWidth=.5;
  for(let x=0;x<W;x+=16){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=16){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  // horizon
  const fg=ctx.createLinearGradient(0,H*.48,0,H);fg.addColorStop(0,'rgba(15,28,44,.65)');fg.addColorStop(1,'rgba(6,10,16,.9)');
  ctx.fillStyle=fg;ctx.fillRect(0,H*.48,W,H*.52);
  ctx.strokeStyle='rgba(0,204,255,.07)';ctx.beginPath();ctx.moveTo(0,H*.48);ctx.lineTo(W/2,H*.2);ctx.lineTo(W,H*.48);ctx.stroke();
  if(night){const ig=ctx.createRadialGradient(W/2,H*.32,0,W/2,H*.32,W*.42);ig.addColorStop(0,'rgba(180,210,255,.07)');ig.addColorStop(1,'transparent');ctx.fillStyle=ig;ctx.fillRect(0,0,W,H);}
  // noise
  const imgd=ctx.getImageData(0,0,W,H);for(let i=0;i<imgd.data.length;i+=4){const n=(Math.random()-.5)*12;imgd.data[i]+=n;imgd.data[i+1]+=n;imgd.data[i+2]+=n;}ctx.putImageData(imgd,0,0);
  // timestamp
  ctx.fillStyle='rgba(255,255,255,.22)';ctx.font='6px JetBrains Mono,monospace';
  ctx.fillText('2026-03-12 14:32:0'+seed,4,H-4);
}
function animCam(id,seed,night){
  const cv=document.getElementById(id);if(!cv)return;
  drawCam(cv,seed,night);let t=0;
  (function f(){t++;if(t%90===0)drawCam(cv,seed,night);requestAnimationFrame(f);})();
}
animCam('cv-cam1',8,false);animCam('cv-cam2',4,false);animCam('cv-cam3',2,true);

/* CFTV */
let cftvInit=false;
function initCFTV(){if(cftvInit)return;cftvInit=true;['cv-c1','cv-c2','cv-c3','cv-c4'].forEach((id,i)=>animCam(id,i+1,i>=2));}

/* ALARM MAP */
let alarmRaf=null;
function initAlarm(){
  if(alarmRaf){cancelAnimationFrame(alarmRaf);alarmRaf=null;}
  const cv=document.getElementById('cv-alarm');if(!cv)return;
  const p=cv.parentElement;cv.width=p.offsetWidth||500;cv.height=p.offsetHeight||100;
  const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  const zones=[{x:W*.12,y:H*.5,r:13,col:'28,202,65',ph:0},{x:W*.34,y:H*.36,r:11,col:'28,202,65',ph:.8},{x:W*.57,y:H*.54,r:12,col:'28,202,65',ph:1.6},{x:W*.82,y:H*.4,r:11,col:'28,202,65',ph:2.4}];
  const edges=[[0,1],[1,2],[2,3]];
  function frame(){
    ctx.clearRect(0,0,W,H);ctx.fillStyle='rgba(4,8,18,.65)';ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(0,204,255,.05)';ctx.lineWidth=.4;
    for(let x=0;x<W;x+=12){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=12){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    edges.forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(zones[a].x,zones[a].y);ctx.lineTo(zones[b].x,zones[b].y);ctx.strokeStyle='rgba(0,204,255,.18)';ctx.lineWidth=1;ctx.stroke();});
    zones.forEach(z=>{z.ph+=.04;const br=.5+.5*Math.sin(z.ph);
      const g=ctx.createRadialGradient(z.x,z.y,0,z.x,z.y,z.r*2.8);
      g.addColorStop(0,`rgba(${z.col},${br*.28})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(z.x,z.y,z.r*2.8,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.arc(z.x,z.y,z.r,0,Math.PI*2);ctx.fillStyle=`rgba(${z.col},.85)`;ctx.fill();
      ctx.fillStyle='rgba(200,225,240,.55)';ctx.font='7px JetBrains Mono,monospace';ctx.textAlign='center';
      ctx.fillText('Z'+(zones.indexOf(z)+1),z.x,z.y+2.5);ctx.textAlign='left';});
    alarmRaf=requestAnimationFrame(frame);}frame();
}

/* MINI BARS */
function buildBars(id,colors){
  const el=document.getElementById(id);if(!el)return;
  const vs=[42,58,35,74,52,85,68];const mx=Math.max(...vs);
  el.innerHTML=vs.map((v,i)=>`<div class="mini-bar" data-h="${(v/mx*96).toFixed(1)}%" style="height:0;background:${colors[i%colors.length]};opacity:.78;transition:height .7s cubic-bezier(.16,1,.3,1) ${i*.06}s;"></div>`).join('');
  setTimeout(()=>el.querySelectorAll('.mini-bar').forEach(b=>b.style.height=b.dataset.h),60);
}

/* PICKER LOGIC */
(function(){
  const tabs=document.querySelectorAll('.sol-tab');
  function activate(svc){
    if(alarmRaf){cancelAnimationFrame(alarmRaf);alarmRaf=null;}
    tabs.forEach(t=>{ t.classList.remove('on'); t.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.sol-info').forEach(i=>i.classList.remove('on'));
    document.querySelectorAll('.sol-mockup').forEach(m=>m.classList.remove('on'));
    const activeTab=document.querySelector(`.sol-tab[data-s="${svc}"]`);
    if(activeTab){activeTab.classList.add('on');activeTab.setAttribute('aria-selected','true');}
    document.getElementById('i-'+svc)?.classList.add('on');
    document.getElementById('m-'+svc)?.classList.add('on');
    if(svc==='auto'){cUp('kv-a1',3847,'R$','',900);cUp('kv-a2',47,'R$','',700);document.getElementById('kv-a3').textContent='3 itens';}
    if(svc==='cftv'){setTimeout(initCFTV,80);}
    if(svc==='alarm'){cUp('kv-al',8,'','',600);setTimeout(initAlarm,80);}
    if(svc==='erp'){cUp('kv-e1',28540,'R$','',1000);cUp('kv-e2',4320,'R$','',800);cUp('kv-e3',1890,'R$','',800);
      setTimeout(()=>{buildBars('e-bars1',['#FF4400','#00CCFF','#FFB800','#FF6622','#33DDFF','#FF4400','#00CCFF']);buildBars('e-bars2',['#00CCFF','#FF4400','#00CCFF','#FF4400','#00FF88','#FF4400','#00CCFF']);},100);}
  }
  tabs.forEach(t=>t.addEventListener('click',()=>activate(t.dataset.s)));
  setTimeout(()=>activate('auto'),350);
})();

/* CLIENT COUNTER */
(function(){const el=document.getElementById('cl-num');if(!el)return;
  new IntersectionObserver(([e])=>{if(e.isIntersecting){let v=0;const t=setInterval(()=>{v=Math.min(v+3,300);el.textContent=v;if(v>=300)clearInterval(t);},12);}},{threshold:.3}).observe(el);
})();

/* CLIENT STATS */
(function(){const els=document.querySelectorAll('.cst-v');if(!els.length)return;
  const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){
    els.forEach(el=>{const to=parseInt(el.dataset.to),suf=el.dataset.suf||'';let v=0;
      const step=to/(800/16);const t=setInterval(()=>{v=Math.min(v+step,to);el.textContent=Math.floor(v)+suf;if(v>=to)clearInterval(t);},16);});
    obs.disconnect();}},{threshold:.4});
  const wrap=document.querySelector('.cl-stats');if(wrap)obs.observe(wrap);
})();

/* PLANOS TOGGLE */
function showPlanos(tipo){
  document.getElementById('planos-assinatura').style.display=tipo==='assinatura'?'grid':'none';
  document.getElementById('planos-contrato').style.display=tipo==='contrato'?'grid':'none';
  document.querySelectorAll('.plan-toggle-btn').forEach((b,i)=>{
    const isOn=(i===0&&tipo==='assinatura')||(i===1&&tipo==='contrato');
    b.classList.toggle('on',isOn);
    b.setAttribute('aria-pressed',isOn?'true':'false');
  });
}

/* PRODUCT FILTER */
function filterProd(cat, btn) {
  document.querySelectorAll('.lj-filter').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.prod-card').forEach(card=>{
    const show = cat==='todos' || card.dataset.cat===cat;
    card.style.display = show ? 'flex' : 'none';
    if(show){card.style.opacity='0';card.style.transform='translateY(16px)';
      setTimeout(()=>{card.style.transition='opacity .35s ease,transform .35s ease';
        card.style.opacity='1';card.style.transform='translateY(0)';},20);}
  });
}

/* TERMINAL ANIMATION */
(function(){
  const lines = ['sl1','sl2','sl3','sl4','sl5','sl6'];
  function runTerminal(){
    lines.forEach(id=>{const el=document.getElementById(id);if(el)el.classList.remove('sh');});
    lines.forEach((id,i)=>setTimeout(()=>{const el=document.getElementById(id);if(el)el.classList.add('sh');},200+i*320));
  }
  const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)runTerminal();},{threshold:.3});
  const sec = document.getElementById('sistema');if(sec)obs.observe(sec);
})();


/* PRODUCT FILTER */
function filtProd(cat, btn) {
  document.querySelectorAll('.lj-chip').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed','false'); });
  btn.classList.add('on'); btn.setAttribute('aria-pressed','true');
  const cards = document.querySelectorAll('.p-card');
  let delay = 0;
  cards.forEach(c => {
    const match = cat === 'todos' || c.dataset.cat === cat;
    if (match) {
      c.style.display = 'flex';
      c.style.opacity = '0';
      c.style.transform = 'translateY(14px)';
      setTimeout(() => {
        c.style.transition = 'opacity .3s ease, transform .3s ease';
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, delay);
      delay += 40;
    } else {
      c.style.opacity = '0';
      c.style.transform = 'translateY(8px)';
      setTimeout(() => { c.style.display = 'none'; }, 280);
    }
  });
}

/* TERMINAL ANIMATION */
(function () {
  var tids = ['tl1','tl2','tl3','tl4','tl5','tl6'];
  var ran = false;
  function run() {
    if (ran) return; ran = true;
    tids.forEach(id => { var el = document.getElementById(id); if (el) el.classList.remove('show'); });
    tids.forEach((id, i) => setTimeout(() => {
      var el = document.getElementById(id); if (el) el.classList.add('show');
    }, 150 + i * 280));
  }
  var sec = document.getElementById('sistema');
  if (sec) {
    var obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); }, { threshold: 0.25 });
    obs.observe(sec);
  }
})();



/* ════════════════════════════════════════
   ORBITAL CINEMATIC — Sistema Canvas
════════════════════════════════════════ */
(function(){
  var cv = document.getElementById('orb-cv');
  if(!cv) return;
  var ctx = cv.getContext('2d');
  var W,H,cx,cy,R,t=0,frame_n=0;

  function resize(){
    W=cv.offsetWidth; H=cv.offsetHeight;
    cv.width=W*devicePixelRatio; cv.height=H*devicePixelRatio;
    ctx.scale(devicePixelRatio,devicePixelRatio);
    cx=W*.5; cy=H*.45; R=Math.min(W,H)*.28;
  }
  window.addEventListener('resize',resize); resize();

  /* ── RINGS ── */
  var rings=[
    {tilt:0,   speed:0.004, r:1.00, col:'0,204,255', w:1.2, dash:[6,5],  dots:3, dsize:2.5},
    {tilt:60,  speed:0.007, r:0.82, col:'0,204,255', w:0.8, dash:[3,8],  dots:2, dsize:2.0},
    {tilt:-45, speed:0.006, r:0.68, col:'255,68,0',  w:1.0, dash:[8,4],  dots:2, dsize:2.0},
    {tilt:80,  speed:0.011, r:0.92, col:'0,255,136', w:0.6, dash:[2,10], dots:1, dsize:1.5},
    {tilt:25,  speed:0.003, r:0.56, col:'0,204,255', w:0.9, dash:[],     dots:1, dsize:1.8},
    {tilt:-72, speed:0.015, r:0.77, col:'204,0,255', w:0.5, dash:[1,12], dots:1, dsize:1.4},
    {tilt:38,  speed:0.009, r:1.12, col:'0,204,255', w:0.4, dash:[4,6],  dots:0, dsize:0},
  ];

  /* init dot angles */
  rings.forEach(function(rg){
    rg.dAngles=[];
    for(var i=0;i<rg.dots;i++) rg.dAngles.push((Math.PI*2/Math.max(rg.dots,1))*i);
  });

  /* ── PARTICLES ── */
  var PCNT=80, pts=[];
  for(var i=0;i<PCNT;i++){
    var a=Math.random()*Math.PI*2, d=R*(0.15+Math.random());
    pts.push({
      x:Math.cos(a)*d, y:Math.sin(a)*d*.6,
      vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
      life:Math.random(), max:0.4+Math.random()*.7, size:Math.random()*1.8+.3,
      col:Math.random()<.65?'0,204,255':Math.random()<.5?'0,255,136':'255,68,0'
    });
  }

  /* ── DNA ── */
  var dnaA=0;

  /* ── ASTEROIDS (small ring of debris) ── */
  var debris=[];
  for(var i=0;i<24;i++){
    debris.push({
      angle:i*(Math.PI*2/24)+(Math.random()-.5)*.15,
      r:R*(1.22+Math.random()*.06),
      size:Math.random()*1.4+.4,
      speed:(Math.random()-.5)*.002+.003,
      col:Math.random()<.7?'0,204,255':'255,68,0'
    });
  }

  /* helpers */
  function proj(a,rr,tiltDeg){
    var tilt=tiltDeg*Math.PI/180;
    return{x:cx+Math.cos(a)*rr, y:cy+Math.sin(a)*rr*Math.cos(tilt), z:Math.sin(a)*Math.sin(tilt)};
  }

  function drawRing(rg,alpha){
    var ry=R*rg.r, tilt=rg.tilt*Math.PI/180;
    ctx.beginPath();
    for(var i=0;i<=120;i++){
      var a=(i/120)*Math.PI*2;
      var px=cx+Math.cos(a)*ry, py=cy+Math.sin(a)*ry*Math.cos(tilt);
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba('+rg.col+','+alpha+')';
    ctx.lineWidth=rg.w;
    ctx.setLineDash(rg.dash); ctx.stroke(); ctx.setLineDash([]);
  }

  function drawDot(angle,rg){
    var ry=R*rg.r;
    var pt=proj(angle,ry,rg.tilt);
    var depth=(pt.z+1)/2;
    var al=.35+depth*.65, sz=rg.dsize*(1+depth*.8);
    /* trail */
    for(var i=24;i>0;i--){
      var tp=proj(angle-i*.045,ry,rg.tilt);
      ctx.beginPath(); ctx.arc(tp.x,tp.y,sz*(i/24)*.55,0,Math.PI*2);
      ctx.fillStyle='rgba('+rg.col+','+(al*(i/24)*.3)+')'; ctx.fill();
    }
    /* dot */
    ctx.beginPath(); ctx.arc(pt.x,pt.y,sz,0,Math.PI*2);
    ctx.fillStyle='rgba('+rg.col+','+al+')'; ctx.fill();
    /* glow */
    var g=ctx.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,sz*5);
    g.addColorStop(0,'rgba('+rg.col+','+(al*.5)+')');
    g.addColorStop(1,'rgba('+rg.col+',0)');
    ctx.beginPath(); ctx.arc(pt.x,pt.y,sz*5,0,Math.PI*2);
    ctx.fillStyle=g; ctx.fill();
  }

  function drawCore(){
    /* deep glow layers */
    [[90,.04],[60,.07],[38,.12],[22,.22],[12,.45]].forEach(function(v){
      var g=ctx.createRadialGradient(cx,cy,0,cx,cy,v[0]);
      g.addColorStop(0,'rgba(0,204,255,'+v[1]+')'); g.addColorStop(1,'rgba(0,204,255,0)');
      ctx.beginPath(); ctx.arc(cx,cy,v[0],0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
    });
    /* orange inner */
    var og=ctx.createRadialGradient(cx,cy,0,cx,cy,8);
    og.addColorStop(0,'rgba(255,120,0,.6)'); og.addColorStop(1,'rgba(255,68,0,0)');
    ctx.beginPath(); ctx.arc(cx,cy,8,0,Math.PI*2); ctx.fillStyle=og; ctx.fill();
    /* solid core */
    var cg=ctx.createRadialGradient(cx-2,cy-2,0,cx,cy,9);
    cg.addColorStop(0,'rgba(200,245,255,.98)'); cg.addColorStop(.5,'rgba(0,204,255,.8)');
    cg.addColorStop(1,'rgba(0,60,120,.3)');
    ctx.beginPath(); ctx.arc(cx,cy,9,0,Math.PI*2); ctx.fillStyle=cg; ctx.fill();
    /* pulse rings */
    for(var i=0;i<3;i++){
      var pr=13+i*8+Math.sin(t*3+i)*4;
      ctx.beginPath(); ctx.arc(cx,cy,pr,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,204,255,'+((.3-i*.08)+Math.sin(t*3)*(.06))+')';
      ctx.lineWidth=1-i*.2; ctx.stroke();
    }
  }

  function drawDNA(){
    var len=100, step=5.5, twist=.25, sx=cx, sy=cy-len/2;
    for(var i=0;i<len/step;i++){
      var y=sy+i*step, a=dnaA+i*twist;
      var dx=Math.cos(a)*16;
      /* strand A */
      ctx.beginPath(); ctx.arc(sx+dx,y,2.2,0,Math.PI*2);
      ctx.fillStyle='rgba(0,204,255,'+(0.45+Math.cos(a)*.35)+')'; ctx.fill();
      /* strand B */
      ctx.beginPath(); ctx.arc(sx-dx,y,2.2,0,Math.PI*2);
      ctx.fillStyle='rgba(255,68,0,'+(0.45+Math.cos(a+Math.PI)*.35)+')'; ctx.fill();
      /* rung */
      if(i%2===0){
        ctx.beginPath(); ctx.moveTo(sx+dx*.6,y); ctx.lineTo(sx-dx*.6,y);
        ctx.strokeStyle='rgba(0,204,255,.12)'; ctx.lineWidth=.8; ctx.stroke();
      }
    }
    dnaA+=.014;
  }

  function drawParticles(){
    pts.forEach(function(p){
      p.life+=.004; if(p.life>p.max){p.life=0;p.max=.4+Math.random()*.7;}
      p.x+=p.vx; p.y+=p.vy;
      if(p.x*p.x+p.y*p.y>R*R*1.4){p.vx*=-.85;p.vy*=-.85;}
      var al=Math.sin(p.life/p.max*Math.PI)*.55;
      ctx.beginPath(); ctx.arc(cx+p.x,cy+p.y,p.size,0,Math.PI*2);
      ctx.fillStyle='rgba('+p.col+','+al+')'; ctx.fill();
    });
    /* connections */
    for(var i=0;i<pts.length;i++){
      for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<50){
          ctx.beginPath(); ctx.moveTo(cx+pts[i].x,cy+pts[i].y); ctx.lineTo(cx+pts[j].x,cy+pts[j].y);
          ctx.strokeStyle='rgba(0,204,255,'+(0.1*(1-d/50))+')'; ctx.lineWidth=.4; ctx.stroke();
        }
      }
    }
  }

  function drawDebris(){
    debris.forEach(function(d){
      d.angle+=d.speed;
      var x=cx+Math.cos(d.angle)*d.r, y=cy+Math.sin(d.angle)*d.r*.7;
      ctx.beginPath(); ctx.arc(x,y,d.size,0,Math.PI*2);
      ctx.fillStyle='rgba('+d.col+',.35)'; ctx.fill();
    });
  }

  function drawTicks(){
    var n=36;
    for(var i=0;i<n;i++){
      var a=t*.25+i*(Math.PI*2/n);
      var major=i%9===0, mid=i%3===0;
      var r1=R*1.18, r2=r1+(major?10:mid?6:3);
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1*.7);
      ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2*.7);
      ctx.strokeStyle='rgba(0,204,255,'+(major?.5:mid?.25:.12)+')';
      ctx.lineWidth=major?1.5:mid?1:.6; ctx.stroke();
    }
    /* outer ellipse */
    ctx.save(); ctx.scale(1,.7); ctx.translate(0,cy*.43);
    ctx.beginPath(); ctx.ellipse(cx,cy,R*1.2,R*1.2,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,204,255,.04)'; ctx.lineWidth=1;
    ctx.setLineDash([2,12]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  }

  /* grid floor effect */
  function drawFloor(){
    var fy=cy+R*.55, fw=R*2.2;
    ctx.save();
    ctx.globalAlpha=.18;
    /* converging lines */
    for(var i=-10;i<=10;i++){
      var x=cx+i*(fw/10);
      ctx.beginPath(); ctx.moveTo(x,fy); ctx.lineTo(cx,fy+R*.3);
      ctx.strokeStyle='rgba(0,204,255,.4)'; ctx.lineWidth=.5; ctx.stroke();
    }
    for(var i=0;i<6;i++){
      var y=fy+i*(R*.3/6), frac=i/6;
      ctx.beginPath(); ctx.moveTo(cx-fw*(1-frac)/2,y); ctx.lineTo(cx+fw*(1-frac)/2,y);
      ctx.strokeStyle='rgba(0,204,255,.4)'; ctx.lineWidth=.5; ctx.stroke();
    }
    ctx.restore();
  }

  /* nebula / atmosphere */
  function drawNebula(){
    var g=ctx.createRadialGradient(cx,cy,R*.1,cx,cy,R*1.6);
    g.addColorStop(0,'rgba(0,204,255,.0)');
    g.addColorStop(.5,'rgba(0,40,80,.04)');
    g.addColorStop(1,'rgba(0,204,255,.0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

    /* orange nebula offset */
    var og=ctx.createRadialGradient(cx+R*.4,cy-R*.3,0,cx+R*.4,cy-R*.3,R*.8);
    og.addColorStop(0,'rgba(255,68,0,.04)'); og.addColorStop(1,'rgba(255,68,0,0)');
    ctx.fillStyle=og; ctx.fillRect(0,0,W,H);
  }

  function tick(){
    ctx.clearRect(0,0,W,H);
    /* deep bg */
    var bg=ctx.createRadialGradient(cx,cy,0,cx,cy,R*2);
    bg.addColorStop(0,'rgba(0,10,25,.95)'); bg.addColorStop(1,'rgba(1,3,8,1)');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    drawNebula();
    drawFloor();
    drawParticles();
    drawDebris();
    drawTicks();

    /* rings */
    rings.forEach(function(rg,ri){
      var al=.18+Math.sin(t*1.2+ri*.9)*.12;
      drawRing(rg,al);
      rg.dAngles.forEach(function(da,di){
        rg.dAngles[di]+=rg.speed;
        drawDot(rg.dAngles[di]+ri*.6,rg);
      });
    });

    drawDNA();
    drawCore();

    t+=.016;
    requestAnimationFrame(tick);
  }
  tick();
})();


/* ════ TECH UPGRADE JS ════ */

/* Scroll progress bar */
(function(){
  var bar = document.getElementById('scroll-prog');
  if(!bar) return;
  window.addEventListener('scroll', function(){
    var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, {passive:true});
})();

/* Mouse trail */
(function(){
  var MAX = 12, trails = [], idx = 0;
  for(var i=0;i<MAX;i++){
    var d = document.createElement('div');
    d.className = 'm-trail';
    var s = (1 - i/MAX) * 8;
    d.style.cssText = 'width:'+s+'px;height:'+s+'px;margin-left:-'+(s/2)+'px;margin-top:-'+(s/2)+'px;';
    document.body.appendChild(d);
    trails.push({el:d, x:0, y:0});
  }
  var mx=0, my=0;
  document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; });
  var positions = Array(MAX).fill({x:0,y:0});
  function animTrail(){
    positions.unshift({x:mx, y:my});
    positions = positions.slice(0, MAX);
    trails.forEach(function(t,i){
      var p = positions[Math.min(i*1, positions.length-1)];
      t.el.style.left = p.x+'px';
      t.el.style.top = p.y+'px';
      t.el.style.opacity = (1-i/MAX)*0.4;
    });
    requestAnimationFrame(animTrail);
  }
  animTrail();
})();

/* Active nav indicator — removido, handled by CSS :hover */

/* Clients section canvas BG — neural net */
(function(){
  var cv = document.createElement('canvas');
  cv.className = 'clients-bg-canvas';
  var sec = document.querySelector('.clients');
  if(!sec) return;
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(cv, sec.firstChild);
  var ctx = cv.getContext('2d'), W, H, pts2 = [], t2 = 0;
  function resize2(){
    W=sec.offsetWidth; H=sec.offsetHeight;
    cv.width=W; cv.height=H; cv.style.width=W+'px'; cv.style.height=H+'px';
  }
  window.addEventListener('resize',resize2); resize2();
  for(var i=0;i<40;i++) pts2.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
  function drawBg(){
    ctx.clearRect(0,0,W,H);
    pts2.forEach(function(p){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
    });
    for(var i=0;i<pts2.length;i++){
      for(var j=i+1;j<pts2.length;j++){
        var dx=pts2[i].x-pts2[j].x, dy=pts2[i].y-pts2[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath(); ctx.moveTo(pts2[i].x,pts2[i].y); ctx.lineTo(pts2[j].x,pts2[j].y);
          ctx.strokeStyle='rgba(0,204,255,'+(0.06*(1-d/120))+')';
          ctx.lineWidth=.5; ctx.stroke();
        }
      }
    }
    pts2.forEach(function(p){
      ctx.beginPath(); ctx.arc(p.x,p.y,1.2,0,Math.PI*2);
      ctx.fillStyle='rgba(0,204,255,.2)'; ctx.fill();
    });
    requestAnimationFrame(drawBg);
  }
  drawBg();
})();

/* Typed text effect on hero eyebrow */
(function(){
  var el = document.querySelector('.hero-eye');
  if(!el) return;
  var orig = el.textContent.trim();
  var prefix = '→ ';
  var typed = '';
  var i = 0;
  setTimeout(function type(){
    if(i <= orig.length){
      el.innerHTML = prefix + orig.slice(0,i) + '<span style="animation:typed-blink .8s infinite;display:inline-block;width:7px;height:13px;background:var(--b);vertical-align:middle;margin-left:2px;"></span>';
      i++;
      setTimeout(type, 45 + Math.random()*30);
    } else {
      el.innerHTML = prefix + orig;
    }
  }, 800);
})();


/* ══════════════════════════════════════════════════
   CINEMATIC ANIMATION ENGINE v2
══════════════════════════════════════════════════ */

/* ── Universal Intersection Observer ── */
(function(){
  var selectors = '.rev,.rev-left,.rev-right,.rev-scale,.rev-flip,.sec-h2,.split-l,.cl-num-wrap,.marca';
  var els = document.querySelectorAll(selectors);
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){ io.observe(el); });
})();

/* ── 3D Card Tilt ── */
(function(){
  document.querySelectorAll('.tilt-card').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var rect=card.getBoundingClientRect();
      var x=(e.clientX-rect.left)/rect.width-.5;
      var y=(e.clientY-rect.top)/rect.height-.5;
      card.style.transform='perspective(900px) rotateX('+(y*-12)+'deg) rotateY('+(x*14)+'deg) translateY(-6px)';
      var shine=card.querySelector('.tilt-shine');
      if(shine) shine.style.background='radial-gradient(circle at '+(x*100+50)+'% '+(y*100+50)+'%,rgba(255,255,255,.1) 0%,transparent 60%)';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transform='';
      var shine=card.querySelector('.tilt-shine');
      if(shine) shine.style.background='';
    });
  });
})();

/* ── Click Explosion Particles ── */
(function(){
  function burst(x,y,color){
    var N=14;
    for(var i=0;i<N;i++){
      var p=document.createElement('div');
      p.className='xplo';
      var angle=(i/N)*Math.PI*2;
      var dist=40+Math.random()*60;
      var tx=Math.cos(angle)*dist;
      var ty=Math.sin(angle)*dist;
      var sz=3+Math.random()*4;
      p.style.cssText='left:'+x+'px;top:'+y+'px;width:'+sz+'px;height:'+sz+'px;'
        +'background:'+color+';'
        +'--tx:'+tx+'px;--ty:'+ty+'px;'
        +'animation:xplo-burst '+(0.5+Math.random()*0.3)+'s cubic-bezier(.16,1,.3,1) forwards;';
      document.body.appendChild(p);
      setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 900);
    }
  }
  document.addEventListener('click',function(e){
    var colors=['rgba(0,204,255,0.9)','rgba(255,68,0,0.9)','rgba(0,255,136,0.9)'];
    burst(e.clientX, e.clientY, colors[Math.floor(Math.random()*colors.length)]);
  });
})();

/* ── Magnetic Buttons ── */
(function(){
  document.querySelectorAll('.btn-main,.sis-cta-btn,.loja-see-all,.stc-acc,.pc-buy,.loja-all-btn').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){
      var rect=btn.getBoundingClientRect();
      var x=(e.clientX-rect.left-rect.width/2)*.25;
      var y=(e.clientY-rect.top-rect.height/2)*.25;
      btn.style.transform='translate('+x+'px,'+y+'px)';
    });
    btn.addEventListener('mouseleave',function(){
      btn.style.transform='';
    });
  });
})();

/* ── Text Scramble on hover (sec-kicker elements) ── */
(function(){
  var chars='01アイウエオカキクケコ░▒▓█◈◆◇';
  function scramble(el){
    var orig=el.dataset.orig||(el.dataset.orig=el.textContent);
    var iter=0, maxIter=orig.length*2;
    var interval=setInterval(function(){
      el.textContent=orig.split('').map(function(c,i){
        if(c===' ') return ' ';
        if(i<iter/2) return orig[i];
        return chars[Math.floor(Math.random()*chars.length)];
      }).join('');
      if(iter>=maxIter){ clearInterval(interval); el.textContent=orig; }
      iter++;
    },40);
  }
  document.querySelectorAll('.sec-kicker').forEach(function(el){
    el.addEventListener('mouseenter',function(){ scramble(el); });
  });
})();

/* ── Counter Upgrade with glow pulse ── */
(function(){
  var counters=document.querySelectorAll('.stat-n[data-to]');
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target;
      var to=+el.dataset.to, suf=el.dataset.suf||'', pre=el.dataset.pre||'';
      var dur=1800, start=null;
      function ease(t){ return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1; }
      requestAnimationFrame(function step(ts){
        if(!start) start=ts;
        var p=Math.min((ts-start)/dur,1);
        el.textContent=pre+Math.floor(ease(p)*to)+suf;
        if(p<1) requestAnimationFrame(step);
        else {
          el.textContent=pre+to+suf;
          el.style.animation='counter-pop .4s ease';
        }
      });
      io.unobserve(el);
    });
  },{threshold:.5});
  counters.forEach(function(el){ io.observe(el); });
})();

/* ── Stagger children on section enter ── */
(function(){
  var groups=[
    {parent:'.svc-grid',child:'.svc-card',anim:'rev-flip'},
    {parent:'.prod-grid',child:'.p-card',anim:'rev'},
    {parent:'.plan-grid',child:'.plan-card',anim:'rev-scale'},
    {parent:'.cl-stats',child:'.cl-stat',anim:'rev-flip'},
  ];
  groups.forEach(function(g){
    var parent=document.querySelector(g.parent);
    if(!parent) return;
    var children=parent.querySelectorAll(g.child);
    children.forEach(function(c,i){
      c.classList.add(g.anim);
      c.style.transitionDelay=(i*.08)+'s';
    });
    var io=new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){
        children.forEach(function(c){ c.classList.add('on'); });
        io.disconnect();
      }
    },{threshold:.08});
    io.observe(parent);
  });
})();

/* ── Parallax on scroll ── */
(function(){
  var layers=[
    {sel:'.hero-nodes',speed:.15},
    {sel:'.hero-right',speed:.08},
    {sel:'.hero-blob',speed:.2},
  ];
  window.addEventListener('scroll',function(){
    var sy=window.scrollY;
    layers.forEach(function(l){
      var el=document.querySelector(l.sel);
      if(el) el.style.transform='translateY('+(sy*l.speed)+'px)';
    });
  },{passive:true});
})();

/* ── Glitch flash on svc-card hover ── */
(function(){
  document.querySelectorAll('.svc-card').forEach(function(card){
    card.addEventListener('mouseenter',function(){
      card.style.filter='brightness(1.1) saturate(1.2)';
      setTimeout(function(){ card.style.filter='brightness(1.05) saturate(1.1)'; },80);
      setTimeout(function(){ card.style.filter=''; },200);
    });
  });
})();

/* ── Ripple effect on buttons ── */
(function(){
  document.querySelectorAll('.btn-main,.pc-buy,.loja-see-all,.sis-cta-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      var rect=btn.getBoundingClientRect();
      var ripple=document.createElement('span');
      var size=Math.max(rect.width,rect.height)*2;
      ripple.style.cssText='position:absolute;border-radius:50%;background:rgba(255,255,255,.25);'
        +'width:'+size+'px;height:'+size+'px;'
        +'left:'+(e.clientX-rect.left-size/2)+'px;'
        +'top:'+(e.clientY-rect.top-size/2)+'px;'
        +'transform:scale(0);animation:ripple-expand .6s ease forwards;pointer-events:none;';
      btn.appendChild(ripple);
      setTimeout(function(){ if(ripple.parentNode) ripple.parentNode.removeChild(ripple); },700);
    });
  });
})();

/* ── Ripple keyframe (dynamic inject) ── */
(function(){
  var s=document.createElement('style');
  s.textContent='@keyframes ripple-expand{to{transform:scale(1);opacity:0;}} @keyframes counter-pop{0%{transform:scale(1.2);}100%{transform:scale(1);}}';
  document.head.appendChild(s);
})();

/* ── Section label typewriter on enter ── */
(function(){
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting||e.target.dataset.typed) return;
      e.target.dataset.typed='1';
      var orig=e.target.textContent;
      var i=0;
      var iv=setInterval(function(){
        e.target.textContent=orig.slice(0,i)+(i<orig.length?'|':'');
        if(i++>orig.length) clearInterval(iv);
      },35);
    });
  },{threshold:.8});
  document.querySelectorAll('.sec-kicker').forEach(function(el){ io.observe(el); });
})();


/* ══════════════════════════════════════════════════════════
   CINEMATIC ANIMATION ENGINE v2
══════════════════════════════════════════════════════════ */

/* ── MASTER IntersectionObserver ── */
(function(){
  var els = document.querySelectorAll(
    '.cx-fade,.cx-left,.cx-right,.cx-scale,.cx-flip,.cx-slice,.cx-zoom,.svc-card,.p-card,.plan-card,.split-l,.split-r,.cta-band'
  );
  
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target;
      
      /* shockwave on major sections */
      if(el.classList.contains('split-l') || el.classList.contains('cta-band')){
        var sw = document.createElement('div');
        sw.className = 'section-shock';
        el.style.position = 'relative';
        el.appendChild(sw);
        setTimeout(function(){ sw.remove(); }, 900);
      }
      
      el.classList.add('cx-in');
      io.unobserve(el);
    });
  }, { threshold:0.08, rootMargin:'0px 0px -40px 0px' });
  
  els.forEach(function(el){ io.observe(el); });
})();

/* ── SECTION ENTER: glitch headings ── */
(function(){
  var heads = document.querySelectorAll('.sec-h2.glitch-in');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.style.animationPlayState = 'running';
      io.unobserve(e.target);
    });
  }, { threshold:0.2 });
  heads.forEach(function(h){ 
    h.style.animationPlayState = 'paused'; 
    io.observe(h); 
  });
})();

/* ── CLICK PARTICLE BURST ── */
document.addEventListener('click', function(e){
  var colors = ['#00CCFF','#FF4400','#00FF88','#FFB800','#CC00FF'];
  var container = document.createElement('div');
  container.className = 'click-burst';
  container.style.left = e.clientX + 'px';
  container.style.top  = e.clientY + 'px';
  document.body.appendChild(container);
  
  var count = 18;
  for(var i=0; i<count; i++){
    var p = document.createElement('div');
    p.className = 'burst-p';
    var angle = (i/count)*Math.PI*2;
    var dist  = 40 + Math.random()*60;
    var bx = Math.cos(angle)*dist;
    var by = Math.sin(angle)*dist;
    p.style.setProperty('--bx', bx+'px');
    p.style.setProperty('--by', by+'px');
    p.style.background = colors[i % colors.length];
    p.style.left = '-2px'; p.style.top = '-2px';
    p.style.width  = (3 + Math.random()*4) + 'px';
    p.style.height = p.style.width;
    p.style.animationDelay = (Math.random()*.08) + 's';
    container.appendChild(p);
  }
  setTimeout(function(){ container.remove(); }, 700);
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-main, .sis-cta-btn, .pc-buy, .loja-see-all, .stc-acc').forEach(function(btn){
  btn.addEventListener('mousemove', function(e){
    var r = btn.getBoundingClientRect();
    var x = e.clientX - r.left - r.width/2;
    var y = e.clientY - r.top  - r.height/2;
    btn.style.transform = 'translate('+x*.18+'px,'+y*.18+'px) scale(1.04)';
  });
  btn.addEventListener('mouseleave', function(){
    btn.style.transform = '';
  });
});

/* ── 3D TILT on cards ── */
document.querySelectorAll('.svc-card, .p-card, .plan-card').forEach(function(card){
  card.addEventListener('mousemove', function(e){
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width  - .5;
    var y = (e.clientY - r.top)  / r.height - .5;
    var ry =  x * 12;
    var rx = -y * 8;
    card.style.transform = 'perspective(600px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-6px) scale(1.02)';
    /* light reflection */
    var lx = (x+.5)*100, ly = (y+.5)*100;
    card.style.background = 
      'radial-gradient(circle at '+lx+'% '+ly+'%, rgba(0,204,255,.07) 0%, transparent 60%), var(--K3)';
  });
  card.addEventListener('mouseleave', function(){
    card.style.transform = '';
    card.style.background = '';
  });
});

/* ── COUNTER SLAM on clientes ── */
(function(){
  var numEl = document.getElementById('cl-num');
  if(!numEl) return;
  var io = new IntersectionObserver(function(entries){
    if(!entries[0].isIntersecting) return;
    numEl.classList.add('cl-num-slam');
    io.disconnect();
  }, { threshold:.4 });
  io.observe(numEl);
})();

/* ── PARALLAX on hero blobs ── */
(function(){
  var b1 = document.querySelector('.hero-blob');
  var b2 = document.querySelector('.hero-blob2');
  if(!b1) return;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if(b1) b1.style.transform = 'translateY('+y*.3+'px)';
    if(b2) b2.style.transform = 'translateY('+y*.18+'px)';
  }, {passive:true});
})();

/* ── STAGGER section children ── */
(function(){
  var containers = [
    { sel:'.svc-grid',    child:'.svc-card',  delay:120 },
    { sel:'#p-grid',      child:'.p-card',    delay:80  },
    { sel:'.plan-grid',   child:'.plan-card', delay:150 },
    { sel:'.stats-inner', child:'.stat-b',    delay:100 },
    { sel:'.cl-logos',    child:'.cl-logo',   delay:60  },
  ];
  containers.forEach(function(c){
    var parent = document.querySelector(c.sel);
    if(!parent) return;
    var children = parent.querySelectorAll(c.child);
    var io = new IntersectionObserver(function(entries){
      if(!entries[0].isIntersecting) return;
      children.forEach(function(child, i){
        setTimeout(function(){
          child.classList.add('cx-in');
          child.style.transitionDelay = '0s';
        }, i * c.delay);
      });
      io.disconnect();
    }, { threshold:.1 });
    io.observe(parent);
  });
})();

/* ── SECTION ENTER: kicker neon flicker ── */
(function(){
  var kickers = document.querySelectorAll('.sec-kicker');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.style.animation = 'kicker-flicker .4s ease .1s both';
      io.unobserve(e.target);
    });
  }, { threshold:.5 });
  kickers.forEach(function(k){ io.observe(k); });
})();

/* ── STATS: animated progress bars ── */
(function(){
  var bars = document.querySelectorAll('.stat-hud-bar');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      /* already handled by CSS .stat-b.cx-in .stat-hud-bar */
      io.unobserve(e.target);
    });
  }, { threshold:.3 });
  bars.forEach(function(b){ io.observe(b); });
})();

/* ── TEXT SCRAMBLE on sec-h2 hover ── */
(function(){
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%';
  document.querySelectorAll('.sec-h2').forEach(function(el){
    el.addEventListener('mouseenter', function(){
      var orig = el.textContent;
      var iter = 0, maxIter = orig.length;
      clearInterval(el._si);
      el._si = setInterval(function(){
        el.textContent = orig.split('').map(function(c, i){
          if(c === ' ') return ' ';
          if(i < iter) return orig[i];
          return chars[Math.floor(Math.random()*chars.length)];
        }).join('');
        if(iter >= maxIter){ clearInterval(el._si); el.textContent = orig; }
        iter += .5;
      }, 28);
    });
  });
})();

/* ── MARQUEE: pause on hover ── */
(function(){
  var tracks = document.querySelectorAll('.marquee-track, .hticker-track');
  tracks.forEach(function(t){
    t.addEventListener('mouseenter', function(){ t.style.animationPlayState='paused'; });
    t.addEventListener('mouseleave', function(){ t.style.animationPlayState='running'; });
  });
})();

/* ── LOGO section: float particles ── */
(function(){
  var logo = document.querySelector('.logo-area');
  if(!logo) return;
  setInterval(function(){
    var p = document.createElement('div');
    p.style.cssText = [
      'position:absolute',
      'left:' + (30+Math.random()*40) + '%',
      'top:' + (30+Math.random()*40) + '%',
      'width:' + (2+Math.random()*4) + 'px',
      'height:' + (2+Math.random()*4) + 'px',
      'border-radius:50%',
      'background:rgba(0,204,255,'+(0.4+Math.random()*.4)+')',
      'box-shadow:0 0 6px rgba(0,204,255,.6)',
      'pointer-events:none',
      'z-index:10',
      'animation:hnode-float '+(2+Math.random()*2)+'s ease-in-out forwards',
    ].join(';');
    logo.style.position = 'relative';
    logo.appendChild(p);
    setTimeout(function(){ p.remove(); }, 3000);
  }, 400);
})();


/* ══════════════════════════════════════════════════
   MAX TECH JS — Full Cinematic Engine
══════════════════════════════════════════════════ */

/* ── 1. MATRIX RAIN (hero bg) ── */
(function(){
  var cv = document.getElementById('matrix-cv');
  if(!cv) return;
  var ctx = cv.getContext('2d'), W, H, cols, drops;
  var chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  function init(){
    W = cv.offsetWidth; H = cv.offsetHeight;
    cv.width = W; cv.height = H;
    cols = Math.floor(W / 14); drops = Array(cols).fill(1);
  }
  window.addEventListener('resize', init); init();
  setInterval(function(){
    ctx.fillStyle = 'rgba(1,3,8,.08)';
    ctx.fillRect(0,0,W,H);
    ctx.font = '11px JetBrains Mono, monospace';
    drops.forEach(function(y,i){
      var c = chars[Math.floor(Math.random()*chars.length)];
      var bright = Math.random() > 0.95;
      ctx.fillStyle = bright ? '#ffffff' : (Math.random()>.3 ? 'rgba(0,204,255,.7)' : 'rgba(0,255,136,.5)');
      ctx.fillText(c, i*14, y*14);
      if(y*14 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);
})();

/* ── 2. CIRCUIT TRACES (hero) ── */
(function(){
  var cv = document.getElementById('circuit-cv');
  if(!cv) return;
  var ctx = cv.getContext('2d'), W, H;
  function resize(){ W=cv.offsetWidth; H=cv.offsetHeight; cv.width=W; cv.height=H; }
  window.addEventListener('resize', resize); resize();
  var traces = [];
  function genTrace(){
    var x = Math.random()*W, y = Math.random()*H;
    var pts = [{x,y}], steps = 4+Math.floor(Math.random()*8);
    for(var i=0;i<steps;i++){
      var dir = Math.floor(Math.random()*4);
      var len = 30+Math.random()*120;
      var lx = pts[pts.length-1].x, ly = pts[pts.length-1].y;
      if(dir===0) pts.push({x:lx+len,y:ly});
      else if(dir===1) pts.push({x:lx-len,y:ly});
      else if(dir===2) pts.push({x:lx,y:ly+len});
      else pts.push({x:lx,y:ly-len});
    }
    return {pts, prog:0, speed:0.008+Math.random()*0.012,
      col:Math.random()<.7?'0,204,255':Math.random()<.5?'255,68,0':'0,255,136',
      w:Math.random()<.3?1.5:.6, life:0, maxLife:1};
  }
  for(var i=0;i<18;i++) traces.push(genTrace());
  function draw(){
    ctx.clearRect(0,0,W,H);
    traces.forEach(function(tr,ti){
      tr.prog = Math.min(tr.prog + tr.speed, 1);
      tr.life += 0.005;
      if(tr.life > tr.maxLife){ traces[ti] = genTrace(); return; }
      var totalLen = 0, lens = [];
      for(var i=1;i<tr.pts.length;i++){
        var dx=tr.pts[i].x-tr.pts[i-1].x, dy=tr.pts[i].y-tr.pts[i-1].y;
        var l = Math.sqrt(dx*dx+dy*dy); lens.push(l); totalLen+=l;
      }
      var drawn = totalLen * tr.prog;
      ctx.beginPath();
      ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
      var rem = drawn;
      for(var i=0;i<lens.length;i++){
        if(rem <= 0) break;
        var seg = Math.min(rem, lens[i]);
        var frac = seg/lens[i];
        var x = tr.pts[i].x + (tr.pts[i+1].x-tr.pts[i].x)*frac;
        var y = tr.pts[i].y + (tr.pts[i+1].y-tr.pts[i].y)*frac;
        ctx.lineTo(x,y); rem -= seg;
      }
      var al = Math.sin(tr.life/tr.maxLife*Math.PI)*0.6;
      ctx.strokeStyle = 'rgba('+tr.col+','+al+')';
      ctx.lineWidth = tr.w; ctx.stroke();
      /* glow dot at front */
      if(tr.prog < 1){
        var rem2 = drawn, gx=tr.pts[0].x, gy=tr.pts[0].y;
        for(var i=0;i<lens.length;i++){
          if(rem2<=0)break;
          var seg=Math.min(rem2,lens[i]), frac=seg/lens[i];
          gx=tr.pts[i].x+(tr.pts[i+1].x-tr.pts[i].x)*frac;
          gy=tr.pts[i].y+(tr.pts[i+1].y-tr.pts[i].y)*frac;
          rem2-=seg;
        }
        ctx.beginPath(); ctx.arc(gx,gy,2.5,0,Math.PI*2);
        ctx.fillStyle='rgba('+tr.col+','+al+')'; ctx.fill();
        var g=ctx.createRadialGradient(gx,gy,0,gx,gy,10);
        g.addColorStop(0,'rgba('+tr.col+','+(al*.6)+')');
        g.addColorStop(1,'rgba('+tr.col+',0)');
        ctx.beginPath(); ctx.arc(gx,gy,10,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
      }
      /* pads at corners */
      tr.pts.forEach(function(p,pi){
        if(pi===0||pi===tr.pts.length-1){
          ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2);
          ctx.fillStyle='rgba('+tr.col+','+(al*.5)+')'; ctx.fill();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 4. BINARY RAIN (global bg) ── */
(function(){
  var cv = document.getElementById('binary-cv');
  if(!cv) return;
  var ctx = cv.getContext('2d'), W=window.innerWidth, H=window.innerHeight;
  cv.width=W; cv.height=H;
  cv.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:.035;';
  var cols = Math.floor(W/18), drops = Array(cols).fill(0).map(()=>Math.random()*H/14);
  window.addEventListener('resize',function(){ W=window.innerWidth;H=window.innerHeight;cv.width=W;cv.height=H; });
  setInterval(function(){
    ctx.fillStyle='rgba(1,3,8,.06)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(0,204,255,.5)'; ctx.font='12px JetBrains Mono,monospace';
    drops.forEach(function(y,i){
      ctx.fillText(Math.random()>.5?'1':'0', i*18, y*14);
      if(y*14>H && Math.random()>.985) drops[i]=0; drops[i]++;
    });
  }, 80);
})();

/* ── 5. HEX GRID (clients section) ── */
(function(){
  var cv = document.getElementById('hex-cv');
  if(!cv) return;
  var sec = cv.parentElement;
  var ctx = cv.getContext('2d'), W, H, t=0;
  function resize(){ W=sec.offsetWidth; H=sec.offsetHeight; cv.width=W; cv.height=H; cv.style.width=W+'px'; cv.style.height=H+'px'; }
  window.addEventListener('resize',resize); resize();
  function hexPath(x,y,r){
    ctx.beginPath();
    for(var i=0;i<6;i++){
      var a=Math.PI/180*(60*i-30);
      i===0?ctx.moveTo(x+r*Math.cos(a),y+r*Math.sin(a)):ctx.lineTo(x+r*Math.cos(a),y+r*Math.sin(a));
    }
    ctx.closePath();
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var r=32, rows=Math.ceil(H/(r*1.73))+2, cols2=Math.ceil(W/(r*2))+2;
    for(var row=0;row<rows;row++){
      for(var col=0;col<cols2;col++){
        var x=col*r*2+(row%2?r:0)-r, y=row*r*1.73-r;
        var dist=Math.sqrt((x-W/2)*(x-W/2)+(y-H/2)*(y-H/2));
        var wave=Math.sin(t*.8+dist*.015)*.5+.5;
        var al=wave*.08;
        hexPath(x,y,r-2);
        ctx.strokeStyle='rgba(0,204,255,'+al+')'; ctx.lineWidth=.6; ctx.stroke();
        if(wave>0.85){ ctx.fillStyle='rgba(0,204,255,.025)'; ctx.fill(); }
      }
    }
    t+=0.04; requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 6. CIRCUIT ABOUT (about section) ── */
(function(){
  var cv = document.getElementById('circuit-about');
  if(!cv) return;
  var sec = cv.parentElement;
  var ctx = cv.getContext('2d'), W, H, t=0;
  function resize(){ W=sec.offsetWidth; H=sec.offsetHeight; cv.width=W; cv.height=H; cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.3;'; }
  window.addEventListener('resize',resize); resize();
  var nodes2 = [];
  for(var i=0;i<20;i++) nodes2.push({x:Math.random()*W,y:Math.random()*H,pulse:Math.random()*Math.PI*2});
  var edges2 = [];
  for(var i=0;i<nodes2.length;i++) for(var j=i+1;j<nodes2.length;j++){
    var dx=nodes2[i].x-nodes2[j].x,dy=nodes2[i].y-nodes2[j].y;
    if(Math.sqrt(dx*dx+dy*dy)<220) edges2.push([i,j]);
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    edges2.forEach(function(e){
      var a=nodes2[e[0]], b=nodes2[e[1]];
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
      ctx.strokeStyle='rgba(0,204,255,.08)'; ctx.lineWidth=.8; ctx.stroke();
    });
    nodes2.forEach(function(n){
      n.pulse+=.03;
      var al=.3+Math.sin(n.pulse)*.2;
      ctx.beginPath(); ctx.arc(n.x,n.y,2.5,0,Math.PI*2);
      ctx.fillStyle='rgba(0,204,255,'+al+')'; ctx.fill();
      /* pulse ring */
      var pr=5+Math.sin(n.pulse)*3;
      ctx.beginPath(); ctx.arc(n.x,n.y,pr,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,204,255,'+(al*.4)+')'; ctx.lineWidth=.5; ctx.stroke();
    });
    t+=.016; requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 7. FOOTER SIGNAL WAVE ── */
(function(){
  var cv = document.getElementById('footer-cv');
  if(!cv) return;
  var ctx = cv.getContext('2d'), W, H=60, t=0;
  function resize(){ W=cv.parentElement.offsetWidth||window.innerWidth; cv.width=W; cv.height=H; cv.style.width=W+'px'; }
  window.addEventListener('resize',resize); resize();
  function draw(){
    ctx.clearRect(0,0,W,H);
    [.6,.35,.2].forEach(function(al,li){
      ctx.beginPath();
      for(var x=0;x<=W;x+=2){
        var y=H/2+Math.sin(x*.015+t+li*.8)*12+Math.sin(x*.03-t*.7)*6;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(0,204,255,'+al+')'; ctx.lineWidth=1.2-li*.3; ctx.stroke();
    });
    t+=.04; requestAnimationFrame(draw);
  }
  draw();
})();

/* ── 8. CLICK BURST PARTICLES ── */
(function(){
  document.addEventListener('click',function(e){
    var burst=document.createElement('div'); burst.className='burst';
    burst.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;';
    var colors=['rgba(0,204,255,1)','rgba(255,68,0,1)','rgba(0,255,136,1)','rgba(255,184,0,1)'];
    for(var i=0;i<16;i++){
      var p=document.createElement('div'); p.className='burst-p';
      var angle=i*(360/16), dist=30+Math.random()*60;
      var tx='translateX('+(Math.cos(angle*Math.PI/180)*dist)+'px)';
      var ty='translateY('+(Math.sin(angle*Math.PI/180)*dist)+'px)';
      p.style.cssText='background:'+colors[Math.floor(Math.random()*colors.length)]+';'
        +'--tx:'+tx+';--ty:'+ty+';'
        +'animation:burst-fly '+(0.4+Math.random()*.3)+'s ease-out forwards;'
        +'width:'+(3+Math.random()*3)+'px;height:'+(3+Math.random()*3)+'px;';
      burst.appendChild(p);
    }
    document.body.appendChild(burst);
    setTimeout(function(){burst.remove();},800);
  });
})();

/* ── 9. 3D TILT on service cards ── */
(function(){
  document.querySelectorAll('.svc-card').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var r=card.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5;
      var y=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(600px) rotateY('+(x*12)+'deg) rotateX('+(-y*8)+'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transform='perspective(600px) rotateY(0) rotateX(0) scale(1)';
      card.style.transition='transform .5s cubic-bezier(.16,1,.3,1)';
    });
    card.addEventListener('mouseenter',function(){card.style.transition='transform .15s ease';});
  });
})();

/* ── 10. 3D TILT on product cards ── */
(function(){
  document.querySelectorAll('.p-card').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var r=card.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5;
      var y=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(800px) rotateY('+(x*8)+'deg) rotateX('+(-y*6)+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transform='perspective(800px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition='transform .5s cubic-bezier(.16,1,.3,1)';
    });
    card.addEventListener('mouseenter',function(){card.style.transition='transform .15s ease';});
  });
})();

/* ── 11. ENHANCED SCROLL REVEALS ── */
(function(){
  var els = document.querySelectorAll('.stat-b,.svc-card,.p-card,.plan-card,.lts-item,.si-feat');
  els.forEach(function(el,i){
    el.classList.add('rev-up');
    el.style.transitionDelay=(i%4)*.1+'s';
  });
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); obs.unobserve(e.target); }});
  },{threshold:.1});
  els.forEach(function(el){ obs.observe(el); });
})();


/* ── SMOOTH SCROLL FIX WITH NAVBAR OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click', function(e){
    var id = this.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if(el){
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({top: top, behavior: 'smooth'});
    }
  });
});


/* ── MATRIX TEXT REVEAL — Hero H1 ── */
(function(){
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  function matrixReveal(el, delay){
    var original = el.textContent.trim();
    setTimeout(function(){
      var frame = 0;
      var totalFrames = original.length * 2;
      var interval = setInterval(function(){
        var result = '';
        for(var i = 0; i < original.length; i++){
          if(original[i] === ' '){ result += ' '; continue; }
          var revealAt = i * 2;
          if(frame >= revealAt + 2){
            result += '<span style="opacity:1">'+original[i]+'</span>';
          } else if(frame >= revealAt){
            result += '<span style="opacity:.6">'+chars[Math.floor(Math.random()*chars.length)]+'</span>';
          } else {
            result += '<span style="opacity:.15">'+chars[Math.floor(Math.random()*chars.length)]+'</span>';
          }
        }
        el.innerHTML = result;
        frame++;
        if(frame > totalFrames + 2){
          el.innerHTML = original;
          clearInterval(interval);
        }
      }, 28);
    }, delay);
  }

  window.addEventListener('load', function(){
    var l1 = document.querySelector('.hero-h1 .l1');
    var l2 = document.querySelector('.hero-h1 .l2');
    var l3 = document.querySelector('.hero-h1 .l3');
    if(l1) matrixReveal(l1, 300);
    if(l2) matrixReveal(l2, 550);
    if(l3) matrixReveal(l3, 800);
  });
})();


/* ── MATRIX REVEAL — Sol Subtitle ── */
(function(){
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  function matrixReveal(el, delay){
    var original = el.textContent.trim();
    setTimeout(function(){
      var frame = 0;
      var totalFrames = original.length * 2;
      var interval = setInterval(function(){
        var result = '';
        for(var i = 0; i < original.length; i++){
          if(original[i] === ' '){ result += ' '; continue; }
          var revealAt = i * 2;
          if(frame >= revealAt + 2){
            result += original[i];
          } else if(frame >= revealAt){
            result += chars[Math.floor(Math.random()*chars.length)];
          } else {
            result += '<span style="opacity:.15">'+chars[Math.floor(Math.random()*chars.length)]+'</span>';
          }
        }
        el.innerHTML = result;
        frame++;
        if(frame > totalFrames + 2){ el.innerHTML = original; clearInterval(interval); }
      }, 28);
    }, delay);
  }

  /* Trigger on scroll into view */
  var el = document.getElementById('sol-subtitle-text');
  if(!el) return;
  var triggered = false;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && !triggered){
        triggered = true;
        matrixReveal(el, 200);
      }
    });
  }, {threshold:.3});
  obs.observe(el);
})();


/* ── MATRIX REVEAL — All sec-kickers ── */
(function(){
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&◈·';
  function matrixReveal(el){
    var original = el.textContent.trim();
    var frame = 0;
    var totalFrames = original.length * 2;
    var interval = setInterval(function(){
      var result = '';
      for(var i = 0; i < original.length; i++){
        if(original[i] === ' '){ result += ' '; continue; }
        var revealAt = i * 2;
        if(frame >= revealAt + 2){
          result += original[i];
        } else if(frame >= revealAt){
          result += chars[Math.floor(Math.random()*chars.length)];
        } else {
          result += '<span style="opacity:.2">'+chars[Math.floor(Math.random()*chars.length)]+'</span>';
        }
      }
      el.innerHTML = result;
      frame++;
      if(frame > totalFrames + 2){ el.innerHTML = original; clearInterval(interval); }
    }, 30);
  }

  document.querySelectorAll('.sec-kicker').forEach(function(el){
    var triggered = false;
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting && !triggered){
          triggered = true;
          matrixReveal(el);
        }
      });
    }, {threshold:.5});
    obs.observe(el);
  });
})();


/* ══ BUSINESS DEMO INTERACTIVE ══ */
(function(){

  var CATS = {
    varejo:      { keys: ['mercado','loja','calcados','eletro','papelaria','pet'] },
    alimentacao: { keys: ['pastelaria','padaria','lanchonete','pizzaria','sorveteria','restaurante'] },
    servicos:    { keys: ['barbearia','salao','oficina','lavanderia','academia','clinica'] },
    saude:       { keys: ['farmacia','otica','dentista','nutricao','laboratorio','veterinario'] },
  };

  var NAMES = {
    mercado:'Mercado',loja:'Loja Roupas',calcados:'Calçados',eletro:'Eletrônicos',papelaria:'Papelaria',pet:'Pet Shop',
    pastelaria:'Pastelaria',padaria:'Padaria',lanchonete:'Lanchonete',pizzaria:'Pizzaria',sorveteria:'Sorveteria',restaurante:'Restaurante',
    barbearia:'Barbearia',salao:'Salão',oficina:'Oficina',lavanderia:'Lavanderia',academia:'Academia',clinica:'Clínica',
    farmacia:'Farmácia',otica:'Ótica',dentista:'Dentista',nutricao:'Nutrição',laboratorio:'Laboratório',veterinario:'Veterinário'
  };

  var DATA = {
    mercado:     { icon:'🛒', tabela:'TABELA: 1 - Preço Varejo', items:'005', total:'63,40', unit:'9,50', item:'9,50',
      prods:[['COCA-COLA 2L','2','9,50','19,00'],['ARROZ TRAD. 5KG','1','28,00','28,00'],['FEIJÃO CARIOCA 1KG','1','8,50','8,50'],['PAO FATIADO 500G','1','7,90','7,90'],['AGUA MINERAL 500ML','4','2,80','11,20']],
      tags:['NFC-e automática','Balança integrada','Estoque em tempo real','Múltiplos caixas'] },
    loja:        { icon:'👗', tabela:'TABELA: 1 - Preço Varejo', items:'003', total:'284,00', unit:'89,00', item:'89,00',
      prods:[['CAMISETA M P/B','1','89,00','89,00'],['CALCA JEANS 42','1','159,00','159,00'],['CINTO COURO PRET','1','36,00','36,00']],
      tags:['Grade cor/tamanho','Código de barras','Troca e devolução'] },
    calcados:    { icon:'👟', tabela:'TABELA: 1 - Preço Varejo', items:'002', total:'318,00', unit:'249,00', item:'249,00',
      prods:[['NIKE AIR MAX 42','1','249,00','249,00'],['MEIA ESPORTIVA X3','3','23,00','69,00']],
      tags:['Controle de grade','Par de estoque','Código de barras'] },
    eletro:      { icon:'⚡', tabela:'TABELA: 1 - Preço Varejo', items:'003', total:'497,00', unit:'349,00', item:'349,00',
      prods:[['FONE JBL TUNE 520','1','349,00','349,00'],['CABO HDMI 4K 3M','1','59,00','59,00'],['CARREGADOR 65W GAN','1','89,00','89,00']],
      tags:['Controle IMEI/Série','NF-e produto','Garantia digital'] },
    papelaria:   { icon:'📓', tabela:'TABELA: 1 - Preço Escolar', items:'006', total:'47,80', unit:'18,00', item:'36,00',
      prods:[['CADERNO 200FLS','2','18,00','36,00'],['CANETA BIC X12','1','7,80','7,80'],['LAPIS HB X6','2','2,00','4,00']],
      tags:['Lista escolar','Controle de lote','Estoque mínimo'] },
    pet:         { icon:'🐾', tabela:'TABELA: 1 - Preço Varejo', items:'003', total:'124,00', unit:'89,00', item:'89,00',
      prods:[['RACAO GOLDEN 15KG','1','89,00','89,00'],['ANTIPULGAS FRONTL.','1','28,00','28,00'],['AREIA SANIT. 4KG','1','7,00','7,00']],
      tags:['Agendamento banho/tosa','Histórico do pet','Cartão fidelidade'] },
    pastelaria:  { icon:'🥟', tabela:'TABELA: 1 - MESA 05', items:'004', total:'38,00', unit:'8,00', item:'16,00',
      prods:[['PASTEL DE CARNE','2','8,00','16,00'],['PASTEL DE QUEIJO','1','7,00','7,00'],['SUCO DE LARANJA','1','8,00','8,00'],['CALDO DE CANA','1','7,00','7,00']],
      tags:['Controle por mesa','Delivery integrado','Comanda digital'] },
    padaria:     { icon:'🥖', tabela:'TABELA: 1 - BALCAO 01', items:'005', total:'29,50', unit:'6,50', item:'6,50',
      prods:[['PAO FRANCES 500G','1','6,50','6,50'],['BOLO CHOCOLATE','1','12,00','12,00'],['CAFE COM LEITE','2','5,00','10,00'],['SONHO RECHEADO','1','1,00','1,00']],
      tags:['Controle de fornada','Validade automática','Relatório diário'] },
    lanchonete:  { icon:'🍔', tabela:'TABELA: 1 - BALCAO', items:'004', total:'58,00', unit:'20,00', item:'40,00',
      prods:[['X-BURGUER DUPLO','2','20,00','40,00'],['BATATA FRITA G','1','12,00','12,00'],['COCA 600ML','1','6,00','6,00']],
      tags:['Combo/Promoção','Controle de ficha','Delivery'] },
    pizzaria:    { icon:'🍕', tabela:'TABELA: 1 - MESA 03', items:'002', total:'124,00', unit:'62,00', item:'62,00',
      prods:[['PIZZA MARGHERITA G','1','62,00','62,00'],['PIZZA FRANGO CAT G','1','68,00','68,00']],
      tags:['Controle de mesas','Delivery iFood','Split por sabor'] },
    sorveteria:  { icon:'🍦', tabela:'TABELA: 1 - Preço Varejo', items:'004', total:'42,00', unit:'7,00', item:'14,00',
      prods:[['CASQUINHA 2 BOLAS','2','7,00','14,00'],['ACAI 500ML','1','22,00','22,00'],['PICOLE RECHEADO','3','5,00','15,00']],
      tags:['Controle por sabor','Validade produção','Cartão fidelidade'] },
    restaurante: { icon:'🍽️', tabela:'TABELA: 1 - COMANDA', items:'003', total:'286,00', unit:'78,00', item:'156,00',
      prods:[['FILE MIGNON 300G','2','78,00','156,00'],['SALMAO GRELHADO','1','89,00','89,00'],['VINHO TINTO 750ML','1','89,00','89,00']],
      tags:['Comanda digital','Controle de mesas','Split de conta'] },
    barbearia:   { icon:'✂️', tabela:'TABELA: 1 - SERVICOS', items:'003', total:'97,00', unit:'55,00', item:'55,00',
      prods:[['CORTE + BARBA','1','55,00','55,00'],['HIDRATACAO CAPILAR','1','35,00','35,00'],['POMADA FINALIZ.','1','29,00','29,00']],
      tags:['Agenda online','Histórico do cliente','Comissão do profissional'] },
    salao:       { icon:'💇', tabela:'TABELA: 1 - SERVICOS', items:'003', total:'218,00', unit:'120,00', item:'120,00',
      prods:[['COLORACAO + HIDRAT','1','120,00','120,00'],['MANICURE + PEDICURE','1','70,00','70,00'],['ESCOVA PROGRESSIVA','1','28,00','28,00']],
      tags:['Agenda online','Foto antes/depois','Comissão automática'] },
    oficina:     { icon:'🔧', tabela:'TABELA: 1 - ORDEM SERVICO', items:'003', total:'487,00', unit:'320,00', item:'320,00',
      prods:[['REVISAO 10.000KM','1','320,00','320,00'],['TROCA PASTILHA FREIO','1','89,00','89,00'],['FLUIDO DE FREIO','2','39,00','78,00']],
      tags:['Ordem de serviço','Controle de peças','Histórico do veículo'] },
    lavanderia:  { icon:'👔', tabela:'TABELA: 1 - SERVICOS', items:'003', total:'86,00', unit:'45,00', item:'45,00',
      prods:[['TERNO COMPLETO','1','45,00','45,00'],['CAMISA SOCIAL X3','3','13,00','39,00'],['TENIS LIMPEZA','1','29,00','29,00']],
      tags:['Prazo de entrega','SMS automático','Etiqueta de peça'] },
    academia:    { icon:'🏋️', tabela:'TABELA: 1 - PLANOS', items:'001', total:'120,00', unit:'120,00', item:'120,00',
      prods:[['PLANO MENSAL','1','120,00','120,00'],['AVALIACAO FISICA','1','50,00','50,00'],['PERSONAL 4X/SEM','1','280,00','280,00']],
      tags:['Controle de acesso','Frequência automática','Renovação online'] },
    clinica:     { icon:'🏥', tabela:'TABELA: 1 - CONSULTAS', items:'002', total:'320,00', unit:'200,00', item:'200,00',
      prods:[['CONSULTA CLINICA','1','200,00','200,00'],['ELETROCARDIOGRAMA','1','120,00','120,00']],
      tags:['Prontuário eletrônico','Agenda online','Convênio/particular'] },
    farmacia:    { icon:'💊', tabela:'TABELA: 1 - SNGPC', items:'003', total:'87,90', unit:'12,90', item:'12,90',
      prods:[['DIPIRONA 500MG C/10','1','12,90','12,90'],['VITAMINA C 1G C/30','1','28,00','28,00'],['PROTETOR SOLAR FPS50','1','47,00','47,00']],
      tags:['SNGPC automático','Controle lote/validade','Receituário digital'] },
    otica:       { icon:'👓', tabela:'TABELA: 1 - OTICA', items:'002', total:'890,00', unit:'590,00', item:'590,00',
      prods:[['ARMACAO RAY-BAN','1','590,00','590,00'],['LENTE ANTI-REFLEXO','2','150,00','300,00']],
      tags:['OS de lentes','Histórico de receita','Prazo de entrega'] },
    dentista:    { icon:'🦷', tabela:'TABELA: 1 - ODONTO', items:'002', total:'800,00', unit:'300,00', item:'300,00',
      prods:[['LIMPEZA + APLICACAO','1','300,00','300,00'],['RESTAURACAO RESINA','1','500,00','500,00']],
      tags:['Prontuário + Rx digital','Agenda online','Convênio automático'] },
    nutricao:    { icon:'🥗', tabela:'TABELA: 1 - CONSULTAS', items:'003', total:'300,00', unit:'300,00', item:'300,00',
      prods:[['CONSULTA INICIAL','1','300,00','300,00'],['PLANO ALIMENTAR','1','150,00','150,00'],['RETORNO 30 DIAS','1','200,00','200,00']],
      tags:['Plano alimentar digital','Evolução de peso','Retorno automático'] },
    laboratorio: { icon:'🔬', tabela:'TABELA: 1 - EXAMES', items:'004', total:'320,00', unit:'80,00', item:'80,00',
      prods:[['HEMOGRAMA COMPLETO','1','80,00','80,00'],['GLICEMIA DE JEJUM','1','40,00','40,00'],['TSH + T4 LIVRE','1','120,00','120,00'],['PCR QUANTITATIVO','1','80,00','80,00']],
      tags:['Laudo digital','WhatsApp automático','Integração médica'] },
    veterinario: { icon:'🐾', tabela:'TABELA: 1 - VETERINARIO', items:'003', total:'248,00', unit:'150,00', item:'150,00',
      prods:[['CONSULTA VETERIN.','1','150,00','150,00'],['VACINA V10','1','68,00','68,00'],['VERMIFUGO 10KG','1','30,00','30,00']],
      tags:['Prontuário animal','Carteira de vacinação','Lembretes automáticos'] },
  };

  var currentCat = 'varejo';
  var currentBiz = 'mercado';
  var autoCycle = true;
  var bizKeys = [];

  // Live clock
  function updateClock(){
    var now = new Date();
    var d = String(now.getDate()).padStart(2,'0');
    var m = String(now.getMonth()+1).padStart(2,'0');
    var y = String(now.getFullYear()).slice(2);
    var h = String(now.getHours()).padStart(2,'0');
    var min = String(now.getMinutes()).padStart(2,'0');
    var el = document.getElementById('biz-clock');
    if(el) el.textContent = d+'/'+m+'/'+y+' '+h+':'+min;
  }
  updateClock();
  setInterval(updateClock, 10000);

  function renderBiz(key){
    var d = DATA[key]; if(!d) return;
    currentBiz = key;
    var body = document.querySelector('.biz-screen-body');
    if(body) body.classList.add('switching');
    setTimeout(function(){
      var el = function(id){ return document.getElementById(id); };
      var name = NAMES[key] || key;
      // sysbar
      if(el('biz-tabela')) el('biz-tabela').textContent = d.tabela;
      if(el('biz-pdv-biz-name')) el('biz-pdv-biz-name').textContent = d.icon + ' ' + name.toUpperCase();
      if(el('biz-sysbar-left')) el('biz-sysbar-left').textContent = 'CAIXA: 100/ABERTURA: 7 — USUÁRIO: lucas@powertec';
      // bottom
      if(el('biz-items')) el('biz-items').textContent = d.items;
      if(el('biz-total')) el('biz-total').textContent = d.total;
      if(el('biz-unit-val')) el('biz-unit-val').textContent = d.unit;
      if(el('biz-item-val')) el('biz-item-val').textContent = d.item;
      // footer
      if(el('biz-pressione')) el('biz-pressione').textContent = 'PRESSIONE UMA TECLA VÁLIDA';
      // products
      var list = el('biz-prod-list');
      if(list){
        list.innerHTML = '';
        d.prods.forEach(function(p, i){
          var row = document.createElement('div');
          row.className = 'biz-pdv-prod-item';
          row.style.animationDelay = (i*0.05)+'s';
          row.innerHTML = '<span class="biz-pdv-prod-name">'+p[0]+'</span><span>'+p[1]+'</span><span>'+p[2]+'</span><span>'+p[3]+'</span>';
          list.appendChild(row);
        });
      }
      // tags
      var tags = el('biz-tags');
      if(tags){
        tags.innerHTML = '';
        d.tags.forEach(function(tag){
          var s = document.createElement('span');
          s.className = 'biz-tag'; s.textContent = tag;
          tags.appendChild(s);
        });
      }
      // whatsapp
      var wb = el('biz-whats-btn');
      if(wb){
        wb.onclick = function(){
          window.open('https://wa.me/13?text=Olá!%20Vi%20o%20demo%20de%20'+encodeURIComponent(name)+'%20no%20site%20e%20quero%20saber%20mais!','_blank');
        };
      }
      if(body) body.classList.remove('switching');
    }, 120);
  }

  function renderChips(cat){
    var chips = document.getElementById('biz-chips');
    if(!chips) return;
    chips.innerHTML = '';
    bizKeys = CATS[cat] ? CATS[cat].keys : [];
    bizKeys.forEach(function(k, idx){
      var d = DATA[k]; if(!d) return;
      var btn = document.createElement('button');
      btn.className = 'biz-chip' + (idx===0?' active':'');
      btn.setAttribute('data-biz', k);
      btn.setAttribute('aria-pressed', idx===0?'true':'false');
      btn.textContent = d.icon + ' ' + (NAMES[k]||k);
      btn.addEventListener('click', function(){
        document.querySelectorAll('.biz-chip').forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
        btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
        autoCycle = false;
        renderBiz(k);
        setTimeout(function(){ autoCycle = true; }, 8000);
      });
      chips.appendChild(btn);
    });
    if(bizKeys.length > 0){ renderBiz(bizKeys[0]); }
  }

  document.querySelectorAll('.biz-cat-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      document.querySelectorAll('.biz-cat-tab').forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-pressed','false'); });
      tab.classList.add('active'); tab.setAttribute('aria-pressed','true');
      currentCat = tab.getAttribute('data-cat');
      renderChips(currentCat);
    });
  });

  renderChips('varejo');

  document.querySelector('.biz-demo').addEventListener('mouseenter', function(){ autoCycle = false; });
  document.querySelector('.biz-demo').addEventListener('mouseleave', function(){ autoCycle = true; });

  setInterval(function(){
    if(!autoCycle || bizKeys.length === 0) return;
    var idx = bizKeys.indexOf(currentBiz);
    var nextIdx = (idx + 1) % bizKeys.length;
    if(nextIdx === 0){
      var cats = Object.keys(CATS);
      var catIdx = cats.indexOf(currentCat);
      currentCat = cats[(catIdx+1) % cats.length];
      document.querySelectorAll('.biz-cat-tab').forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-pressed','false'); });
      var activeTab = document.querySelector('.biz-cat-tab[data-cat="'+currentCat+'"]');
      if(activeTab){ activeTab.classList.add('active'); activeTab.setAttribute('aria-pressed','true'); }
      renderChips(currentCat);
      return;
    }
    var nextKey = bizKeys[nextIdx];
    document.querySelectorAll('.biz-chip').forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    var activeChip = document.querySelector('.biz-chip[data-biz="'+nextKey+'"]');
    if(activeChip){ activeChip.classList.add('active'); activeChip.setAttribute('aria-pressed','true'); }
    renderBiz(nextKey);
  }, 3500);

})();



/* ════════════════════════════════ */

/* ── DROPDOWN NAV — hover preciso, sem falso trigger ── */
(function(){
  var wrap     = document.querySelector('.nav-dropdown-wrap');
  if(!wrap) return;
  var dropdown = wrap.querySelector('.nav-dropdown');
  var timer    = null;
  var open     = false;

  function showDrop(){
    clearTimeout(timer);
    if(open) return;
    open = true;
    wrap.classList.add('dd-open');
    dropdown.style.opacity      = '1';
    dropdown.style.pointerEvents= 'all';
    dropdown.style.transform    = 'translateX(-50%) translateY(0)';
  }

  function hideDrop(delay){
    clearTimeout(timer);
    timer = setTimeout(function(){
      open = false;
      wrap.classList.remove('dd-open');
      dropdown.style.opacity      = '0';
      dropdown.style.pointerEvents= 'none';
      dropdown.style.transform    = 'translateX(-50%) translateY(8px)';
    }, delay || 200);
  }

  /* Only track mousemove while dropdown is open or mouse is inside wrap */
  document.addEventListener('mousemove', function(e){
    var wr = wrap.getBoundingClientRect();
    var dr = dropdown.getBoundingClientRect();

    /* Strictly inside the nav trigger link area */
    var overWrap = e.clientX >= wr.left && e.clientX <= wr.right &&
                   e.clientY >= wr.top  && e.clientY <= wr.bottom;

    /* Strictly inside the dropdown panel (no padding) */
    var overDrop = open &&
                   e.clientX >= dr.left && e.clientX <= dr.right &&
                   e.clientY >= dr.top  && e.clientY <= dr.bottom;

    if(overWrap || overDrop){
      showDrop();
    } else if(open){
      hideDrop(200);
    }
  });

  /* Close on click outside */
  document.addEventListener('click', function(e){
    if(!wrap.contains(e.target)) hideDrop(0);
  });

  /* Keyboard close */
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') hideDrop(0);
  });
})();

/* ════════════════════════════════ */

/* ── MOBILE NAV ── */
(function(){
  var btn=document.querySelector('.nav-hamburger');
  var drawer=document.querySelector('.nav-mobile-drawer');
  var nav=document.querySelector('nav');
  if(!btn||!drawer) return;
  function check(){
    if(window.innerWidth<=768){btn.style.display='flex';}
    else{btn.style.display='none';btn.classList.remove('open');drawer.classList.remove('open');drawer.style.display='';document.body.style.overflow='';}
  }
  check(); window.addEventListener('resize',check);
  btn.addEventListener('click',function(){
    btn.classList.toggle('open');
    drawer.classList.toggle('open');
    var isOpen=drawer.classList.contains('open');
    btn.setAttribute('aria-expanded',isOpen?'true':'false');
    document.body.style.overflow=isOpen?'hidden':'';
  });
  drawer.querySelectorAll('a:not(.mob-dd-toggle)').forEach(function(a){
    a.addEventListener('click',function(){btn.classList.remove('open');btn.setAttribute('aria-expanded','false');drawer.classList.remove('open');document.body.style.overflow='';});
  });
  var mobToggle=document.getElementById('mob-serv-toggle');
  var mobSub=document.getElementById('mob-serv-sub');
  if(mobToggle&&mobSub){
    mobToggle.addEventListener('click',function(e){
      e.stopPropagation();
      mobToggle.classList.toggle('open');
      mobSub.classList.toggle('open');
      mobToggle.setAttribute('aria-expanded',mobToggle.classList.contains('open')?'true':'false');
    });
  }
  document.addEventListener('click',function(e){
    if(nav&&!nav.contains(e.target)&&!drawer.contains(e.target)){btn.classList.remove('open');btn.setAttribute('aria-expanded','false');drawer.classList.remove('open');document.body.style.overflow='';}
  });
})();

/* ════════════════════════════════ */

/* ── WHATSAPP FLOAT BEHAVIOR ── */
(function(){
  var bubble  = document.getElementById('wpp-bubble');
  var btn     = document.getElementById('wpp-btn-main');
  var shown   = false;
  var closed  = false;

  if(!bubble || !btn) return;

  /* Show bubble after 4s on first visit */
  setTimeout(function(){
    if(!closed){ bubble.classList.add('show'); shown = true; }
  }, 4000);

  /* Hide bubble after 8s */
  setTimeout(function(){
    bubble.classList.remove('show');
  }, 12000);

  /* Toggle bubble on btn hover (desktop) */
  btn.addEventListener('mouseenter', function(){
    if(!closed) bubble.classList.add('show');
  });
  btn.addEventListener('mouseleave', function(){
    setTimeout(function(){
      if(!document.getElementById('wpp-float').matches(':hover')){
        bubble.classList.remove('show');
      }
    }, 400);
  });

  /* Click bubble to open WPP */
  bubble.addEventListener('click', function(){
    window.open(btn.href, '_blank');
  });

  /* Scroll: show button after 300px */
  var floatEl = document.getElementById('wpp-float');
  floatEl.style.opacity = '0';
  floatEl.style.transform = 'translateY(20px)';
  floatEl.style.transition = 'opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1)';
  window.addEventListener('scroll', function(){
    if(window.scrollY > 300){
      floatEl.style.opacity = '1';
      floatEl.style.transform = 'translateY(0)';
    } else {
      floatEl.style.opacity = '0';
      floatEl.style.transform = 'translateY(20px)';
    }
  }, {passive:true});
})();

/* ════════════════════════════════ */

/* ── FORMULÁRIO DE CONTATO → WHATSAPP ── */
(function(){
  var form = document.getElementById('contato-form');
  if(!form) return;

  /* Máscara telefone */
  var telInput = document.getElementById('cf-tel');
  if(telInput){
    telInput.addEventListener('input', function(){
      var v = this.value.replace(/\D/g,'').slice(0,11);
      if(v.length <= 2)       this.value = v.length ? '('+v : '';
      else if(v.length <= 6)  this.value = '('+v.slice(0,2)+') '+v.slice(2);
      else if(v.length <= 10) this.value = '('+v.slice(0,2)+') '+v.slice(2,6)+'-'+v.slice(6);
      else                    this.value = '('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var nome    = document.getElementById('cf-nome').value.trim();
    var tel     = document.getElementById('cf-tel').value.trim();
    var email   = document.getElementById('cf-email').value.trim();
    var servico = document.getElementById('cf-servico').value;
    var msg     = document.getElementById('cf-msg').value.trim();
    var errEl   = document.getElementById('cf-error');
    var okEl    = document.getElementById('cf-success');

    errEl.classList.remove('show');
    okEl.classList.remove('show');

    if(!nome || !tel || !servico){
      errEl.classList.add('show');
      return;
    }

    var servicoMap = {
      pdv:    'PDV & Automação Comercial',
      cftv:   'Câmeras & CFTV',
      alarme: 'Alarmes & Sensores',
      acesso: 'Controle de Acesso',
      rede:   'Redes & Infraestrutura',
      erp:    'ERP & Gestão',
      outro:  'Outro / Dúvida geral'
    };

    var texto = '🔧 *Solicitação de Orçamento — PowerTec*\n\n'
      + '👤 *Nome:* ' + nome + '\n'
      + '📱 *Telefone:* ' + tel + '\n'
      + (email ? '✉️ *E-mail:* ' + email + '\n' : '')
      + '🛠 *Serviço:* ' + (servicoMap[servico] || servico) + '\n'
      + (msg ? '💬 *Mensagem:* ' + msg : '');

    var url = 'https://wa.me/5513981916256?text=' + encodeURIComponent(texto);
    window.open(url, '_blank');
    okEl.classList.add('show');
    form.reset();
  });
})();

/* ════════════════════════════════ */


/* ════════════════════════════════ */

/* ── DEMO PAGE FORM ── */
(function(){
  var form    = document.getElementById('demo-page-form');
  var success = document.getElementById('demo-success');
  var body    = document.getElementById('demo-form-body');
  if(!form) return;

  /* Phone mask */
  var tel = document.getElementById('dp-tel');
  if(tel){
    tel.addEventListener('input', function(){
      var v = this.value.replace(/\D/g,'').slice(0,11);
      if(v.length <= 2)       this.value = v.length ? '('+v : '';
      else if(v.length <= 6)  this.value = '('+v.slice(0,2)+') '+v.slice(2);
      else if(v.length <= 10) this.value = '('+v.slice(0,2)+') '+v.slice(2,6)+'-'+v.slice(6);
      else                    this.value = '('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
    });
  }

  /* Steps highlight on focus */
  var fields = [
    { el: document.getElementById('dp-nome'),  step: 1 },
    { el: document.getElementById('dp-email'), step: 2 },
    { el: document.getElementById('dp-tel'),   step: 3 },
  ];
  function setStep(n){
    for(var i=1;i<=4;i++){
      var s = document.getElementById('ds-'+i);
      if(!s) continue;
      s.classList.remove('active','done');
      if(i < n) s.classList.add('done');
      else if(i === n) s.classList.add('active');
    }
  }
  fields.forEach(function(f){
    if(f.el) f.el.addEventListener('focus', function(){ setStep(f.step); });
  });

  /* Submit */
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var nome  = document.getElementById('dp-nome').value.trim();
    var email = document.getElementById('dp-email').value.trim();
    var fone  = document.getElementById('dp-tel').value.trim();
    var seg   = document.getElementById('dp-seg').value.trim();

    /* Validate */
    var ok = true;
    [document.getElementById('dp-nome'), document.getElementById('dp-email'), document.getElementById('dp-tel')].forEach(function(el){
      if(!el.value.trim()){ el.classList.add('error'); ok = false; }
      else el.classList.remove('error');
    });
    if(!ok) return;

    /* Show success */
    setStep(4);
    setTimeout(function(){
      form.style.display = 'none';
      document.querySelector('.demo-privacy').style.display = 'none';
      success.classList.add('show');
    }, 300);

    /* Send to WhatsApp */
    var msg = '🎯 *SOLICITAÇÃO DE DEMO GRATUITA — SITE*\n\n'
      + '👤 *Nome:* ' + nome + '\n'
      + '✉️ *E-mail:* ' + email + '\n'
      + '📱 *WhatsApp:* ' + fone + '\n'
      + (seg ? '🏪 *Segmento:* ' + seg + '\n' : '')
      + '\n⏰ ' + new Date().toLocaleString('pt-BR');
    window.open('https://wa.me/5513981916256?text=' + encodeURIComponent(msg), '_blank');
  });
})();

/* ════════════════════════════════ */

/* ══ FORM DEPOIMENTO — REDESIGN ══ */
(function(){
  var sel = 0;
  var captions = ['','Muito ruim 😞','Ruim 😐','Regular 🙂','Bom 😊','Excelente! 🤩'];
  var stars = document.querySelectorAll('.dsi-star');
  if(!stars.length) return;

  /* ── Steps helper ── */
  function setStep(n){
    document.querySelectorAll('.dform-step').forEach(function(s){
      var v = +s.dataset.step;
      s.classList.remove('active','done');
      if(v < n)       s.classList.add('done');
      else if(v === n) s.classList.add('active');
    });
  }

  /* ── Stars ── */
  stars.forEach(function(s){
    s.addEventListener('mouseenter',function(){
      var v = +s.dataset.v;
      stars.forEach(function(x){ x.classList.toggle('hover', +x.dataset.v <= v); });
      document.getElementById('star-text').textContent = captions[v];
    });
    s.addEventListener('mouseleave',function(){
      stars.forEach(function(x){ x.classList.remove('hover'); });
      var cap = document.getElementById('star-text');
      cap.textContent = sel ? captions[sel] : 'Toque para avaliar';
      cap.className = 'dform-star-caption' + (sel ? ' rated' : '');
    });
    s.addEventListener('click',function(){
      sel = +s.dataset.v;
      stars.forEach(function(x){ var on=+x.dataset.v<=sel; x.classList.toggle('active',on); x.setAttribute('aria-pressed',on?'true':'false'); });
      var cap = document.getElementById('star-text');
      cap.textContent = captions[sel];
      cap.classList.add('rated');
      updatePreviewStars();
      setStep(2);
    });
  });

  function updatePreviewStars(){
    var el = document.getElementById('prev-stars');
    if(!el) return;
    el.textContent = '★'.repeat(sel) + '☆'.repeat(5-sel);
    el.className = 'dpc-stars' + (sel ? ' rated' : '');
  }

  /* ── Live preview ── */
  function liveInput(inId, outId, transform, step){
    var inp = document.getElementById(inId);
    var out = document.getElementById(outId);
    if(!inp||!out) return;
    inp.addEventListener('input',function(){
      var v = this.value.trim();
      out.textContent = transform ? transform(v) : (v || out.dataset.ph);
      if(step) setStep(step);
      /* valid indicator */
      if(v.length >= 2) inp.classList.add('valid');
      else inp.classList.remove('valid');
    });
    out.dataset.ph = out.textContent;
  }

  liveInput('dp-nome2', 'prev-nome', function(v){
    var el = document.getElementById('prev-nome');
    el.className = 'dpc-name' + (v ? ' live' : '');
    /* initials */
    var words = v.split(' ').filter(Boolean);
    var init = words.length>=2 ? words[0][0]+words[1][0] : (words[0]?words[0].slice(0,2):'?');
    var av = document.getElementById('prev-avatar');
    if(av) av.textContent = init.toUpperCase();
    return v || 'Seu nome';
  }, null, 2);

  liveInput('dp-empresa', 'prev-empresa', function(v){
    var el = document.getElementById('prev-empresa');
    el.style.display = v ? '' : 'none';
    /* badge */
    var badge = document.getElementById('prev-badge');
    if(badge){ badge.style.display = v ? '' : 'none'; badge.textContent = v; }
    return v || '';
  });

  liveInput('dp-cidade', 'prev-cidade', function(v){
    return v ? '📍 ' + v : '📍 Sua cidade';
  });

  /* service select updates badge */
  var selEl = document.getElementById('dp-servico2');
  if(selEl){
    selEl.addEventListener('change',function(){
      var badge = document.getElementById('prev-badge');
      if(badge && this.value){ badge.textContent = this.value; badge.style.display = ''; }
    });
  }

  /* textarea */
  var ta = document.getElementById('dp-texto');
  var prevText = document.getElementById('prev-text');
  if(ta){
    ta.addEventListener('input',function(){
      var v = this.value;
      var pct = (v.length/400)*100;
      var fill = document.getElementById('dp-charbar');
      var cnt  = document.getElementById('dp-chars');
      if(fill) fill.style.width = pct+'%';
      if(cnt)  cnt.textContent = v.length;
      if(v.length > 350 && fill) fill.style.background = 'var(--o)';
      else if(fill) fill.style.background = '';
      if(prevText){
        prevText.textContent = v || 'Seu depoimento aparecerá aqui enquanto você digita…';
        prevText.className = 'dpc-text' + (v ? ' live' : '');
      }
      if(v.length > 10) setStep(3);
    });
  }

  /* ── SUBMIT ── */
  var btn = document.getElementById('depoi-submit-btn');
  if(btn){
    btn.addEventListener('click',function(){
      var nome   = (document.getElementById('dp-nome2')||{}).value||'';
      var cidade = (document.getElementById('dp-cidade')||{}).value||'';
      var emp    = (document.getElementById('dp-empresa')||{}).value||'';
      var serv   = (document.getElementById('dp-servico2')||{}).value||'';
      var texto  = (document.getElementById('dp-texto')||{}).value||'';

      nome = nome.trim(); texto = texto.trim();

      var erros = [];
      if(!sel)         erros.push('avaliação em estrelas');
      if(!nome)        erros.push('seu nome');
      if(!texto)       erros.push('seu depoimento');

      if(erros.length){
        alert('⚠ Por favor preencha: ' + erros.join(', '));
        return;
      }

      var starsStr = '★'.repeat(sel)+'☆'.repeat(5-sel);
      var msg = '⭐ *NOVO DEPOIMENTO — Site PowerTec*\n\n'
        + starsStr + ' ('+sel+'/5)\n\n'
        + '👤 *Nome:* ' + nome + '\n'
        + (emp   ? '🏪 *Negócio:* ' + emp + '\n'   : '')
        + (cidade? '📍 *Cidade:* '  + cidade + '\n' : '')
        + (serv  ? '🛠 *Serviço:* ' + serv + '\n'  : '')
        + '\n💬 *Depoimento:*\n"' + texto + '"\n\n'
        + '⏰ ' + new Date().toLocaleString('pt-BR');

      var url = 'https://wa.me/5513981916256?text=' + encodeURIComponent(msg);

      /* show success */
      var body = document.querySelector('.dform-body');
      if(body) body.style.display = 'none';
      var succ = document.getElementById('depoi-success');
      if(succ) succ.classList.add('show');
      var wl = document.getElementById('dfs-wpp-link');
      if(wl) wl.href = url;
      setStep(4);

      window.open(url, '_blank');
    });
  }

})();

/* ════════════════════════════════ */

(function(){

  /* ── STICKY BOTTOM BAR (mobile) ── */
  var stickyBar = document.getElementById('sticky-bar');
  var sbClose   = document.getElementById('sb-close');
  var sbShown   = false;

  if(stickyBar){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 400 && !sbShown){
        sbShown = true;
        stickyBar.classList.add('show');
      }
    }, {passive:true});

    if(sbClose){
      sbClose.addEventListener('click', function(){
        stickyBar.classList.remove('show');
        try{ sessionStorage.setItem('sb_dismissed','1'); }catch(e){}
      });
    }

    /* Don't show if dismissed */
    try{
      if(sessionStorage.getItem('sb_dismissed')){
        sbShown = true; /* won't re-trigger */
      }
    }catch(e){}
  }

  /* ── PLAN BUTTONS — add pulse animation to highlight ── */
  document.querySelectorAll('.plan-card.highlight .plan-btn').forEach(function(btn){
    btn.style.animation = 'plan-cta-pulse 2.5s ease-in-out infinite';
  });

  /* ── HERO CTA — scroll-triggered glow ── */
  var heroCta = document.querySelector('.btn-main');
  if(heroCta){
    heroCta.addEventListener('mouseenter', function(){
      this.style.transform = 'translateY(-4px) scale(1.03)';
    });
    heroCta.addEventListener('mouseleave', function(){
      this.style.transform = '';
    });
  }

})();

/* ════════════════════════════════ */

/* FEATURES JS */
(function(){

  /* FAQ */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });

  /* Agendamento */
  var agdTel = document.getElementById('agd-tel');
  if(agdTel){
    agdTel.addEventListener('input', function(){
      var v = this.value.replace(/\D/g,'').slice(0,11);
      if(v.length<=2)       this.value = v.length ? '('+v : '';
      else if(v.length<=6)  this.value = '('+v.slice(0,2)+') '+v.slice(2);
      else if(v.length<=10) this.value = '('+v.slice(0,2)+') '+v.slice(2,6)+'-'+v.slice(6);
      else                  this.value = '('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7);
    });
  }

  var agdSubmit = document.getElementById('agd-submit');
  if(agdSubmit){
    agdSubmit.addEventListener('click', function(){
      var nome = (document.getElementById('agd-nome')||{}).value||'';
      var tel  = (document.getElementById('agd-tel')||{}).value||'';
      var end  = (document.getElementById('agd-end')||{}).value||'';
      var tipo = (document.getElementById('agd-tipo')||{}).value||'';
      var data = (document.getElementById('agd-data')||{}).value||'';
      var hora = (document.getElementById('agd-hora')||{}).value||'';
      if(!nome.trim()||!tel.trim()||!end.trim()){ alert('Preencha nome, WhatsApp e endereco'); return; }
      var msg = 'AGENDAMENTO DE VISITA - PowerTec\n\n'
        + 'Nome: '+nome+'\n'
        + 'WhatsApp: '+tel+'\n'
        + 'Endereco: '+end
        + (tipo?'\nNegocio: '+tipo:'')
        + (data?'\nData: '+data:'')
        + (hora?'\nPeriodo: '+hora:'')
        + '\n\n'+new Date().toLocaleString('pt-BR');
      var url = 'https://wa.me/5513981916256?text='+encodeURIComponent(msg);
      var f = document.getElementById('agd-form');
      var s = document.getElementById('agd-success');
      var w = document.getElementById('agds-wpp-link');
      if(f) f.style.display='none';
      if(s) s.classList.add('show');
      if(w) w.href=url;
      window.open(url,'_blank');
    });
  }

  /* Privacy Modal */
  var modal   = document.getElementById('legal-modal');
  var lmTitle = document.getElementById('lm-title');
  var lmBody  = document.getElementById('lm-body');
  var lmClose = document.getElementById('lm-close');
  var lmBack  = document.getElementById('lm-backdrop');

  function openModal(title, content){
    if(!modal) return;
    lmTitle.textContent = title;
    lmBody.innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  var lpLink = document.getElementById('link-privacidade');
  var ltLink = document.getElementById('link-termos');
  if(lpLink) lpLink.addEventListener('click', function(e){
    e.preventDefault();
    openModal('Politica de Privacidade', '<p>A PowerTec Tecnologia respeita sua privacidade. Os dados coletados (nome, telefone, e-mail) sao usados exclusivamente para retorno de contato e nunca serao compartilhados com terceiros.</p><p style="margin-top:10px"><b>LGPD:</b> Solicite acesso ou exclusao pelo WhatsApp (13) 98191-6256.</p>');
  });
  if(ltLink) ltLink.addEventListener('click', function(e){
    e.preventDefault();
    openModal('Termos de Uso', '<p>Ao usar o site da PowerTec Tecnologia, voce concorda com estes termos.</p><p style="margin-top:10px"><b>Orcamentos:</b> Valores sao estimativas. O definitivo e fornecido apos avaliacao tecnica.</p><p style="margin-top:10px"><b>Contato:</b> (13) 98191-6256 - Guaruja, SP</p>');
  });
  if(lmClose) lmClose.addEventListener('click', closeModal);
  if(lmBack)  lmBack.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });

})();

/* ════════════════════════════════ */

/* == TOAST DESCONTOS POWERTEC == */
(function(){

  var toasts = [
    { ico:'🎯', tag:'Plano Starter', title:'15% OFF na 1a mensalidade', sub:'Valido hoje - Guaruja e regiao', plan:'Starter' },
    { ico:'🚀', tag:'Plano Pro',     title:'1 mes gratis na anuidade',   sub:'Oferta por tempo limitado',      plan:'Pro' },
    { ico:'🏢', tag:'Plano Business',title:'Instalacao sem taxa hoje',   sub:'Economia de R$ 250 na ativacao', plan:'Business' },
    { ico:'📷', tag:'CFTV + PDV',    title:'Kit completo com 20% OFF',   sub:'Pacote exclusivo para comercio',  plan:'Pro' },
    { ico:'🔒', tag:'Alarme + Camera',title:'Combo com 2 meses gratis', sub:'Somente para novos clientes',     plan:'Business' },
    { ico:'⚡', tag:'PDV Starter',   title:'Sem fidelidade + desconto',  sub:'Cancele quando quiser',          plan:'Starter' },
    { ico:'🎁', tag:'Oferta relampago',title:'R$ 50 OFF no 1o mes',      sub:'Valido por 24h - Guaruja',       plan:'Starter' },
    { ico:'📦', tag:'Plano Anual',   title:'Ate 34% mais barato',        sub:'Economia real todo mes',         plan:'Pro' },
  ];

  var container = document.getElementById('pt-toast');
  if(!container) return;

  var shown    = [];
  var maxToasts = 2;
  var idx      = 0;

  // Shuffle array
  for(var i = toasts.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = toasts[i]; toasts[i] = toasts[j]; toasts[j] = tmp;
  }

  function removeToast(el){
    el.classList.add('hiding');
    setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 380);
  }

  function showToast(){
    if(idx >= toasts.length) idx = 0;
    var t = toasts[idx++];

    // Remove oldest if maxed
    var existing = container.querySelectorAll('.pt-toast-item');
    if(existing.length >= maxToasts){
      removeToast(existing[0]);
    }

    var dur = 6;
    var el  = document.createElement('div');
    el.className = 'pt-toast-item';
    el.style.setProperty('--dur', dur + 's');
    el.innerHTML = ''
      + '<div class="pt-toast-ico">' + t.ico + '</div>'
      + '<div class="pt-toast-body">'
      +   '<div class="pt-toast-tag">' + t.tag + '</div>'
      +   '<div class="pt-toast-title">' + t.title + '</div>'
      +   '<div class="pt-toast-sub">' + t.sub + '</div>'
      + '</div>'
      + '<button class="pt-toast-close" onclick="event.stopPropagation();this.parentNode.classList.add(\'hiding\');setTimeout(function(){if(this2.parentNode)this2.parentNode.removeChild(this2);}.bind(null),380);" >x</button>'
      + '<div class="pt-toast-bar"></div>';

    // Click goes to planos
    el.addEventListener('click', function(e){
      if(e.target.classList.contains('pt-toast-close')) return;
      var msg = 'Ola! Vi a oferta do plano ' + t.plan + ' no site e quero saber mais!';
      window.open('https://wa.me/5513981916256?text=' + encodeURIComponent(msg), '_blank');
      removeToast(el);
    });

    // Close button fix
    var closeBtn = el.querySelector('.pt-toast-close');
    if(closeBtn){
      closeBtn.onclick = function(e){
        e.stopPropagation();
        removeToast(el);
      };
    }

    container.appendChild(el);

    // Auto remove after dur seconds
    setTimeout(function(){ removeToast(el); }, dur * 1000);
  }

  // First toast after 4s, then every 8-12s
  setTimeout(function(){
    showToast();
    setInterval(function(){
      var delay = 8000 + Math.random() * 4000;
      setTimeout(showToast, delay);
    }, 12000);
  }, 4000);

})();