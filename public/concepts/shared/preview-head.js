/* Runs before first paint: picks the palette and photo mode for this layout
   (the layout's own, unless the viewer chose another one in the preview bar). */
(function () {
  var d = document.documentElement;
  var layout = d.getAttribute('data-layout') || '1';
  var nativePhotos = layout === '4' ? 'bw' : 'graded';
  var palette = null, photos = null, hidden = false;
  try {
    palette = localStorage.getItem('pv-palette');
    photos = localStorage.getItem('pv-photos');
    hidden = localStorage.getItem('pv-hidden') === '1';
  } catch (e) {}
  /* a link can pin a combination: 3.html?p=5&ph=muted */
  var qp = /[?&]p=([1-5])\b/.exec(location.search), qph = /[?&]ph=(orig|graded|muted|bw)\b/.exec(location.search);
  if (qp) palette = qp[1];
  if (qph) photos = qph[1];
  /* data-base: the layout a derived page takes its own palette from (1+ is built on 1) */
  d.setAttribute('data-palette', palette || d.getAttribute('data-base') || layout);
  d.setAttribute('data-photos', photos || nativePhotos);
  d.classList.add('js');
  if (hidden) d.classList.add('pv-off');
  var narrow = window.matchMedia && window.matchMedia('(max-width:760px)').matches;
  d.style.setProperty('--pv-h', hidden ? '0px' : (narrow ? '84px' : '46px'));
})();
