/* Site behaviours shared by all five concepts: mobile menu, the honest contact dialog,
   scroll reveal and the scenario tabs. No fake "request sent" state anywhere. */
(function () {
  var d = document.documentElement;

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

  /* contact dialog: says plainly that there is no phone or messenger yet */
  var dlg = document.createElement('dialog');
  dlg.className = 'cd';
  dlg.setAttribute('aria-labelledby', 'cd-title');
  dlg.innerHTML =
    '<div class="cd-in">' +
    '<button type="button" class="cd-x" data-close aria-label="Закрыть">×</button>' +
    '<span class="cd-topic" hidden></span>' +
    '<h2 id="cd-title">Связаться с врачом</h2>' +
    '<p>Телефон и мессенджер для записи пока не указаны. В рабочей версии эта кнопка откроет звонок или чат с врачом.</p>' +
    '<div class="cd-rows">' +
    '<div class="cd-row"><b>Позвонить</b><span>номер появится перед запуском</span></div>' +
    '<div class="cd-row"><b>Написать в мессенджер</b><span>появится перед запуском</span></div>' +
    '</div>' +
    '<button type="button" class="cd-ok" data-close>Понятно</button>' +
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

  /* scenario tabs: [data-tabs] > [data-tab] + [data-panel] */
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-tab]'));
    var panels = root.querySelectorAll('[data-panel]');
    function select(id, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === id;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== id; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t.getAttribute('data-tab')); });
      t.addEventListener('keydown', function (e) {
        var step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        select(tabs[(i + step + tabs.length) % tabs.length].getAttribute('data-tab'), true);
      });
    });
  });
})();
