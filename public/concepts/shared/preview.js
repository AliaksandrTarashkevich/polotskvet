/* Preview bar: switch between the five layouts and the 1+ assembly, try any palette on any layout,
   compare photo treatments. Throwaway — not part of the future site. */
(function () {
  var d = document.documentElement;
  var layout = d.getAttribute('data-layout') || '1';
  /* data-base: the layout a derived page takes its own palette from (1+ is built on 1) */
  var base = d.getAttribute('data-base') || layout;
  /* [file, name, tab label, key]; label and key default to the file name */
  var LAYOUTS = [['1', 'Тёплый приём'], ['1plus', 'Сборка', '1+', '+'], ['2', 'Кардиограмма'], ['3', 'Сервис'], ['4', 'Портрет'], ['5', 'Питомец дома']];
  var PALETTES = [
    ['1', 'Тёплая бумага', '#F7F1E6', '#3A2B22', '#C22A3F'],
    ['2', 'Клиника', '#FFFFFF', '#0F2240', '#D22B40'],
    ['3', 'Петроль', '#F6F2EA', '#0E4A4C', '#D9483B'],
    ['4', 'Чёрно-белая', '#F4F3EF', '#121212', '#C8283E'],
    ['5', 'Персик и слива', '#FFF5EC', '#46263D', '#CC2F45'],
    ['red', 'Один цвет: красный', '#FAF6F4', '#5A1424', '#B42238'],
    ['terra', 'Один цвет: терракота', '#FBF6F1', '#552612', '#A84A1C'],
    ['green', 'Один цвет: изумруд', '#F5F7F2', '#0F3B2B', '#1B6A4C'],
    ['blue', 'Один цвет: синий', '#F5F7FB', '#0F2753', '#2451A6'],
    ['plum', 'Один цвет: слива', '#FAF6F9', '#3D1536', '#7A2C69']
  ];
  /* data-palettes: the palette ids this page offers (1+ offers palette 1 and the one-colour set) */
  var offered = (d.getAttribute('data-palettes') || '1 2 3 4 5').split(' ');
  var SHOWN = PALETTES.filter(function (p) { return offered.indexOf(p[0]) > -1; });
  var PHOTOS = [['orig', 'Исходные'], ['graded', 'Выровненные'], ['muted', 'Приглушённые'], ['bw', 'Ч/б']];
  var nativePhotos = layout === '4' ? 'bw' : 'graded';

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
  bar.setAttribute('aria-label', 'Переключатель вариантов дизайна');

  /* layouts */
  var gLayouts = el('div', 'pv-g pv-layouts');
  gLayouts.appendChild(el('span', 'pv-l', 'Вариант'));
  LAYOUTS.forEach(function (item) {
    var a = el('a', 'pv-tab');
    a.href = item[0] + '.html';
    a.title = item[1] + ' (клавиша ' + (item[3] || item[0]) + ')';
    a.appendChild(el('b', null, item[2] || item[0]));
    a.appendChild(el('span', null, item[1]));
    if (item[0] === layout) a.setAttribute('aria-current', 'page');
    gLayouts.appendChild(a);
  });
  bar.appendChild(gLayouts);

  /* palettes */
  var gPalettes = el('div', 'pv-g pv-palettes');
  gPalettes.appendChild(el('span', 'pv-l', 'Палитра'));
  var swatches = SHOWN.map(function (p) {
    var b = el('button', 'pv-sw');
    b.type = 'button';
    b.title = p[1] + (p[0] === base ? ' — родная для этого варианта' : '');
    b.setAttribute('aria-label', 'Палитра: ' + p[1]);
    b.style.setProperty('--a', p[2]);
    b.style.setProperty('--b', p[3]);
    b.style.setProperty('--c', p[4]);
    if (p[0] === base) b.setAttribute('data-native', '');
    b.addEventListener('click', function () { setPalette(p[0]); });
    gPalettes.appendChild(b);
    return [p[0], b];
  });
  bar.appendChild(gPalettes);

  /* photos */
  var gPhotos = el('div', 'pv-g pv-photos');
  gPhotos.appendChild(el('span', 'pv-l', 'Фото'));
  var seg = el('div', 'pv-seg');
  var photoBtns = PHOTOS.map(function (p) {
    var b = el('button', null, p[1]);
    b.type = 'button';
    b.addEventListener('click', function () { setPhotos(p[0]); });
    seg.appendChild(b);
    return [p[0], b];
  });
  gPhotos.appendChild(seg);
  var cycle = el('button', 'pv-cycle');
  cycle.type = 'button';
  cycle.addEventListener('click', nextPhotos);
  gPhotos.appendChild(cycle);
  bar.appendChild(gPhotos);

  /* styles (1+ only): the same page in other visual directions, on its own row */
  var STYLE_NAMES = { calm: 'Спокойно', bold: 'Смело', play: 'Игриво', mag: 'Журнал' };
  var styles = (d.getAttribute('data-styles') || '').split(' ').filter(Boolean);
  var styleBtns = [];
  if (styles.length) {
    bar.classList.add('has-styles');
    var gStyles = el('div', 'pv-g pv-styles');
    gStyles.appendChild(el('span', 'pv-l', 'Стиль'));
    var sseg = el('div', 'pv-sseg');
    styles.forEach(function (s) {
      var b = el('button', null, STYLE_NAMES[s] || s);
      b.type = 'button';
      b.title = (STYLE_NAMES[s] || s) + ' (клавиша S — следующий)';
      b.addEventListener('click', function () { setStyle(s); });
      sseg.appendChild(b);
      styleBtns.push([s, b]);
    });
    gStyles.appendChild(sseg);
    bar.appendChild(gStyles);
  }

  /* tools */
  var tools = el('div', 'pv-tools');
  var reset = el('button', 'pv-ic', '↺');
  reset.type = 'button';
  reset.title = styles.length ? 'Вернуть родную палитру, фото и стиль' : 'Вернуть родную палитру и фото';
  reset.setAttribute('aria-label', reset.title);
  reset.setAttribute('data-act', 'reset');
  reset.addEventListener('click', function () {
    store('pv-palette', null); store('pv-photos', null); store('pv-style', null);
    applyPalette(base); applyPhotos(nativePhotos);
    if (styles.length) applyStyle(styles[0]);
  });
  var hide = el('button', 'pv-ic', '×');
  hide.type = 'button';
  hide.title = 'Скрыть панель (клавиша H)';
  hide.setAttribute('aria-label', 'Скрыть панель');
  hide.addEventListener('click', function () { setHidden(true); });
  tools.appendChild(reset);
  tools.appendChild(hide);
  bar.appendChild(tools);

  var show = el('button', 'pv-show', 'Варианты');
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
  function applyPalette(id) {
    d.setAttribute('data-palette', id);
    swatches.forEach(function (s) { s[1].setAttribute('aria-pressed', String(s[0] === id)); });
  }
  function setPalette(id) {
    store('pv-palette', id === base ? null : id);
    applyPalette(id);
  }
  function applyPhotos(mode) {
    d.setAttribute('data-photos', mode);
    document.querySelectorAll('img[data-ph]').forEach(function (img) {
      var name = img.getAttribute('data-ph');
      /* data-orig: the untouched version of a photo that does not live in assets/doctor (the stock puppy) */
      var want = mode !== 'orig' ? 'photos/' + name + '.jpg' : (img.getAttribute('data-orig') || '../assets/doctor/' + name + '.jpg');
      if (img.getAttribute('src') !== want) img.setAttribute('src', want);
    });
    var label = '';
    photoBtns.forEach(function (p, i) {
      var on = p[0] === mode;
      p[1].setAttribute('aria-pressed', String(on));
      if (on) label = PHOTOS[i][1];
    });
    cycle.textContent = 'Фото: ' + label.toLowerCase();
  }
  function setPhotos(mode) {
    store('pv-photos', mode === nativePhotos ? null : mode);
    applyPhotos(mode);
  }
  function nextPhotos() {
    var cur = d.getAttribute('data-photos'), i = 0;
    PHOTOS.forEach(function (p, n) { if (p[0] === cur) i = n; });
    setPhotos(PHOTOS[(i + 1) % PHOTOS.length][0]);
  }
  function nextPalette() {
    var cur = d.getAttribute('data-palette'), i = 0;
    SHOWN.forEach(function (p, n) { if (p[0] === cur) i = n; });
    setPalette(SHOWN[(i + 1) % SHOWN.length][0]);
  }

  function applyStyle(s) {
    d.setAttribute('data-style', s);
    styleBtns.forEach(function (p) { p[1].setAttribute('aria-pressed', String(p[0] === s)); });
  }
  function setStyle(s) {
    store('pv-style', s === styles[0] ? null : s);
    applyStyle(s);
  }
  function nextStyle() {
    if (!styles.length) return;
    var i = styles.indexOf(d.getAttribute('data-style'));
    setStyle(styles[(i + 1) % styles.length]);
  }

  applyPalette(d.getAttribute('data-palette') || base);
  applyPhotos(d.getAttribute('data-photos') || nativePhotos);
  if (styles.length) applyStyle(d.getAttribute('data-style') || styles[0]);
  syncHeight();
  if ('ResizeObserver' in window) new ResizeObserver(syncHeight).observe(bar);
  window.addEventListener('resize', syncHeight);

  /* keys: 1–5 layouts, + the 1+ assembly, ←/→ previous/next in bar order, P palette, F photos, H hide */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (document.querySelector('dialog[open]')) return;
    var k = e.key === '=' ? '+' : e.key;
    var go = null, at = 0, count = LAYOUTS.length;
    LAYOUTS.forEach(function (item, i) {
      if (k === (item[3] || item[0])) go = item[0];
      if (item[0] === layout) at = i;
    });
    if (go) { if (go !== layout) location.href = go + '.html'; return; }
    var onTab = t && t.getAttribute && t.getAttribute('role') === 'tab';
    if (k === 'ArrowRight' && !onTab) location.href = LAYOUTS[(at + 1) % count][0] + '.html';
    else if (k === 'ArrowLeft' && !onTab) location.href = LAYOUTS[(at + count - 1) % count][0] + '.html';
    else if (k === 'p' || k === 'P' || k === 'з' || k === 'З') nextPalette();
    else if (k === 'f' || k === 'F' || k === 'а' || k === 'А') nextPhotos();
    else if (k === 's' || k === 'S' || k === 'ы' || k === 'Ы') nextStyle();
    else if (k === 'h' || k === 'H' || k === 'р' || k === 'Р') setHidden(!d.classList.contains('pv-off'));
  });
})();
