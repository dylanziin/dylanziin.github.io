/* 7DYLZ PERSONAL PORTFOLIO FINAL — Vanilla JavaScript
   All interactions work without a backend or external libraries. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const youtube = 'https://www.youtube.com/@7dylanziin';
  const discord = 'https://discordapp.com/users/674956807554465834';
  const copy = {
    en: {
      navHome:'Home', navAbout:'About', navProjects:'Projects', navSkills:'Skills', navGaming:'Gaming', navLinks:'Links',
      studentRole:'Informatics Engineering Student',
      heroDescription:'Creative mind, 3D enthusiast and Informatics Engineering student. I love turning ideas into visuals, bringing digital worlds to life and exploring what’s possible with technology.',
      viewWork:'Explore my work', moreAbout:'Get to know me',
      aboutTitle:'About me',
      aboutText:'Hey! I’m 7Dylz, a creative who enjoys combining visual design with technology. I work with GFX, VFX and 3D modeling, and I’m currently studying Informatics Engineering. I also love experimenting with Unity, creating interactive experiences and improving my skills with every new project.',
      skillsTitle:'Creative toolkit', gamingTitle:'Gaming', rankBadge:'VALORANT RANK', linksTitle:'Find me online',
      projectsTitle:'Featured visuals<span class="red">.</span>', projectsDescription:'A collection of four original concept artworks created for this website.',
      demoNote:'* Visual concepts generated for this website. These do not represent previous commissions or finished 3D/Unity projects.',
      project1:'Neon Rain / VFX', project2:'Obsidian GT / 3D', project3:'Crimson Shrine / Unity', project4:'7Dylz Identity / GFX',
      conceptTag:'CONCEPT',filterAll:'ALL',modalDisclaimer:'Concept artwork generated for this website; not a completed commission or a finished 3D project.',nextProject:'Next concept',musicButton:'♫ MUSIC',nowPlaying:'LISTEN NOW',musicHelp:'Press play inside Spotify to listen. Playback depends on Spotify and your browser.',
      terminalIntro:'Type help to see available commands.', try:'TRY:', terminalTitle:'More than just a portfolio.',
      terminalDescription:'This is my little corner of the internet. Explore the page, try the terminal, and get a glimpse of what I love to create.',
      bootLine1:'connecting to 7dylz.exe...', bootLine2:'loading creative modules...', bootLine3:'launching personal space...', bootLine4:'systems online. welcome, 7Dylz.', bootStatus:'INITIALIZING PROFILE', skipIntro:'SKIP INTRO ↗', replayIntro:'↻ REPLAY INTRO'
    },
    es: {
      navHome:'Inicio', navAbout:'Sobre mí', navProjects:'Proyectos', navSkills:'Habilidades', navGaming:'Gaming', navLinks:'Enlaces',
      studentRole:'Estudiante de Ingeniería en Informática',
      heroDescription:'Creativo, apasionado del 3D y estudiante de Ingeniería en Informática. Me encanta transformar ideas en diseños, dar vida a mundos digitales y explorar las posibilidades de la tecnología.',
      viewWork:'Explorar mis trabajos', moreAbout:'Conóceme',
      aboutTitle:'Sobre mí',
      aboutText:'¡Hola! Soy 7Dylz y disfruto combinar el diseño visual con la tecnología. Trabajo con GFX, VFX y modelado 3D, y actualmente estudio Ingeniería en Informática. También me gusta experimentar con Unity, crear experiencias interactivas y seguir mejorando mis habilidades en cada proyecto.',
      skillsTitle:'Mis habilidades', gamingTitle:'Gaming', rankBadge:'RANGO EN VALORANT', linksTitle:'Mis redes',
      projectsTitle:'Galería visual<span class="red">.</span>', projectsDescription:'Cuatro conceptos visuales originales creados especialmente para esta web.',
      demoNote:'* Conceptos visuales generados para esta web. No representan encargos anteriores ni proyectos 3D/Unity terminados.',
      project1:'Neon Rain / VFX', project2:'Obsidian GT / 3D', project3:'Crimson Shrine / Unity', project4:'7Dylz Identity / GFX',
      conceptTag:'CONCEPTO',filterAll:'TODOS',modalDisclaimer:'Concepto visual generado para esta web; no es un encargo realizado ni un proyecto 3D terminado.',nextProject:'Siguiente concepto',musicButton:'♫ MÚSICA',nowPlaying:'ESCUCHAR AHORA',musicHelp:'Pulsa reproducir dentro de Spotify. La reproducción depende de Spotify y de tu navegador.',
      terminalIntro:'Escribe help para ver los comandos disponibles.', try:'PRUEBA:', terminalTitle:'Más que un portafolio.',
      terminalDescription:'Este es mi pequeño espacio en internet. Explora la página, prueba la terminal y descubre un poco de lo que me gusta crear.',
      bootLine1:'conectando a 7dylz.exe...', bootLine2:'cargando módulos creativos...', bootLine3:'abriendo espacio personal...', bootLine4:'sistemas listos. bienvenido, 7Dylz.', bootStatus:'INICIANDO PERFIL', skipIntro:'SALTAR INTRO ↗', replayIntro:'↻ REPETIR INTRO'
    }
  };
  let lang = 'es';
  const toggle = $('#langToggle');
  function applyLanguage(next) {
    lang = next;
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      const value = copy[lang][k];
      if (value == null) return;
      if (k === 'projectsTitle') el.innerHTML = value;
      else el.textContent = value;
    });
    toggle.textContent = lang === 'en' ? 'ES' : 'EN';
    toggle.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  }
  toggle.addEventListener('click', () => applyLanguage(lang === 'en' ? 'es' : 'en'));
  applyLanguage('es');

  // V2: short boot sequence + optional replay. No stored state or outside services.
  const loading = $('#loading');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Respect accessibility preferences on first visit. The visible FX control is an explicit opt-in.
  let effectsEnabled = !reduceMotion;
  const effectsToggle = $('#effectsToggle');
  const effectsLabel = $('#effectsLabel');
  function syncEffectsUI() {
    document.body.classList.toggle('effects-off', !effectsEnabled);
    document.body.classList.toggle('effects-on', effectsEnabled);
    effectsToggle.setAttribute('aria-pressed', String(effectsEnabled));
    effectsLabel.textContent = effectsEnabled ? 'EFECTOS ON' : 'EFECTOS OFF';
    effectsToggle.setAttribute('aria-label', effectsEnabled ? 'Desactivar efectos animados' : 'Activar efectos animados');
    const hud = document.querySelector('.energy-hud');
    if(hud) hud.setAttribute('aria-hidden', 'true');
  }
  syncEffectsUI();
  effectsToggle.addEventListener('click', () => {
    effectsEnabled = !effectsEnabled;
    syncEffectsUI();
    if (effectsEnabled && !document.body.classList.contains('intro-released')) dismissLoading();
  });
  document.body.classList.add('motion-v2');
  let introTimer = null;
  let introRunning = false;
  function dismissLoading() {
    if (!introRunning && effectsEnabled) return;
    introRunning = false;
    window.clearTimeout(introTimer);
    loading.classList.add('done');
    loading.setAttribute('aria-hidden', 'true');
    document.body.classList.add('intro-released');
  }
  function playIntro() {
    if (!effectsEnabled) { document.body.classList.add('intro-released'); loading.classList.add('done'); return; }
    window.clearTimeout(introTimer);
    introRunning = true;
    document.body.classList.remove('intro-released');
    loading.classList.remove('done', 'run');
    loading.removeAttribute('aria-hidden');
    // Reset the CSS loading bar and boot lines for replay.
    void loading.offsetWidth;
    loading.classList.add('run');
    introTimer = window.setTimeout(dismissLoading, 3350);
  }
  $('#skipIntro').addEventListener('click', dismissLoading);
  $('#replayIntro').addEventListener('click', playIntro);
  playIntro();

  // Sticky navigation with active-section indicator.
  const menu = $('#menuToggle');
  const navLinks = $('#navLinks');
  menu.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.nav-link').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { navLinks.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
  });
  const sectionNames = ['home','about','skills','gaming','links','projects'];
  const sections = sectionNames.map(id => document.getElementById(id)).filter(Boolean);
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      $$('.nav-link').forEach(a => a.classList.toggle('active',a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin:'-18% 0px -68% 0px', threshold:0 });
  sections.forEach(el => activeObserver.observe(el));

  // Enhanced reveal choreography, preserving V1 section structure.
  $$('.dashboard .panel').forEach((panel, i) => panel.style.setProperty('--reveal-delay', `${(i % 4) * 95}ms`));
  $$('.project-card').forEach((card, i) => { card.classList.add('scroll-reveal'); card.style.setProperty('--reveal-delay', `${(i % 4) * 75}ms`); });

  // Scroll progress line, updated no more than once per animation frame.
  const readingProgress = $('#readingProgress');
  let scrollTicking = false;
  function updateProgress() {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, window.scrollY / scrollable));
    readingProgress.style.transform = `scaleX(${progress})`;
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(updateProgress); }
  }, { passive:true });
  updateProgress();

  // Scroll reveal.
  const reveals = $$('.scroll-reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, ob) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); ob.unobserve(entry.target); }
      });
    }, { threshold:0.06, rootMargin:'0px 0px -25px 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  // Parallax/tilt only on pointer devices; original image remains unchanged.
  const heroVisual = $('#heroVisual');
  const portrait = $('.portrait-frame');
  if (matchMedia('(pointer:fine)').matches) {
    heroVisual.addEventListener('pointermove', e => {
      if (!effectsEnabled) return;
      const b = heroVisual.getBoundingClientRect();
      const x = ((e.clientX-b.left) / b.width - 0.5)*2;
      const y = ((e.clientY-b.top) / b.height - 0.5)*2;
      portrait.style.transform = `rotateY(${x*3.6}deg) rotateX(${y*-3.6}deg) translate3d(${x*2}px,${y*2}px,0)`;
    });
    heroVisual.addEventListener('pointerleave', () => portrait.style.transform='');
  }

  // A visible, recurring Godspeed effect. All generated locally on a transparent canvas.
  // Bolts favor the perimeter of Killua's hair; no external resources or dependencies.
  const canvas = $('#godspeedCanvas');
  const ctx = canvas.getContext('2d');
  const arcs = [];
  const sparks = [];
  let lastTime = 0, spawnTime = 0, canvasWidth = 1, canvasHeight = 1;
  const anchors = [
    [[.25,.23],[.31,.08]], [[.31,.08],[.45,.04]], [[.46,.04],[.59,.045]],
    [[.59,.045],[.70,.18]], [[.70,.18],[.73,.33]], [[.24,.18],[.23,.38]],
    [[.23,.38],[.18,.49]], [[.59,.48],[.71,.52]], [[.39,.12],[.49,.04]],
    [[.57,.12],[.70,.30]], [[.30,.39],[.20,.50]], [[.45,.55],[.55,.48]]
  ];
  function rnd(min,max){return min+Math.random()*(max-min);}
  function scaleCanvas(){
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio||1,2);
    canvasWidth=rect.width;canvasHeight=rect.height;
    const w=Math.round(rect.width*dpr), h=Math.round(rect.height*dpr);
    if(canvas.width!==w || canvas.height!==h){canvas.width=w;canvas.height=h;}
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function bolt(){
    const pair=anchors[Math.floor(Math.random()*anchors.length)];
    const a=pair[0],b=pair[1], p1=[a[0]*canvasWidth,a[1]*canvasHeight],p2=[b[0]*canvasWidth,b[1]*canvasHeight];
    let n=12, points=[p1],dx=p2[0]-p1[0],dy=p2[1]-p1[1];
    const length=Math.hypot(dx,dy)||1,normal=[-dy/length,dx/length];
    for(let i=1;i<n;i++){
      const f=i/n,jitter=(Math.sin(Math.PI*f)*rnd(-15,15));
      points.push([p1[0]+dx*f+normal[0]*jitter,p1[1]+dy*f+normal[1]*jitter]);
    }
    points.push(p2);
    const color = Math.random() < .63 ? 'blue':'red';
    arcs.push({points,color,born:performance.now(),life:rnd(260,600),strength:rnd(.74,1)});
    for(let j=0;j<5;j++){
      const p=points[Math.floor(rnd(1,n))];
      sparks.push({x:p[0],y:p[1],vx:rnd(-1.5,1.5),vy:rnd(-1.8,1.0),birth:performance.now(),life:rnd(250,680),color});
    }
  }
  function drawArcs(now){
    if (!canvasWidth || !canvasHeight)return;
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    if (!effectsEnabled || !document.body.classList.contains('intro-released'))return;
    if (!lastTime)lastTime=now;
    const dt=Math.min(80,now-lastTime);lastTime=now;spawnTime+=dt;
    if (spawnTime>230){
      spawnTime=0;
      bolt();
      if(Math.random()<.33)bolt();
    }
    for(let i=arcs.length-1;i>=0;i--){
      const arc=arcs[i], age=(now-arc.born)/arc.life;
      if(age>=1){arcs.splice(i,1);continue;}
      const fade = Math.pow(1-age,.65)*arc.strength*(Math.random()<.04?.35:1);
      const rgb=arc.color==='blue'?'123,205,255':'255,54,89';
      ctx.save();ctx.lineJoin='round';ctx.lineCap='round';
      ctx.shadowColor=`rgba(${rgb},.85)`;ctx.shadowBlur=16;
      ctx.strokeStyle=`rgba(${rgb},${.65*fade})`;ctx.lineWidth=4.2;
      ctx.beginPath(); arc.points.forEach((p,j)=> j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
      ctx.shadowBlur=7;ctx.strokeStyle=`rgba(235,247,255,${.94*fade})`;ctx.lineWidth=1.45;ctx.stroke();
      ctx.restore();
    }
    for(let i=sparks.length-1;i>=0;i--){
      const s=sparks[i],age=(now-s.birth)/s.life;
      if(age>=1){sparks.splice(i,1);continue;}
      const opacity=1-age;
      ctx.fillStyle=s.color==='blue'?`rgba(166,229,255,${opacity})`:`rgba(255,112,134,${opacity})`;
      ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=8;
      ctx.beginPath();ctx.arc(s.x+s.vx*age*25,s.y+s.vy*age*25,1.35*(1-age)+.4,0,Math.PI*2);ctx.fill();
    }
    ctx.shadowBlur=0;
  }
  const viewObserver = new IntersectionObserver(([entry])=>{ canvas.dataset.visible=String(entry.isIntersecting); },{threshold:0});
  viewObserver.observe(heroVisual);
  const canvasResize=new ResizeObserver(scaleCanvas);
  canvasResize.observe(canvas);
  scaleCanvas();
  function electricFrame(now){
    if (canvas.dataset.visible!=='false') drawArcs(now);
    else {lastTime=now;spawnTime=0;}
    requestAnimationFrame(electricFrame);
  }
  requestAnimationFrame(electricFrame);

  // V2.3 cursor — native high-contrast PNG plus fixed viewport-space follow effects.
  // A mouse-triggered cursor avoids hiding the OS pointer before we know the
  // tracking code is running. Touchscreens, typing fields and FX OFF stay native.
  const mouseCapable = matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (mouseCapable) {
    const ring = $('#cursorRing'), dot = $('#cursorDot');
    const glow = $('#cursorGlow'), trail = $('#cursorTrail');
    const trailCtx = trail.getContext('2d');
    const cursorState = {targetX:-100,targetY:-100,x:-100,y:-100,glowX:-100,glowY:-100,
      hasMoved:false,inside:false,hover:false,text:false,lastSpark:0,lastPointerX:-100,lastPointerY:-100};
    const particles=[];
    let trailWidth=0,trailHeight=0;
    const interactive='a,button,[role="button"],select,summary,label';
    const textTarget='input,textarea,[contenteditable="true"]';
    function sizeTrail(){
      const scale=Math.min(devicePixelRatio||1,2);
      trailWidth=innerWidth;trailHeight=innerHeight;
      trail.width=Math.round(innerWidth*scale);trail.height=Math.round(innerHeight*scale);
      trailCtx.setTransform(scale,0,0,scale,0,0);
    }
    sizeTrail();
    addEventListener('resize',sizeTrail,{passive:true});
    function addParticle(x,y,pulse=false){
      if(particles.length>90)particles.splice(0,particles.length-90);
      const life=pulse?380:280;
      particles.push({x,y,vx:(Math.random()-.5)*(pulse?4.7:1.45),
        vy:(Math.random()-.5)*(pulse?4.7:1.45),start:performance.now(),life,
        size:pulse?1.8+Math.random()*1.8:.8+Math.random()*.9});
    }
    function syncPointerVisibility(){
      const active=effectsEnabled && cursorState.inside;
      // Intro must be gone before hiding the normal browser cursor.
      const ready=active && loading.classList.contains('done') && cursorState.hasMoved;
      document.body.classList.toggle('cursor-ready',ready);
      document.body.classList.toggle('cursor-offscreen',!ready);
    }
    addEventListener('pointermove',e=>{
      if(e.pointerType && e.pointerType!=='mouse')return;
      const st=cursorState;
      st.targetX=e.clientX;st.targetY=e.clientY;st.hasMoved=true;st.inside=true;
      const target=e.target;
      st.text=Boolean(target?.closest?.(textTarget));
      st.hover=!st.text && Boolean(target?.closest?.(interactive));
      document.body.classList.toggle('cursor-over-action',st.hover);
      document.body.classList.toggle('cursor-over-text',st.text);
      if(st.x===-100){st.x=st.targetX;st.y=st.targetY;st.glowX=st.targetX;st.glowY=st.targetY}
      if(effectsEnabled && loading.classList.contains('done') && !st.text){
        const dist=Math.hypot(st.targetX-st.lastPointerX,st.targetY-st.lastPointerY);
        if(dist>12 && performance.now()-st.lastSpark>32){
          addParticle(st.targetX,st.targetY);st.lastSpark=performance.now();
          st.lastPointerX=st.targetX;st.lastPointerY=st.targetY;
        }
      }
      syncPointerVisibility();
    },{passive:true});
    document.addEventListener('pointerleave',()=>{cursorState.inside=false;syncPointerVisibility()});
    document.addEventListener('pointerenter',()=>{cursorState.inside=true;syncPointerVisibility()});
    addEventListener('blur',()=>{cursorState.inside=false;syncPointerVisibility()});
    document.addEventListener('pointerdown',e=>{
      if(e.pointerType && e.pointerType!=='mouse')return;
      if(!effectsEnabled || !loading.classList.contains('done'))return;
      document.body.classList.add('cursor-pressed');
      const pulse=document.createElement('i');pulse.className='cursor-click-ring';
      pulse.style.left=e.clientX+'px';pulse.style.top=e.clientY+'px';
      document.body.append(pulse);pulse.addEventListener('animationend',()=>pulse.remove(),{once:true});
      for(let i=0;i<11;i++)addParticle(e.clientX,e.clientY,true);
    });
    addEventListener('pointerup',()=>document.body.classList.remove('cursor-pressed'));
    document.addEventListener('pointercancel',()=>document.body.classList.remove('cursor-pressed'));

    // Subtle mouse-following light inside cards; CSS owns the rendering.
    $$('.panel,.project-card,.terminal-card').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        if(!effectsEnabled)return;
        const box=card.getBoundingClientRect();
        card.style.setProperty('--spot-x',`${Math.round(e.clientX-box.left)}px`);
        card.style.setProperty('--spot-y',`${Math.round(e.clientY-box.top)}px`);
      },{passive:true});
    });
    let prev=performance.now();
    function cursorFrame(now){
      const st=cursorState,dt=Math.min(50,now-prev);prev=now;
      const smooth=1-Math.exp(-dt/56);
      const glowSmooth=1-Math.exp(-dt/110);
      st.x+=(st.targetX-st.x)*smooth;st.y+=(st.targetY-st.y)*smooth;
      st.glowX+=(st.targetX-st.glowX)*glowSmooth;
      st.glowY+=(st.targetY-st.glowY)*glowSmooth;
      const width=st.hover?49:(st.text?14:(document.body.classList.contains('cursor-pressed')?22:32));
      const height=st.hover?49:(st.text?24:(document.body.classList.contains('cursor-pressed')?22:32));
      ring.style.transform=`translate3d(${st.x-width/2}px,${st.y-height/2}px,0)`;
      dot.style.transform=`translate3d(${st.targetX-4}px,${st.targetY-4}px,0)`;
      glow.style.transform=`translate3d(${st.glowX-115}px,${st.glowY-115}px,0)`;
      trailCtx.clearRect(0,0,trailWidth,trailHeight);
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i],t=(now-p.start)/p.life;
        if(t>=1){particles.splice(i,1);continue}
        if(!effectsEnabled)continue;
        const a=(1-t)**1.7;
        trailCtx.beginPath();trailCtx.fillStyle=`rgba(255,70,103,${a*.8})`;
        trailCtx.shadowColor='#ff3b55';trailCtx.shadowBlur=7;
        trailCtx.arc(p.x+p.vx*t*27,p.y+p.vy*t*27,p.size*(1-t*.55),0,Math.PI*2);trailCtx.fill();
      }
      trailCtx.shadowBlur=0;
      requestAnimationFrame(cursorFrame);
    }
    requestAnimationFrame(cursorFrame);
    // Ensure native cursor returns instantly on FX OFF and after intro replay.
    effectsToggle.addEventListener('click',()=>{
      if(!effectsEnabled){particles.length=0;document.body.classList.remove('cursor-ready');}
      else syncPointerVisibility();
    });
    $('#replayIntro').addEventListener('click',()=>document.body.classList.remove('cursor-ready'));
    $('#skipIntro').addEventListener('click',syncPointerVisibility);
  }

  // Work filters. Concept artwork is clearly labeled as such.
  $$('.filter-chip').forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    $$('.filter-chip').forEach(chip => { chip.classList.toggle('selected', chip === btn); chip.setAttribute('aria-pressed', String(chip === btn)); });
    $$('.project-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
  }));
  $$('.filter-chip').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === 'all')));

  // Small real command line. Links are opened only on explicit commands.
  const form = $('#terminalForm'), input = $('#terminalInput'), output = $('#terminalOutput');
  function writeLine(message, style = 'terminal-result') {
    const p = document.createElement('p');
    p.className = style;
    p.textContent = message;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  }
  function runCommand(raw) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    const p = document.createElement('p');
    p.innerHTML = '<span class="terminal-prompt">7dylz@web:~$</span> ';
    const text = document.createElement('span'); text.className='terminal-command'; text.textContent=raw.trim(); p.appendChild(text);
    output.appendChild(p);
    if (command === 'clear') { output.textContent=''; return; }
    const commands = {
      help: lang==='en' ? 'COMMANDS: about, skills, gaming, projects, youtube, discord, clear' : 'COMANDOS: about, skills, gaming, projects, youtube, discord, clear',
      about: lang==='en' ? '7Dylz — GFX/VFX, 3D artist, Informatics Engineering student.' : '7Dylz — GFX/VFX, artista 3D, estudiante de Ingeniería en Informática.',
      skills: 'GFX // VFX // 3D MODELING // UNITY // EDITING // TECH',
      gaming: 'VALORANT  →  IMMORTAL 3',
      projects: lang==='en' ? 'Scroll to the portfolio previews ↓' : 'Explora la galería visual más arriba ↑',
      youtube: 'YouTube: ' + youtube,
      discord: 'Discord: ' + discord
    };
    if (command === 'youtube') { writeLine(commands.youtube); window.open(youtube, '_blank', 'noopener,noreferrer'); }
    else if (command === 'discord') { writeLine(commands.discord); window.open(discord, '_blank', 'noopener,noreferrer'); }
    else writeLine(commands[command] || (lang === 'en' ? `Unknown command: ${command}. Try help.` : `Comando desconocido: ${command}. Prueba help.`));
  }
  form.addEventListener('submit', e => { e.preventDefault(); runCommand(input.value); input.value=''; input.focus(); });
  $$('[data-command]').forEach(b => b.addEventListener('click', () => runCommand(b.dataset.command)));

  // Footer year, local browser date (not user identity data).
  $('#year').textContent = String(new Date().getFullYear());



  // FINAL: Accessible project detail viewer. Cards are original *concept artwork*.
  const conceptProjects = [
    {id:1, tag:'VFX / CINEMATIC', title:'Neon Rain / VFX', description:{es:'Estudio visual de una ciudad cyberpunk bajo la lluvia. Explora composición, profundidad, atmósfera nocturna y reflejos rojos, inspirado en la estética de las ediciones cinemáticas.',en:'A rainy cyberpunk city visual study. Explores composition, depth, atmospheric lighting and reflections inspired by cinematic editing.'}},
    {id:2, tag:'3D / AUTOMOTIVE', title:'Obsidian GT / 3D', description:{es:'Concepto de visualización automotriz: silueta de un superdeportivo negro, iluminación de estudio roja y materiales de aspecto metálico. Imagen conceptual, no captura de un modelo 3D propio.',en:'Automotive visualization concept featuring a black supercar, red studio lighting and metallic materials. A concept image, not a screenshot of an actual 3D model.'}},
    {id:3, tag:'UNITY / ENVIRONMENT', title:'Crimson Shrine / Unity', description:{es:'Propuesta de dirección de arte para un posible entorno interactivo: templo japonés, torii, faroles, niebla y una luna roja. Concept art, no un nivel funcional de Unity.',en:'Art-direction concept for a potential interactive environment: Japanese shrine, torii, lanterns, mist and a red moon. Concept artwork, not a working Unity scene.'}},
    {id:4, tag:'GFX / VISUAL IDENTITY', title:'7Dylz Identity / GFX', description:{es:'Exploración gráfica de la identidad 7Dylz con metálicos, textura glitch, cadenas y contrastes rojos. Concepto de GFX creado para el universo visual de esta página.',en:'A graphic exploration of the 7Dylz identity using metallic lettering, glitch textures, chains and red accents. A GFX concept created for this site.'}}
  ];
  const pm=$('#projectModal'), pmImg=$('#projectModalImage'), pmTitle=$('#projectModalTitle'), pmCat=$('#projectModalCategory'), pmDesc=$('#projectModalDescription');
  let activeProjectId = null, previousFocus = null;
  function showProject(id) {
    const p=conceptProjects.find(x=>x.id===id); if(!p) return;
    if(pm.hidden) previousFocus=document.activeElement;
    activeProjectId=id;
    pmImg.src='assets/project-'+id+'.webp';
    pmImg.alt=p.title+' — '+(lang==='es'?'concepto visual':'concept artwork');
    pmTitle.textContent=p.title; pmCat.textContent=p.tag; pmDesc.textContent=p.description[lang];
    pm.hidden=false; pm.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
    $('#projectModalClose').focus({preventScroll:true});
  }
  function hideProject() {
    if(pm.hidden)return;
    pm.hidden=true; pm.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open');
    activeProjectId=null; if(previousFocus?.focus)previousFocus.focus({preventScroll:true});
  }
  $$('.project-card[data-project]').forEach(card=>{
    const activate=()=>showProject(Number(card.dataset.project));
    card.addEventListener('click',activate);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
  });
  $('#projectModalClose').addEventListener('click',hideProject);
  pm.querySelector('[data-close-modal]').addEventListener('click',hideProject);
  $('#projectModalNext').addEventListener('click',()=>showProject((activeProjectId||0)%4+1));
  document.addEventListener('keydown',e=>{
    if(pm.hidden)return;
    if(e.key==='Escape'){hideProject();return;}
    if(e.key==='ArrowRight')showProject((activeProjectId||0)%4+1);
    if(e.key==='ArrowLeft')showProject((activeProjectId+2)%4+1);
    if(e.key==='Tab'){
      const controls=[...pm.querySelectorAll('button:not([disabled])')];
      const first=controls[0],last=controls[controls.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  // Preserve up-to-date descriptions if the language is changed while dialog is open.
  toggle.addEventListener('click',()=>{if(activeProjectId!==null){const p=conceptProjects.find(x=>x.id===activeProjectId);pmDesc.textContent=p.description[lang];pmImg.alt=p.title+' — '+(lang==='es'?'concepto visual':'concept artwork');}});

  // Licensed stream via Spotify's hosted embed; loaded only on user interaction.
  const musicToggle=$('#musicToggle'), musicDrawer=$('#musicDrawer'), spotifyContainer=$('#spotifyEmbed');
  function closeMusic(){
    musicDrawer.hidden=true; musicToggle.setAttribute('aria-expanded','false');
    musicToggle.classList.remove('open');
    // Remove iframe to stop audio and third-party requests when closed.
    spotifyContainer.replaceChildren();
  }
  function openMusic(){
    musicDrawer.hidden=false; musicToggle.setAttribute('aria-expanded','true');
    musicToggle.classList.add('open');
    const iframe=document.createElement('iframe');
    iframe.title='Spotify — Cuando No Era Cantante (Remix)';
    iframe.src='https://open.spotify.com/embed/track/2pbSCYzxrG0wa6qcj8IyiE?utm_source=generator&theme=0';
    iframe.width='100%'; iframe.height='152';
    iframe.loading='lazy';
    iframe.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    iframe.setAttribute('frameborder','0');
    spotifyContainer.replaceChildren(iframe);
  }
  musicToggle.addEventListener('click',()=>musicDrawer.hidden?openMusic():closeMusic());
  $('#musicClose').addEventListener('click',closeMusic);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!musicDrawer.hidden)closeMusic();});

})();
