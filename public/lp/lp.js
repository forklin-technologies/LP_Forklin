(function () {
  var SHAPES = {"ink":[[588.0,91.0],[506.0,44.0],[485.0,39.0],[464.0,41.0],[440.0,52.0],[100.0,251.0],[85.0,269.0],[78.0,290.0],[78.0,479.0],[226.0,479.0],[248.0,474.0],[566.0,295.0],[581.0,277.0],[588.0,258.0]],"indigo":[[877.0,269.0],[865.0,254.0],[851.0,244.0],[649.0,126.0],[637.0,122.0],[637.0,269.0],[631.0,297.0],[617.0,320.0],[604.0,332.0],[261.0,524.0],[237.0,530.0],[78.0,530.0],[78.0,670.0],[84.0,689.0],[93.0,702.0],[106.0,713.0],[339.0,851.0],[347.0,853.0],[348.0,665.0],[352.0,649.0],[368.0,624.0],[379.0,614.0],[701.0,431.0],[737.0,414.0],[756.0,411.0],[786.0,414.0],[879.0,461.0],[884.0,461.0],[884.0,291.0]],"cyan":[[884.0,522.0],[788.0,470.0],[765.0,464.0],[742.0,466.0],[704.0,484.0],[416.0,648.0],[400.0,669.0],[394.0,695.0],[395.0,879.0],[458.0,915.0],[481.0,920.0],[506.0,916.0],[861.0,710.0],[875.0,695.0],[881.0,683.0],[884.0,669.0]]};
/* ===== mascote Forklin: um garfo-personagem com corpo, braços e poses =====
   Uso: FORKY({ pose: 'wave', tone: 'edu' | 'sales', look: [dx, dy] }) devolve o SVG. */
function FORKY(o) {
  o = o || {};
  var tone = o.tone || 'edu', pose = o.pose || 'stand', id = 'fk' + (FORKY.n = (FORKY.n || 0) + 1);
  var C = tone === 'sales' ? { a: '#A6EEFF', b: '#10C7FC', c: '#0795E0', h: '#D6DCFF' } : { a: '#A7B4FF', b: '#475DFB', c: '#2F3FD0', h: '#6FE3FF' };
  var INK = '#0A1433';
  var POSES = {
    stand: { L: [50, 252, 46, 226], R: [150, 252, 154, 226], mouth: 'smile' },
    wave:  { L: [50, 252, 46, 226], R: [170, 148, 178, 198], mouth: 'open', wave: true },
    point: { L: [50, 252, 46, 226], R: [190, 208, 160, 216], mouth: 'smile', look: [3, 0] },
    hold:  { L: [86, 240, 58, 240], R: [114, 240, 142, 240], mouth: 'smile', card: true },
    cheer: { L: [34, 126, 34, 190], R: [166, 126, 166, 190], mouth: 'open' },
    think: { L: [52, 252, 46, 226], R: [118, 182, 160, 214], mouth: 'flat', look: [-2, -4] },
    lost:  { L: [58, 110, 30, 172], R: [142, 110, 170, 172], mouth: 'wavy', look: [-3, 0], q: true },
    peek:  { peek: true, mouth: 'smile' }
  };
  var P = POSES[pose] || POSES.stand, look = o.look || P.look || [0, 0], lx = look[0], ly = look[1];
  var S = (typeof SHAPES !== 'undefined') ? SHAPES : null;
  function path(n) { return 'M' + S[n].map(function (p) { return p[0] + ' ' + p[1]; }).join('L') + 'Z'; }
  var g = 'url(#' + id + ')';
  var s = '<svg class="fk" viewBox="' + (P.peek ? '20 28 160 206' : '0 0 200 300') + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="100" y1="40" x2="100" y2="270"><stop offset="0" stop-color="' + C.a + '"/><stop offset=".55" stop-color="' + C.b + '"/><stop offset="1" stop-color="' + C.c + '"/></linearGradient></defs>';
  if (!P.peek) {
    /* pernas e pés */
    s += '<g stroke="' + C.c + '" stroke-width="12" stroke-linecap="round" fill="none"><path d="M89 258 L85 288"/><path d="M111 258 L115 288"/></g><ellipse cx="80" cy="292" rx="14" ry="7" fill="' + C.c + '"/><ellipse cx="120" cy="292" rx="14" ry="7" fill="' + C.c + '"/>';
    /* corpo (cabo do garfo) */
    s += '<path d="M68 172 C68 204 82 214 82 248 Q82 264 100 264 Q118 264 118 248 C118 214 132 204 132 172 Z" fill="' + g + '"/>';
    /* peito com o símbolo da Forklin */
    s += '<circle cx="100" cy="218" r="14" fill="#fff" fill-opacity=".92"/>';
    if (S) s += '<g transform="translate(89 207) scale(.0229)"><path d="' + path('ink') + '" fill="#0A1433"/><path d="' + path('indigo') + '" fill="#475DFB"/><path d="' + path('cyan') + '" fill="#10C7FC"/></g>';
  }
  /* cabeça de garfo: três dentes + rosto */
  s += '<rect x="44" y="100" width="112" height="86" rx="38" fill="' + g + '"/>';
  s += '<g fill="' + g + '"><rect x="50" y="38" width="30" height="96" rx="15"/><rect x="85" y="38" width="30" height="96" rx="15"/><rect x="120" y="38" width="30" height="96" rx="15"/></g>';
  s += '<g fill="#fff" fill-opacity=".5"><rect x="58" y="50" width="6" height="34" rx="3"/><rect x="93" y="50" width="6" height="34" rx="3"/><rect x="128" y="50" width="6" height="34" rx="3"/></g>';
  s += '<g class="fe"><rect x="' + (74 + lx) + '" y="' + (131 + ly) + '" width="13" height="23" rx="6.5" fill="' + INK + '"/><rect x="' + (113 + lx) + '" y="' + (131 + ly) + '" width="13" height="23" rx="6.5" fill="' + INK + '"/></g>';
  var mouth = { smile: '<path d="M87 166 Q100 178 113 166" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round" fill="none"/>',
    open: '<path d="M85 163 Q100 189 115 163 Z" fill="' + INK + '"/><path d="M92 176 Q100 183 108 176 Q100 172 92 176 Z" fill="#FF8FB1"/>',
    flat: '<path d="M91 169 H109" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>',
    wavy: '<path d="M86 169 q7 -7 14 0 t14 0" stroke="' + INK + '" stroke-width="4" stroke-linecap="round" fill="none"/>' }[P.mouth || 'smile'];
  s += mouth;
  /* braços e mãos */
  function arm(a, cls) { return '<g' + (cls ? ' class="' + cls + '"' : '') + '><path d="M' + (a === P.L ? 70 : 130) + ' 198 Q' + a[2] + ' ' + a[3] + ' ' + a[0] + ' ' + a[1] + '" stroke="' + C.b + '" stroke-width="15" stroke-linecap="round" fill="none"/><circle cx="' + a[0] + '" cy="' + a[1] + '" r="12" fill="' + C.h + '"/></g>'; }
  if (P.peek) {
    s += '<ellipse cx="62" cy="206" rx="22" ry="15" fill="' + C.h + '"/><ellipse cx="138" cy="206" rx="22" ry="15" fill="' + C.h + '"/>';
  } else {
    s += arm(P.L) + arm(P.R, P.wave ? 'wv' : '');
    if (P.card) s += '<g><rect x="70" y="228" width="60" height="40" rx="9" fill="#fff" stroke="' + INK + '" stroke-width="2"/><rect x="78" y="238" width="30" height="5" rx="2.5" fill="' + C.b + '"/><rect x="78" y="249" width="42" height="4" rx="2" fill="#C9D0E4"/><rect x="78" y="257" width="34" height="4" rx="2" fill="#C9D0E4"/></g>';
    if (P.q) s += '<g><rect x="132" y="22" width="40" height="34" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="2"/><text x="152" y="47" text-anchor="middle" font-family="Montserrat, Arial" font-weight="700" font-size="22" fill="' + INK + '">?</text></g>';
  }
  return s + '</svg>';
}

  var stage = document.getElementById('stage'), fit = document.getElementById('fit');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement, clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* escala do palco (o desenho aprovado tem 1240px de conteúdo) */
  function fitScale() {
    var cs = getComputedStyle(document.body), w = document.body.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var byH = Math.max(.7, Math.min(1, window.innerHeight / 820));
    root.style.setProperty('--s', Math.min(w / 1240, byH, 1).toFixed(4));
    root.style.setProperty('--vs', Math.min(1, w / 720).toFixed(4));
    root.style.setProperty('--s3s', Math.min(1, w / 758).toFixed(4));
  }
  fitScale(); window.addEventListener('resize', fitScale);

  /* ===== arte viva: amanhecer em pixels, com o símbolo nascendo ===== */
  var cv = document.getElementById('dawn'), ctx = cv.getContext('2d');
  var W = 200, H = 217; cv.width = W; cv.height = H;
  var img = ctx.createImageData(W, H), buf = img.data;
  var RAMP = [[5,10,28],[10,20,51],[22,37,107],[40,56,151],[71,93,251],[42,146,251],[16,199,252],[155,235,255]];
  var BAY = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21].map(function (v) { return (v + .5) / 64; });
  function rnd(i) { var h = Math.sin(i * 127.1 + 311.7) * 43758.5453; return h - Math.floor(h); }
  /* textura de ruído suave, repetível */
  var N = 128, tex = new Float32Array(N * N), g = 16, grid = new Float32Array(g * g);
  for (var i = 0; i < g * g; i++) grid[i] = rnd(i + 3.3);
  for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
    var fx = x / N * g, fy = y / N * g, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
    var a = grid[(y0 % g) * g + (x0 % g)], b = grid[(y0 % g) * g + ((x0 + 1) % g)], c = grid[((y0 + 1) % g) * g + (x0 % g)], d = grid[((y0 + 1) % g) * g + ((x0 + 1) % g)];
    tex[y * N + x] = a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
  }
  function samp(x, y) { var xi = ((Math.floor(x) % N) + N) % N, yi = ((Math.floor(y) % N) + N) % N; return tex[yi * N + xi]; }
  var stars = new Float32Array(W * H);
  for (var s = 0; s < 52; s++) { var sx = Math.floor(rnd(s + 1.7) * W), sy = Math.floor(rnd(s + 9.1) * H * .45); stars[sy * W + sx] = 1 + rnd(s + 4.4) * 6; }
  /* sprite do símbolo */
  var SPR = 84, oc = document.createElement('canvas'); oc.width = oc.height = SPR; var o = oc.getContext('2d');
  var cols = { ink: '#0A1433', indigo: '#475DFB', cyan: '#10C7FC' };
  ['ink', 'indigo', 'cyan'].forEach(function (n) {
    o.fillStyle = cols[n]; o.beginPath();
    SHAPES[n].forEach(function (p, i) { var x = (p[0] - 70) / 830 * SPR, y = (p[1] - 30) / 830 * SPR; if (i) o.lineTo(x, y); else o.moveTo(x, y); });
    o.closePath(); o.fill();
  });
  var sp = o.getImageData(0, 0, SPR, SPR).data;
  var hY = H * .60, h1 = new Float32Array(W), h2 = new Float32Array(W), h3 = new Float32Array(W);
  function pick(v, bx) { v = v < 0 ? 0 : v > 7 ? 7 : v; var b = v | 0, f = v - b; if (b >= 7) return RAMP[7]; return RAMP[f > bx ? b + 1 : b]; }
  function easeOut(x) { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3.2); }
  function draw(t) {
    var rise = easeOut((t - 1.3) / 3.6);
    var yFinal = H * .20, yStart = hY - SPR * .02;
    var sx0 = Math.round(W * .5 - SPR / 2), sy0 = Math.round(yStart + (yFinal - yStart) * rise + Math.sin(t * .6) * 1.3 * rise);
    var scx = sx0 + SPR / 2, scy = sy0 + SPR / 2, glowK = 0.35 + 0.65 * rise;
    for (var x = 0; x < W; x++) {
      h1[x] = hY + 2 + 5 * Math.sin(x * .034 + 1 + t * .16) + 3.2 * Math.sin(x * .09 - .5 - t * .1);
      h2[x] = H * .75 + 8 * Math.sin(x * .024 + 2.1 + t * .3) + 3.5 * Math.sin(x * .07 + .3 + t * .2);
      h3[x] = H * .88 + 10 * Math.sin(x * .017 + 3.5 + t * .5) + 4 * Math.sin(x * .052 + .9 + t * .35);
    }
    for (var y = 0; y < H; y++) {
      var yN = y / hY; if (yN > 1) yN = 1;
      var base = .3 + 4.6 * Math.pow(yN, 1.9);
      var band = clamp((yN - .25) * 4, 0, 1) * clamp((.85 - yN) * 5, 0, 1);
      for (var x2 = 0; x2 < W; x2++) {
        var bx = BAY[(y & 7) * 8 + (x2 & 7)];
        var dx = x2 - scx, dy = y - scy;
        var v = base + 1.0 * glowK * Math.exp(-(dx * dx + dy * dy) / (SPR * SPR * .9));
        if (band > 0) {
          var cn = .65 * samp(x2 * .55 + t * 7, y * .6) + .35 * samp(x2 * 1.3 + t * 15 + 40, y * 1.2 + 11);
          var cc = (cn - .55) * 5; if (cc > 0) v += (cc > 1 ? 1 : cc) * band * 1.3;
        }
        var col = pick(v, bx);
        var st = stars[y * W + x2];
        if (st && y < hY * .75 && Math.sin(t * 1.4 + st) > -.15) col = RAMP[7];
        var spx = x2 - sx0, spy = y - sy0;
        if (spx >= 0 && spy >= 0 && spx < SPR && spy < SPR) { var si = (spy * SPR + spx) * 4; if (sp[si + 3] > 140) col = [sp[si], sp[si + 1], sp[si + 2]]; }
        var d1 = y - h1[x2], d2 = y - h2[x2], d3 = y - h3[x2];
        if (d1 > 0) col = pick(3.4 - d1 * .018 + (d1 < 2 ? 1.8 : 0), bx);
        if (d2 > 0) col = pick(2.2 - d2 * .02 + (d2 < 2 ? 1.1 : 0), bx);
        if (d3 > 0) col = pick(1 - d3 * .012 + (d3 < 2 ? .9 : 0), bx);
        var k = (y * W + x2) * 4; buf[k] = col[0]; buf[k + 1] = col[1]; buf[k + 2] = col[2]; buf[k + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ===== laço principal: arte, profundidade do mouse, rolagem ===== */
  var t0 = performance.now(), last = 0, raf = 0, paused = false, mx = 0, my = 0, sx = 0, sy = 0, scr = 0, pausedAt = 0, offset = 0;
  stage.addEventListener('pointermove', function (e) {
    var r = fit.getBoundingClientRect(); mx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1); my = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
  });
  stage.addEventListener('pointerleave', function () { mx = 0; my = 0; });
  window.addEventListener('scroll', function () { scr = clamp(window.scrollY / 600, 0, 1); }, { passive: true });
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (paused) return;
    sx += (mx - sx) * .06; sy += (my - sy) * .06;
    stage.style.setProperty('--px', sx.toFixed(3)); stage.style.setProperty('--py', sy.toFixed(3));
    stage.style.setProperty('--sp', (reduce ? 0 : scr).toFixed(3));
    if (now - last > 46) { last = now; draw((now - t0) / 1000 - offset); }
  }
  if (reduce) { draw(99); } else { raf = requestAnimationFrame(loop); }

  /* ===== chip que troca de palavra (equipe, escola, rede, secretaria) ===== */
  var roll = document.getElementById('roll'), wds = roll.querySelectorAll('.wd'), cur = 0, timer = 0;
  function setW(i) { roll.style.width = wds[i].offsetWidth + 'px'; }
  function startChip() {
    clearInterval(timer);
    wds.forEach(function (w, k) { w.classList.toggle('on', k === 0); w.classList.remove('out'); });
    cur = 0; setW(0);
    if (reduce) return;
    timer = setInterval(function () {
      if (paused) return;
      var nx = (cur + 1) % wds.length, a = wds[cur], b = wds[nx];
      a.classList.remove('on'); a.classList.add('out');
      b.classList.remove('out'); b.style.transition = 'none'; b.style.transform = 'translateY(115%)'; void b.offsetWidth; b.style.transition = ''; b.style.transform = '';
      b.classList.add('on'); setW(nx); cur = nx;
    }, 3300);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(startChip); else startChip();

  /* ===== cartão que alterna entre Education e Sales ===== */
  var fcs = [document.getElementById('fc1'), document.getElementById('fc2')], fcI = 0;
  if (!reduce) setInterval(function () {
    if (paused) return;
    fcs[fcI].classList.remove('on'); fcI = (fcI + 1) % 2; fcs[fcI].classList.add('on');
    var p = fcs[fcI].querySelector('.ck path'); if (p) { p.style.animation = 'none'; void p.getBoundingClientRect(); p.style.animation = 'stroke .5s ease-out .3s both'; }
  }, 4800);

  /* ===== mascote: montagem e poses ===== */
  document.getElementById('heroFk').innerHTML = FORKY({ pose: 'peek', tone: 'edu' });
  var bps = [].slice.call(document.querySelectorAll('.bp')), bgfk = document.getElementById('bgfk');
  bps.forEach(function (g) { g.innerHTML = FORKY({ pose: g.getAttribute('data-pose'), tone: g.getAttribute('data-tone') }); });
  var gps = [].slice.call(document.querySelectorAll('.gp'));
  gps.forEach(function (g) { g.innerHTML = FORKY({ pose: g.getAttribute('data-pose'), tone: g.getAttribute('data-tone') }); });

  /* ===== seção 2: faixa que corre, mãos que se aproximam com a rolagem, símbolo que se monta ===== */
  var s2 = document.getElementById('s2'), mark = document.getElementById('mark'), track = document.getElementById('track');
  var D = function (n) { return 'M' + SHAPES[n].map(function (p) { return p[0] + ' ' + p[1]; }).join('L') + 'Z'; };
  mark.innerHTML = '<defs><linearGradient id="mi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A52C4"/><stop offset="1" stop-color="#0A1433"/></linearGradient><linearGradient id="md" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7486FF"/><stop offset="1" stop-color="#2F3FD0"/></linearGradient><linearGradient id="mc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6FE3FF"/><stop offset="1" stop-color="#0795E0"/></linearGradient></defs>' +
    '<g class="sl sa"><path d="' + D('ink') + '" fill="url(#mi)"/></g><g class="sl sb"><path d="' + D('indigo') + '" fill="url(#md)"/></g><g class="sl sc"><path d="' + D('cyan') + '" fill="url(#mc)"/></g>';
  var IC = {
    book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z"/><path d="M9 8h6M9 12h4"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18"/><circle cx="17" cy="14.5" r="1.2"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3M21 14v1M14 21h3M21 18v3"/>',
    ticket: '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
    lib: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16 6l3.6-1 2.4 13.4-3.6 1z"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.4.2 4 2 4 5.8"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4M17 19h4"/>'
  };
  var items = [['book', 'Diário Digital'], ['wallet', 'APM Digital'], [0, '0%', 'de taxa da Forklin sobre o Pix'], ['qr', 'Patrimônio'], [0, '1', 'clique para o PDF oficial'], ['ticket', 'Fichas'], ['users', 'CRM'], ['bolt', 'Automações'], [0, '1', 'conta para os seus sistemas'], ['lib', 'Biblioteca'], ['spark', 'IA comercial'], [0, '50', 'professores convidados por planilha']];
  var grp = items.map(function (it) {
    if (it[0]) return '<span class="it"><svg viewBox="0 0 24 24">' + IC[it[0]] + '</svg>' + it[1] + '</span>';
    return '<span class="it"><span class="n">' + it[1] + '</span><span class="t">' + it[2] + '</span></span>';
  }).join('');
  track.innerHTML = '<div class="grp">' + grp + '</div><div class="grp">' + grp + '</div>';

  if ('IntersectionObserver' in window && !reduce) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) s2.classList.add('in'); }); }, { threshold: .18 }).observe(s2);
  } else { s2.classList.add('in'); }
  var hCur = reduce ? 1 : 0;
  function ease(x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function s2loop() {
    requestAnimationFrame(s2loop);
    var r = s2.getBoundingClientRect(), vh = window.innerHeight;
    var vy = r.top + 330;                                   /* altura (na tela) da ponta dos dedos */
    var pin = reduce ? 1 : clamp((vh * 1.0 - vy) / (vh * .48), 0, 1);   /* entra enquanto a seção sobe */
    var e = ease(pin);                                      /* entram com a rolagem e ficam */
    hCur += (e - hCur) * .16;
    s2.style.setProperty('--h', hCur.toFixed(3));
    s2.classList.toggle('joined', reduce || hCur > .93);
  }
  s2loop();


  /* ===== cards: mini-interfaces que se preenchem sozinhas ===== */
  function onceIn(el, fn) { if ('IntersectionObserver' in window && !reduce) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); el.classList.add('go'); fn(); } }, { threshold: .35 }); io.observe(el); } else { el.classList.add('go'); fn(true); } }
  var timers = [];
  function later(fn, ms) { var id = setTimeout(function () { if (!paused) fn(); else later(fn, 300); }, ms); timers.push(id); return id; }
  /* 1: e-mail digitado, botão confirma, sistemas acendem */
  onceIn(document.getElementById('b1'), function (still) {
    var mail = document.getElementById('mail'), btn = document.getElementById('mbtn'), apps = document.querySelectorAll('#mapps .m-app'), txt = 'maria@escola.com.br';
    function full() { mail.textContent = txt; btn.classList.add('ok'); apps.forEach(function (a) { a.classList.add('on'); }); }
    if (still) return full();
    function run() {
      mail.textContent = ''; btn.classList.remove('ok'); apps.forEach(function (a) { a.classList.remove('on'); });
      for (var i = 0; i < txt.length; i++) (function (i) { later(function () { mail.textContent = txt.slice(0, i + 1); }, 400 + i * 55); })(i);
      var t1 = 400 + txt.length * 55 + 350;
      later(function () { btn.classList.add('ok'); }, t1);
      apps.forEach(function (a, k) { later(function () { a.classList.add('on'); }, t1 + 450 + k * 260); });
      later(run, t1 + 450 + apps.length * 260 + 4200);
    }
    run();
  });
  /* 2: cargos trocam e os módulos liberam ou travam */
  onceIn(document.getElementById('b2'), function (still) {
    var roles = document.querySelectorAll('#mroles .m-role'), mods = document.querySelectorAll('#mmods .m-mod');
    var M = [[1, 1, 0, 0], [1, 0, 1, 1], [1, 0, 0, 0], [0, 0, 0, 1]], k = 0;
    function show(i) { roles.forEach(function (r, n) { r.classList.toggle('on', n === i); }); mods.forEach(function (m, n) { m.classList.toggle('ok', !!M[i][n]); }); }
    show(0); if (still) return;
    setInterval(function () { if (paused) return; k = (k + 1) % 4; show(k); }, 2600);
  });
  onceIn(document.getElementById('b3'), function () {});
  onceIn(document.getElementById('b4'), function () {});

  /* ===== seção 3: a rolagem transforma a bagunça em sistema ===== */
  var s3 = document.getElementById('s3'), stg = document.getElementById('stg');
  var notes = [].slice.call(stg.querySelectorAll('.nt')), dash = document.getElementById('dash'), ph3 = document.getElementById('ph3');
  var kpis = [].slice.call(dash.querySelectorAll('.kp b')), cells = [].slice.call(dash.querySelectorAll('[data-t]'));
  var studs = [].slice.call(ph3.querySelectorAll('.stu')), cnt = document.getElementById('cnt'), sv = document.getElementById('sv'), tst = document.getElementById('tst'), kstu = document.getElementById('kstu');
  var stepLis = [].slice.call(document.querySelectorAll('#steps li')), sfill = document.getElementById('sfill');
  var NC = [[40, 40, -7], [500, 34, 5], [40, 250, 4], [520, 230, -4], [300, 480, 6], [60, 470, -6]];
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var rg = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
  var eo = function (x) { return 1 - Math.pow(1 - x, 3); };
  var pCur = reduce ? 1 : 0;
  function s3render(p) {
    notes.forEach(function (n, i) {
      var c = NC[i], q = eo(rg(p, .20 + i * .012, .46)), vis = eo(rg(p, 0, .10 + i * .01)) * (1 - rg(q, .72, 1));
      var drift = (1 - rg(p, 0, .22)) * 0, x = lerp(c[0], 330, q), y = lerp(c[1] + (i % 2 ? 1 : -1) * p * 70, 250, q), r = lerp(c[2], 0, q), s = lerp(1, .22, q);
      n.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + r.toFixed(2) + 'deg) scale(' + s.toFixed(3) + ')';
      n.style.opacity = (reduce ? 0 : vis).toFixed(3);
    });
    var d = eo(rg(p, .30, .52));
    dash.style.opacity = d.toFixed(3); dash.style.transform = 'translateY(' + ((1 - d) * 26).toFixed(1) + 'px) scale(' + (.94 + .06 * d).toFixed(3) + ')';
    kpis.forEach(function (b, i) { var tgt = +b.getAttribute('data-k'); b.textContent = Math.round(tgt * eo(rg(p, .48 + i * .02, .60 + i * .02))); });
    cells.forEach(function (c, i) {
      var row = Math.floor(i / 4), st = .56 + row * .042, full = c.getAttribute('data-t'), k = Math.ceil(full.length * rg(p, st + (i % 4) * .008, st + .03 + (i % 4) * .008));
      c.textContent = full.slice(0, k);
    });
    var ph = eo(rg(p, .70, .82)); ph3.style.opacity = ph.toFixed(3); ph3.style.transform = 'translateY(' + ((1 - ph) * 140).toFixed(1) + 'px) rotate(' + ((1 - ph) * 5).toFixed(2) + 'deg)';
    studs.forEach(function (s, i) { s.classList.toggle('on', p > .82 + i * .022); });
    var n28 = Math.round(28 * eo(rg(p, .82, .95))); cnt.textContent = n28 + ' de 30 presentes';
    sv.classList.toggle('on', p > .955); sv.textContent = p > .955 ? 'Chamada salva ✓' : 'Salvar chamada';
    tst.classList.toggle('on', p > .965); kstu.classList.toggle('pulse', p > .965);
    var step = p < .30 ? 0 : p < .70 ? 1 : 2; stepLis.forEach(function (li, i) { li.classList.toggle('on', i === step); }); gps.forEach(function (g, i) { g.classList.toggle('on', i === step); }); bps.forEach(function (g, i) { g.classList.toggle('on', i === step); }); bgfk.style.transform = 'translateY(' + (p * -50).toFixed(1) + 'px)';
    sfill.style.height = 'calc(' + (p * 100).toFixed(1) + '% - 12px)';
  }
  function s3loop() {
    requestAnimationFrame(s3loop);
    var r = s3.getBoundingClientRect(), vh = window.innerHeight, span = Math.max(1, r.height - vh);
    var target = reduce ? 1 : clamp(-r.top / (span * .88), 0, 1);
    pCur += (target - pCur) * .22; if (Math.abs(target - pCur) < .0005) pCur = target;
    s3render(pCur);
  }
  s3loop();

  /* ===== seção 4: as duas frentes ===== */
  var s4 = document.getElementById('s4');
  var fr4 = document.querySelector('.fr'), p4 = 0, tg4 = 0, run4 = false;
  function s4step() {
    var d = tg4 - p4;
    if (Math.abs(d) < .0005) { p4 = tg4; run4 = false; } else { p4 += d * .14; requestAnimationFrame(s4step); }
    fr4.style.setProperty('--p4', p4.toFixed(4));
  }
  function s4calc() {
    var r = fr4.getBoundingClientRect(), x = clamp((innerHeight * .9 - r.top) / (innerHeight * .5), 0, 1);
    tg4 = reduce ? 1 : x * x * (3 - 2 * x);
    if (!run4) { run4 = true; requestAnimationFrame(s4step); }
  }
  window.addEventListener('scroll', s4calc, { passive: true }); window.addEventListener('resize', s4calc); s4calc();
  if ('IntersectionObserver' in window && !reduce) { new IntersectionObserver(function (es) { if (es[0].isIntersecting) s4.classList.add('in'); }, { threshold: .22 }).observe(s4); } else { s4.classList.add('in'); }

  /* ===== seção 5: feedbacks em três fileiras (exemplos, trocar pelos reais) ===== */
  var FB = [
    [['Mariana Alves', 'Secretária · Escola municipal', 'A chamada que tomava a manhã inteira agora fecha em poucos minutos. E o PDF já sai pronto.', 24, 'há 2 d'],
     ['Rafael Costa', 'Diretor de escola', 'Pela primeira vez vejo a frequência de todas as turmas num lugar só.', 18, 'há 3 d'],
     ['Luciana Prado', 'Professora do 5º ano', 'Faço a chamada pelo celular, ali na sala. Simples assim.', 31, 'há 4 d'],
     ['André Lima', 'Gestor de rede de ensino', 'Um login só para tudo. A equipe se acostumou rápido.', 12, 'há 5 d'],
     ['Patrícia Souza', 'Tesoureira da APM', 'Prestar contas para as famílias ficou muito mais transparente.', 27, 'há 1 sem']],
    [['Eduardo Nunes', 'Coordenador comercial', 'Meu time parou de perder lead em planilha. Cada negócio no seu lugar.', 22, 'há 1 d'],
     ['Camila Ribeiro', 'Secretaria de escola', 'Importei os alunos por planilha e em minutos estava tudo cadastrado.', 15, 'há 2 d'],
     ['Thiago Barros', 'Vendedor externo', 'Atualizo o negócio pelo celular, na rua, sem voltar para a mesa.', 19, 'há 4 d'],
     ['Helena Duarte', 'Coordenadora pedagógica', 'Os alertas de frequência chegam antes de virar problema.', 33, 'há 6 d'],
     ['Marcos Vieira', 'Responsável pelo patrimônio', 'Cada item com seu QR Code. Sei onde está e com quem.', 14, 'há 1 sem']],
    [['Beatriz Moraes', 'Diretora', 'Menos papel, menos retrabalho. A equipe agradece.', 29, 'há 2 d'],
     ['Gustavo Pinto', 'Gerente comercial', 'Os números do funil sem montar relatório na mão.', 16, 'há 3 d'],
     ['Renata Freitas', 'Professora', 'Registro o conteúdo da aula na hora e o diário se completa sozinho.', 21, 'há 5 d'],
     ['Paulo Mendes', 'Organizador de festa junina', 'O caixa fechou sem divergência pela primeira vez.', 25, 'há 1 sem'],
     ['Larissa Campos', 'Bibliotecária', 'Empréstimo e devolução em dois toques. Acabou o caderno.', 13, 'há 1 sem']]
  ];
  var HEART = '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
  function fxCard(c, i, k) {
    var tone = (i + 2 * k) % 5, cls = tone === 1 ? ' ink' : tone === 4 ? ' ind' : '';
    var ini = c[0].split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2);
    return '<div class="fxc' + cls + '"><div class="fxu"><span class="fxa"><span>' + ini + '</span></span><div><b>' + c[0] + '</b><small>' + c[1] + '</small></div><em class="fxd">' + c[4] + '</em></div><p>' + c[2] + '</p><div class="fxf"><span class="lk' + (i % 3 === 0 ? ' on' : '') + '">' + HEART + c[3] + '</span><span>Responder</span></div></div>';
  }
  var fxst = document.getElementById('fxst');
  fxst.innerHTML = FB.map(function (row, k) {
    var g = row.map(function (c, i) { return fxCard(c, i, k); }).join('');
    return '<div class="fxr d' + (k + 1) + (k === 1 ? ' rev' : '') + '"><div class="fxt">' + g + g + '</div></div>';
  }).join('');
  var fxs = document.getElementById('fxs');
  if ('IntersectionObserver' in window && !reduce) { new IntersectionObserver(function (es) { if (es[0].isIntersecting) fxs.classList.add('in'); }, { threshold: .2 }).observe(fxs); } else { fxs.classList.add('in'); }

  /* ===== seção 6: FAQ (respostas tiradas dos PDFs e do site) ===== */
  var FQ = [
    ['O que é a Forklin?', 'Um ecossistema com duas frentes: o For Education, para escolas e redes de ensino, e o For Sales, para equipes comerciais. Cada organização usa só a frente que faz sentido, com a conta Forklin, e cada pessoa vê só o que o seu cargo permite.'],
    ['Preciso contratar todos os sistemas?', 'Não. Você escolhe só os que fazem sentido para a sua realidade. E se o que você precisa ainda não existe, a Forklin desenvolve um sistema sob medida, com a exclusividade definida em contrato.'],
    ['Funciona no celular?', 'Sim. Os sistemas funcionam pelo navegador, no computador, no tablet ou no celular. O professor, por exemplo, faz a chamada pelo celular e a secretaria acompanha no computador.'],
    ['Os dados da minha escola ficam separados dos de outras?', 'Sim. Cada escola ou organização só vê os próprios dados, e isso é garantido pelo próprio banco de dados, não só pela tela.'],
    ['Como as pessoas entram no sistema?', 'Pela conta Forklin, sem digitar a senha de novo em cada sistema. Ninguém define a senha de outra pessoa: cada um recebe um link por e-mail para criar a própria.'],
    ['A Forklin cobra taxa sobre o Pix das famílias?', 'Não. A Forklin não cobra porcentagem sobre os Pix da APM. A única tarifa é a do provedor de pagamento, e o dinheiro cai direto na conta da APM.'],
    ['O que o For Sales oferece?', 'CRM com contatos, leads e negócios, cadências e automações, WhatsApp e telefonia dentro do CRM, dashboards comerciais e IA comercial. Tudo na mesma conta Forklin, pensado para equipes de vendas.'],
    ['Quanto custa?', 'Depende dos sistemas que você escolhe e do tamanho da operação, por isso trabalhamos com orçamento sem compromisso. Conte como é hoje e a equipe indica o melhor caminho.'],
    ['Vocês ajudam a sair da planilha e do papel?', 'Sim. A transição do manual para o digital faz parte do trabalho, com suporte no dia a dia. No Diário Digital, por exemplo, dá para importar estudantes e professores por planilha Excel, até 50 por arquivo.']
  ];
  var fqlist = document.getElementById('fqlist');
  fqlist.innerHTML = FQ.map(function (q, i) {
    return '<div class="fqi' + (i === 0 ? ' open' : '') + '" style="--i:' + i + '"><button class="fqq" type="button" aria-expanded="' + (i === 0) + '" aria-controls="fqa' + i + '">' + q[0] + '<i><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></i></button><div class="fqa" id="fqa' + i + '" role="region"><div><p>' + q[1] + '</p></div></div></div>';
  }).join('');
  var fps = [].slice.call(document.querySelectorAll('#fqm .fp')), fpT = 0;
  fps.forEach(function (g) { g.innerHTML = FORKY({ pose: g.getAttribute('data-pose'), tone: 'edu' }); });
  function fpShow(i) { fps.forEach(function (g, k) { g.classList.toggle('on', k === i); }); }
  fqlist.addEventListener('click', function (e) {
    var b = e.target.closest('.fqq'); if (!b) return;
    var item = b.parentNode, was = item.classList.contains('open');
    [].slice.call(fqlist.querySelectorAll('.fqi')).forEach(function (x) { x.classList.remove('open'); x.querySelector('.fqq').setAttribute('aria-expanded', 'false'); });
    if (!was) { item.classList.add('open'); b.setAttribute('aria-expanded', 'true'); if (!reduce) { fpShow(1); clearTimeout(fpT); fpT = setTimeout(function () { fpShow(0); }, 1500); } }
    else { fpShow(0); }
  });
  var fqs = document.getElementById('fqs');
  if ('IntersectionObserver' in window && !reduce) { new IntersectionObserver(function (es) { if (es[0].isIntersecting) fqs.classList.add('in'); }, { threshold: .18 }).observe(fqs); } else { fqs.classList.add('in'); }

  /* ===== orçamento: primeiro a frente, depois os sistemas dela; o pedido vira uma mensagem de WhatsApp ===== */
  var oqs = document.getElementById('oqs'), oqF = document.getElementById('oqF'), oqS = document.getElementById('oqS'), oqP = document.getElementById('oqP'), oqGo = document.getElementById('oqGo'), oqProd = document.getElementById('oqProd'), oqSize = document.getElementById('oqSize');
  var OQ = {
    edu: { name: 'For Education', items: [['Diário Digital'], ['APM Digital'], ['Sistema de Fichas'], ['Biblioteca'], ['Controle de Patrimônio'], ['Tutor IA']] },
    sales: { name: 'For Sales', items: [['CRM'], ['Cadências e automações'], ['WhatsApp e telefonia'], ['Dashboards comerciais'], ['IA comercial']] },
    custom: { name: 'Sob medida', items: [['Sistema do zero'], ['Integrações'], ['Fluxos e automações'], ['Permissões e acessos']] }
  };
  var oqSt = { f: null, p: [], s: null };
  var eduImg = document.querySelector('.fc4.edu .top4 img'), salImg = document.querySelector('.fc4.sales .top4 img');
  if (eduImg) oqs.querySelector('.oq-op[data-v="edu"] img').src = eduImg.src;
  if (salImg) oqs.querySelector('.oq-op[data-v="sales"] img').src = salImg.src;
  function oqRender() {
    var steps = oqs.querySelectorAll('.oq-st'), open = [true, !!oqSt.f, oqSt.p.length > 0], done = [!!oqSt.f, oqSt.p.length > 0, oqSt.s !== null];
    [].forEach.call(steps, function (el, i) { el.classList.toggle('open', open[i]); el.classList.toggle('done', done[i]); });
    [].forEach.call(oqs.querySelectorAll('.oq-op'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === oqSt.f)); });
    [].forEach.call(oqSize.children, function (b, i) { b.setAttribute('aria-pressed', String(i === oqSt.s)); });
    [].forEach.call(oqProd.children, function (b) { b.setAttribute('aria-pressed', String(oqSt.p.indexOf(b.getAttribute('data-n')) > -1)); });
    var f = oqSt.f && OQ[oqSt.f], size = oqSt.s !== null ? oqSize.children[oqSt.s].textContent : null;
    function put(el, v, ph) { el.textContent = v || ph; el.className = v ? '' : 'ph'; }
    put(oqF, f && f.name, 'Escolha uma'); put(oqS, oqSt.p.join(', '), 'Escolha ao menos um'); put(oqP, size ? size + ' pessoas' : '', 'Escolha o tamanho');
    var ready = !!(f && oqSt.p.length && size);
    oqGo.setAttribute('aria-disabled', String(!ready));
    var msg = 'Olá! Quero um orçamento da Forklin.\n\nFrente: ' + (f ? f.name : '') + '\nSistemas: ' + oqSt.p.join(', ') + '\nPessoas usando: ' + (size || '') + '\n\nPodem me ajudar?';
    oqGo.href = ready ? 'https://wa.me/5511927416747?text=' + encodeURIComponent(msg) : 'https://wa.me/5511927416747';
  }
  oqs.addEventListener('click', function (e) {
    var op = e.target.closest('.oq-op'), pb = e.target.closest('.oq-ch button'), sb = e.target.closest('.oq-sg button');
    if (op) {
      var v = op.getAttribute('data-v'); if (v !== oqSt.f) {
        oqSt.f = v; oqSt.p = [];
        oqProd.innerHTML = OQ[v].items.map(function (it) { return '<button type="button" data-n="' + it[0] + '" aria-pressed="false">' + it[0] + '' + '</button>'; }).join('');
      }
    } else if (pb) {
      var n = pb.getAttribute('data-n'), i = oqSt.p.indexOf(n);
      if (i > -1) oqSt.p.splice(i, 1); else oqSt.p.push(n);
    } else if (sb) { oqSt.s = [].indexOf.call(oqSize.children, sb); }
    else return;
    oqRender();
  });
  oqGo.addEventListener('click', function (e) { if (oqGo.getAttribute('aria-disabled') === 'true') e.preventDefault(); });
  oqRender();
  if ('IntersectionObserver' in window && !reduce) { new IntersectionObserver(function (es) { if (es[0].isIntersecting) oqs.classList.add('in'); }, { threshold: .15 }).observe(oqs); } else { oqs.classList.add('in'); }

  /* ===== logos das frentes no hero ===== */
  (function () {
    var e = document.querySelector('.fc4.edu .top4 img'), s = document.querySelector('.fc4.sales .top4 img');
    if (e) document.getElementById('hfEdu').src = e.src;
    if (s) document.getElementById('hfSal').src = s.src;
  })();

  /* ===== rodapé ===== */
  var sfoot = document.getElementById('sfoot'), navLogo = document.querySelector('.nav img');
  if (navLogo) document.getElementById('sfLogo').src = navLogo.src;
  if ('IntersectionObserver' in window && !reduce) { new IntersectionObserver(function (es) { if (es[0].isIntersecting) sfoot.classList.add('in'); }, { threshold: .15 }).observe(sfoot); } else { sfoot.classList.add('in'); }
})();
