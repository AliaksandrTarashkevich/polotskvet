/* Pre-launch only (17.11.2026). Runs before first paint: picks the style and the logo icon this viewer is
   looking at, so the page never flashes another one. A link can pin a choice: /?s=bold&i=2.
   Delete together with preview.js and preview.css when the choice is made. */
(function () {
  var d = document.documentElement, hidden = false;
  pick('data-styles', 'data-style', 'pv-style', /[?&]s=([a-z]+)\b/);
  pick('data-icons', 'data-icon', 'pv-icon', /[?&]i=([0-9]+)\b/);
  try { hidden = localStorage.getItem('pv-hidden') === '1'; } catch (e) {}
  if (hidden) d.classList.add('pv-off');
  var narrow = window.matchMedia && window.matchMedia('(max-width:760px)').matches;
  /* a first guess before the bar exists; preview.js measures the real height */
  d.style.setProperty('--pv-h', hidden ? '0px' : narrow ? (d.getAttribute('data-home') ? '122px' : '84px') : '46px');

  /* data-styles / data-icons list the options, the first is the default */
  function pick(list, attr, key, re) {
    var opts = (d.getAttribute(list) || '').split(' ').filter(Boolean);
    if (!opts.length) return;
    var v = null, q = re.exec(location.search);
    try { v = localStorage.getItem(key); } catch (e) {}
    if (q) v = q[1];
    d.setAttribute(attr, opts.indexOf(v) > -1 ? v : opts[0]);
  }
})();
