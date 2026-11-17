/* PolotskVet: mobile menu, the contact dialog (phone and Telegram), scroll reveal and, in the «Игриво» style,
   the cat over the contact block that follows the pointer with its eyes. Contacts: Alex, 17.11.2026. */
(function () {
  var d = document.documentElement;
  var PHONE = '+375336491775', PHONE_TEXT = '+375 33 649-17-75';
  var TELEGRAM = 'https://t.me/romuluslll', TELEGRAM_TEXT = '@romuluslll';

  /* mobile menu */
  var menuBtn = document.querySelector('[data-menu]');
  function closeMenu() {
    d.classList.remove('menu-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = d.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* contact dialog: buttons with data-contact open it; data-contact="Вакцинация" shows the topic on top */
  var dlg = document.createElement('dialog');
  dlg.className = 'cd';
  dlg.setAttribute('aria-labelledby', 'cd-title');
  dlg.innerHTML =
    '<div class="cd-in">' +
    '<button type="button" class="cd-x" data-close aria-label="Закрыть">×</button>' +
    '<span class="cd-topic" hidden></span>' +
    '<h2 id="cd-title">Связаться с врачом</h2>' +
    '<p>Назовите город и адрес, возраст питомца и причину обращения. Возможность выезда, время и стоимость согласуем.</p>' +
    '<div class="cd-rows">' +
    '<a class="cd-row" href="tel:' + PHONE + '"><b>Позвонить</b><span class="tel">' + PHONE_TEXT + '</span></a>' +
    '<a class="cd-row" href="' + TELEGRAM + '" target="_blank" rel="noopener"><b>Написать в Telegram</b><span>' + TELEGRAM_TEXT + '</span></a>' +
    '</div>' +
    '<button type="button" class="cd-ok" data-close>Закрыть</button>' +
    '</div>';
  document.body.appendChild(dlg);
  var topicEl = dlg.querySelector('.cd-topic');
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-contact]');
    if (!trigger) return;
    e.preventDefault();
    closeMenu();
    var topic = trigger.getAttribute('data-contact');
    topicEl.hidden = !topic;
    topicEl.textContent = topic || '';
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || (e.target.closest && e.target.closest('[data-close]'))) {
      if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
    }
  });

  /* scroll reveal */
  var revealEls = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* «Игриво»: the cat over the contact block follows the pointer with its eyes (mouse only, not with reduced motion) */
  var peek = document.querySelector('.peek');
  if (peek && window.matchMedia && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    var pupils = peek.querySelectorAll('.pupil');
    addEventListener('pointermove', function (e) {
      if (d.getAttribute('data-style') !== 'play') return;
      var r = peek.getBoundingClientRect(), k = r.width / 120;
      pupils.forEach(function (p) {
        var a = Math.atan2(e.clientY - (r.top + p.cy.baseVal.value * k), e.clientX - (r.left + p.cx.baseVal.value * k));
        p.setAttribute('transform', 'translate(' + (Math.cos(a) * 3.6).toFixed(2) + ' ' + (Math.sin(a) * 3.6).toFixed(2) + ')');
      });
    }, { passive: true });
  }
})();
