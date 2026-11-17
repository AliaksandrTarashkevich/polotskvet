/* Pre-launch only (17.11.2026): a bar on every page where viewers pick the style («Стиль») and the logo
   icon («Иконка»). Choices are remembered in this browser. Keys: S next style, I next icon, H hide the bar.
   Delete together with preview-head.js and preview.css when the choice is made. */
(function () {
  var d = document.documentElement;
  var STYLE_NAMES = { calm: 'Спокойно', bold: 'Смело', play: 'Игриво', mag: 'Журнал' };
  var styles = (d.getAttribute('data-styles') || '').split(' ').filter(Boolean);
  var icons = (d.getAttribute('data-icons') || '').split(' ').filter(Boolean);
  if (!styles.length && !icons.length) return;

  function store(key, value) {
    try { if (value == null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch (e) {}
  }
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  var bar = el('div', 'pv');
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Выбор стиля и иконки сайта');

  /* home page versions (Alex, 17.11.2026): the approved home at / and the new one at /novaya */
  var home = d.getAttribute('data-home');
  if (home) {
    var gHome = el('div', 'pv-g pv-home');
    gHome.appendChild(el('span', 'pv-l', 'Главная'));
    var hseg = el('div', 'pv-sseg');
    [['old', 'Как была', '/'], ['new', 'Новая', '/novaya']].forEach(function (h) {
      var b = el('button', null, h[1]);
      b.type = 'button';
      b.title = h[0] === 'old' ? 'Главная, как её утвердили' : 'Новая главная со ссылками на отдельные страницы';
      b.setAttribute('aria-pressed', String(h[0] === home));
      b.addEventListener('click', function () { if (h[0] !== home) location.href = h[2] + location.search; });
      hseg.appendChild(b);
    });
    gHome.appendChild(hseg);
    bar.appendChild(gHome);
  }

  var styleBtns = [];
  if (styles.length) {
    var gStyles = el('div', 'pv-g pv-styles');
    gStyles.appendChild(el('span', 'pv-l', 'Стиль'));
    var seg = el('div', 'pv-sseg');
    styles.forEach(function (s) {
      var b = el('button', null, STYLE_NAMES[s] || s);
      b.type = 'button';
      b.title = (STYLE_NAMES[s] || s) + ' (клавиша S — следующий)';
      b.addEventListener('click', function () { setStyle(s); });
      seg.appendChild(b);
      styleBtns.push([s, b]);
    });
    gStyles.appendChild(seg);
    bar.appendChild(gStyles);
  }

  var iconBtns = [];
  if (icons.length) {
    var gIcons = el('div', 'pv-g pv-icons');
    gIcons.appendChild(el('span', 'pv-l', 'Иконка'));
    icons.forEach(function (id, n) {
      var b = el('button', 'pv-icon');
      b.type = 'button';
      b.title = 'Иконка ' + (n + 1) + ' (клавиша I — следующая)';
      b.setAttribute('aria-label', 'Иконка ' + (n + 1));
      var img = el('img');
      img.src = '/assets/brand/icon-' + id + '.png';
      img.alt = '';
      img.width = 24;
      img.height = 24;
      b.appendChild(img);
      b.addEventListener('click', function () { setIcon(id); });
      gIcons.appendChild(b);
      iconBtns.push([id, b]);
    });
    bar.appendChild(gIcons);
  }

  var tools = el('div', 'pv-tools');
  var reset = el('button', 'pv-ic', '↺');
  reset.type = 'button';
  reset.title = 'Вернуть стиль и иконку по умолчанию';
  reset.setAttribute('aria-label', reset.title);
  reset.addEventListener('click', function () {
    store('pv-style', null);
    store('pv-icon', null);
    if (styles.length) applyStyle(styles[0]);
    if (icons.length) applyIcon(icons[0]);
  });
  var hide = el('button', 'pv-ic', '×');
  hide.type = 'button';
  hide.title = 'Скрыть панель (клавиша H)';
  hide.setAttribute('aria-label', 'Скрыть панель');
  hide.addEventListener('click', function () { setHidden(true); });
  tools.appendChild(reset);
  tools.appendChild(hide);
  bar.appendChild(tools);

  var show = el('button', 'pv-show', 'Стиль и иконка');
  show.type = 'button';
  show.addEventListener('click', function () { setHidden(false); });

  document.body.appendChild(bar);
  document.body.appendChild(show);

  function syncHeight() {
    d.style.setProperty('--pv-h', d.classList.contains('pv-off') ? '0px' : bar.offsetHeight + 'px');
  }
  function setHidden(off) {
    d.classList.toggle('pv-off', off);
    store('pv-hidden', off ? '1' : null);
    syncHeight();
  }
  function applyStyle(s) {
    d.setAttribute('data-style', s);
    styleBtns.forEach(function (p) { p[1].setAttribute('aria-pressed', String(p[0] === s)); });
  }
  function setStyle(s) {
    store('pv-style', s === styles[0] ? null : s);
    applyStyle(s);
  }
  function applyIcon(id) {
    d.setAttribute('data-icon', id);
    iconBtns.forEach(function (p) { p[1].setAttribute('aria-pressed', String(p[0] === id)); });
    var fav = document.querySelector('link[rel~="icon"]');
    if (fav) fav.setAttribute('href', '/assets/brand/icon-' + id + '.png');
  }
  function setIcon(id) {
    store('pv-icon', id === icons[0] ? null : id);
    applyIcon(id);
  }
  function next(list, attr, set) {
    var i = list.indexOf(d.getAttribute(attr));
    set(list[(i + 1) % list.length]);
  }

  if (styles.length) applyStyle(d.getAttribute('data-style') || styles[0]);
  if (icons.length) applyIcon(d.getAttribute('data-icon') || icons[0]);
  syncHeight();
  if ('ResizeObserver' in window) new ResizeObserver(syncHeight).observe(bar);
  window.addEventListener('resize', syncHeight);

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (document.querySelector('dialog[open]')) return;
    var k = e.key;
    if (styles.length && (k === 's' || k === 'S' || k === 'ы' || k === 'Ы')) next(styles, 'data-style', setStyle);
    else if (icons.length && (k === 'i' || k === 'I' || k === 'ш' || k === 'Ш')) next(icons, 'data-icon', setIcon);
    else if (k === 'h' || k === 'H' || k === 'р' || k === 'Р') setHidden(!d.classList.contains('pv-off'));
  });
})();
