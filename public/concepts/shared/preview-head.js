/* Runs before first paint: picks the palette, photo mode, style and logo icon for this page
   (the page's own, unless the viewer chose another one in the preview bar). */
(function () {
  var d = document.documentElement;
  var layout = d.getAttribute('data-layout') || '1';
  var nativePhotos = layout === '4' ? 'bw' : 'graded';
  /* data-pv: the only groups this page's bar shows (1+ for review since 17.11.2026: "styles icons").
     Then the palette and photos are fixed to the page's own, whatever was chosen earlier on other pages. */
  var fixed = !!(d.getAttribute('data-pv') || '').trim();
  var palette = null, photos = null, hidden = false;
  try {
    if (!fixed) {
      palette = localStorage.getItem('pv-palette');
      photos = localStorage.getItem('pv-photos');
    }
    hidden = localStorage.getItem('pv-hidden') === '1';
  } catch (e) {}
  /* a link can pin a combination: 3.html?p=5&ph=muted, 1plus.html?s=bold&i=2 */
  var qp = /[?&]p=([a-z0-9]+)\b/.exec(location.search), qph = /[?&]ph=(orig|graded|muted|bw)\b/.exec(location.search);
  if (qp && !fixed) palette = qp[1];
  if (qph && !fixed) photos = qph[1];
  /* data-palettes: the palette ids this page offers; any other choice falls back. A fixed bar uses the first one. */
  var offered = (d.getAttribute('data-palettes') || '1 2 3 4 5').split(' ');
  if (offered.indexOf(palette) < 0) palette = null;
  /* data-base: the layout a derived page takes its own palette from (1+ is built on 1) */
  d.setAttribute('data-palette', palette || (fixed ? offered[0] : d.getAttribute('data-base') || layout));
  d.setAttribute('data-photos', photos || nativePhotos);
  /* data-styles, data-icons: options a page offers (1+), the first is its own; a link can pin one: ?s=bold, ?i=2 */
  pick('data-styles', 'data-style', 'pv-style', /[?&]s=([a-z]+)\b/);
  pick('data-icons', 'data-icon', 'pv-icon', /[?&]i=([a-z0-9]+)\b/);
  d.classList.add('js');
  if (hidden) d.classList.add('pv-off');
  var narrow = window.matchMedia && window.matchMedia('(max-width:760px)').matches;
  var rows2 = !fixed && d.getAttribute('data-styles');
  /* a first guess before the bar exists; preview.js measures the real height */
  d.style.setProperty('--pv-h', hidden ? '0px' : fixed ? (narrow ? '84px' : '46px') : rows2 ? (narrow ? '118px' : '84px') : (narrow ? '84px' : '46px'));

  function pick(list, attr, key, re) {
    var opts = (d.getAttribute(list) || '').split(' ').filter(Boolean);
    if (!opts.length) return;
    var v = null, q = re.exec(location.search);
    try { v = localStorage.getItem(key); } catch (e) {}
    if (q) v = q[1];
    d.setAttribute(attr, opts.indexOf(v) > -1 ? v : opts[0]);
  }
})();
