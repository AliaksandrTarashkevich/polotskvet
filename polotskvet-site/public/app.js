(() => {
  const root=document.getElementById('site-concepts');
  const site=root.querySelector('.site');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=window.matchMedia('(pointer: fine)');
  const dialog=document.getElementById('contact-dialog');
  let lastTrigger=null,pointerFrame=0;

  const closeMenu=()=>{
    site.querySelectorAll('.nav.is-open').forEach(nav=>nav.classList.remove('is-open'));
    site.querySelectorAll('.menu-toggle').forEach(button=>{button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Открыть меню');});
  };
  site.querySelector('.menu-toggle').addEventListener('click',event=>{
    const button=event.currentTarget,nav=site.querySelector('.nav');
    const open=nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
  });
  site.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const target=document.getElementById(link.getAttribute('href').slice(1));
    if(!target)return;
    event.preventDefault();closeMenu();
    target.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
  }));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});

  site.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>{
    lastTrigger=button;
    document.getElementById('dialog-heading').textContent=button.dataset.contact||'Запись на приём';
    document.getElementById('dialog-text').textContent='Телефон и мессенджер для записи пока не указаны.';
    dialog.showModal();
  }));
  document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>lastTrigger?.focus());

  const resetMotion=()=>{
    site.style.setProperty('--cat-x','0px');site.style.setProperty('--cat-y','0px');
    site.style.setProperty('--cat-tilt','0deg');site.style.setProperty('--cat-rx','0deg');site.style.setProperty('--cat-ry','0deg');
    site.style.setProperty('--pointer-x','0px');site.style.setProperty('--pointer-y','0px');
  };
  const updateMotion=()=>{root.classList.toggle('motion-off',reduced.matches);if(reduced.matches)resetMotion();};
  reduced.addEventListener('change',updateMotion);updateMotion();
  document.addEventListener('pointermove',event=>{
    if(reduced.matches||!finePointer.matches||event.pointerType==='touch')return;
    if(pointerFrame)cancelAnimationFrame(pointerFrame);
    pointerFrame=requestAnimationFrame(()=>{
      const x=Math.max(-.5,Math.min(.5,event.clientX/innerWidth-.5));
      const y=Math.max(-.5,Math.min(.5,event.clientY/innerHeight-.5));
      site.style.setProperty('--cat-x',`${x*18}px`);
      site.style.setProperty('--cat-y',`${y*12}px`);
      site.style.setProperty('--cat-tilt',`${x*3}deg`);
      site.style.setProperty('--cat-rx',`${-y*7}deg`);
      site.style.setProperty('--cat-ry',`${x*9}deg`);
      const hero=site.querySelector('.hero'),box=hero.getBoundingClientRect();
      const inside=event.clientY>=box.top&&event.clientY<=box.bottom&&event.clientX>=box.left&&event.clientX<=box.right;
      site.style.setProperty('--pointer-x',inside?`${((event.clientX-box.left)/box.width-.5)*8}px`:'0px');
      site.style.setProperty('--pointer-y',inside?`${((event.clientY-box.top)/box.height-.5)*6}px`:'0px');
      pointerFrame=0;
    });
  },{passive:true});
  document.addEventListener('pointerleave',()=>{if(pointerFrame)cancelAnimationFrame(pointerFrame);pointerFrame=0;resetMotion();});
  window.addEventListener('blur',resetMotion);
  if('IntersectionObserver' in window&&!reduced.matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('entered');observer.unobserve(entry.target);
    }),{threshold:.1});
    site.querySelectorAll('[data-reveal]').forEach(element=>{if(element.getBoundingClientRect().top>innerHeight)observer.observe(element);});
  }
})();
