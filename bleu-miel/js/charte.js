/* PEPPER — charte graphique de la maquette (charte.html)
   Lit les couleurs et les tailles dans css/site.css au chargement : la
   planche suit la feuille de style sans recopier ses valeurs. Calcule
   les rapports de contraste, copie les codes couleur et rend les
   démonstrations inoffensives (liens et formulaires sans effet). */
(function(){
  "use strict";
  var d = document;

  /* ---------- lecture des couleurs ----------
     Une sonde reçoit la couleur (variable ou valeur littérale) ; le
     navigateur la résout en rgb(a), que l'on convertit ensuite. */
  var probe = d.createElement('span');
  probe.hidden = true;
  d.body.appendChild(probe);

  function ref(v){ return v.indexOf('--') === 0 ? 'var(' + v + ')' : v; }

  function read(v){
    probe.style.color = '';
    probe.style.color = ref(v);
    var m = getComputedStyle(probe).color.match(/[\d.]+/g) || ['0', '0', '0'];
    return { r:+m[0], g:+m[1], b:+m[2], a: m[3] === undefined ? 1 : +m[3] };
  }

  function hex(c){
    return '#' + [c.r, c.g, c.b].map(function(n){
      return ('0' + Math.round(n).toString(16)).slice(-2);
    }).join('').toUpperCase();
  }

  /* libellé affiché et valeur copiée : hexadécimal, avec l'opacité en
     pourcentage pour les blancs transparents */
  function label(c){ return c.a < 1 ? hex(c) + ' · ' + Math.round(c.a * 100) + ' %' : hex(c); }
  function value(c){ return c.a < 1 ? 'rgba(' + [c.r, c.g, c.b, c.a].join(', ') + ')' : hex(c); }

  /* ---------- nuanciers ---------- */
  d.querySelectorAll('.sw[data-color]').forEach(function(sw){
    var v = sw.getAttribute('data-color'), c = read(v);
    var sample = sw.querySelector('.sw-sample'), chip = sw.querySelector('.sw-chip');
    if (sample){
      if (sw.getAttribute('data-mode') === 'rule') sample.style.borderColor = ref(v);
      else sample.style.color = ref(v);
    } else if (chip){
      chip.style.background = ref(v);
    }
    var btn = sw.querySelector('.ch-copy');
    if (btn){
      btn.textContent = btn.dataset.label = label(c);
      btn.dataset.value = value(c);
      btn.setAttribute('aria-label', 'Copier ' + value(c));
    }
  });

  /* pastilles de couleur des tableaux */
  d.querySelectorAll('[data-bg]').forEach(function(el){
    el.style.background = ref(el.getAttribute('data-bg'));
  });

  /* ---------- contraste (WCAG 2) ----------
     Un texte semi-transparent est d'abord fondu sur son fond, comme à
     l'écran. Le rapport est tronqué, jamais arrondi vers le haut : un
     4,497 ne doit pas s'afficher « 4,50 » à côté d'un échec. */
  function lum(c){
    function ch(n){ n /= 255; return n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4); }
    return .2126 * ch(c.r) + .7152 * ch(c.g) + .0722 * ch(c.b);
  }
  function over(fg, bg){
    return {
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1
    };
  }
  var LEVELS = [
    [7,   'AAA',              'lv-ok'],
    [4.5, 'AA',               'lv-ok'],
    [3,   'AA grands textes', 'lv-mid'],
    [0,   'Insuffisant',      'lv-low']
  ];

  d.querySelectorAll('tr[data-text][data-ground]').forEach(function(row){
    var t = row.getAttribute('data-text'), g = row.getAttribute('data-ground');
    var bg = read(g), fg = over(read(t), bg);
    var a = lum(fg), b = lum(bg);
    var ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    var level = LEVELS.filter(function(l){ return ratio >= l[0]; })[0];

    var pair = row.querySelector('.ch-pair');
    pair.style.color = ref(t);
    pair.style.background = ref(g);
    row.querySelector('.ch-ratio').textContent =
      (Math.floor(ratio * 100) / 100).toFixed(2).replace('.', ',') + ':1';
    var badge = row.querySelector('.ch-level');
    badge.textContent = level[1];
    badge.className = 'ch-level ' + level[2];
  });

  /* ---------- tailles rendues ----------
     Les tailles fluides dépendent de la fenêtre : on affiche celle qui
     est réellement rendue, et on la remet à jour au redimensionnement. */
  function fmt(px){ return String(Math.round(px * 10) / 10).replace('.', ','); }

  function measure(){
    d.querySelectorAll('[data-measure]').forEach(function(out){
      var t = d.getElementById(out.getAttribute('data-measure'));
      if (!t) return;
      var px = out.getAttribute('data-prop') === 'width'
        ? t.getBoundingClientRect().width
        : parseFloat(getComputedStyle(t).fontSize);
      out.textContent = 'Dans cette fenêtre : ' + fmt(px) + ' px';
    });
  }
  var resizeTicking = false;
  window.addEventListener('resize', function(){
    if (resizeTicking) return;
    resizeTicking = true;
    window.requestAnimationFrame(function(){ measure(); resizeTicking = false; });
  });
  measure();

  /* ---------- copie des codes couleur ---------- */
  var live = d.getElementById('ch-live');

  function copied(btn){
    btn.textContent = 'Copié';
    btn.classList.add('done');
    if (live) live.textContent = btn.dataset.value + ' copié dans le presse-papiers';
    window.setTimeout(function(){
      btn.textContent = btn.dataset.label;
      btn.classList.remove('done');
    }, 1400);
  }

  /* repli pour les navigateurs sans presse-papiers asynchrone */
  function legacyCopy(text){
    var ta = d.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.className = 'sr-only';
    d.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = d.execCommand('copy'); } catch (e) { ok = false; }
    d.body.removeChild(ta);
    return ok;
  }

  d.querySelectorAll('.ch-copy').forEach(function(btn){
    btn.addEventListener('click', function(){
      if (btn.classList.contains('done')) return;
      var text = btn.dataset.value || btn.textContent.trim();
      if (navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(text).then(
          function(){ copied(btn); },
          function(){ if (legacyCopy(text)) copied(btn); }
        );
      } else if (legacyCopy(text)){
        copied(btn);
      }
    });
  });

  /* ---------- démonstrations ---------- */
  d.querySelectorAll('.ch-stage a[href="#"], .ch-scene a[href="#"]').forEach(function(a){
    a.addEventListener('click', function(e){ e.preventDefault(); });
  });
  d.querySelectorAll('.ch-stage form').forEach(function(f){
    f.addEventListener('submit', function(e){ e.preventDefault(); });
  });

  /* filtres et langue : un seul bouton actif par groupe */
  d.querySelectorAll('.ch-stage .filters, .ch-stage .lang').forEach(function(group){
    var btns = group.querySelectorAll('button');
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        btns.forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
  });

  /* déclencheur du méga-menu : seul le chevron bascule */
  d.querySelectorAll('.ch-navdemo [aria-expanded]').forEach(function(b){
    b.addEventListener('click', function(){
      b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'));
    });
  });

  /* rejouer la cascade : remise à zéro sans transition, puis apparition */
  var replay = d.getElementById('ch-replay'), cascade = d.getElementById('ch-cascade');
  if (replay && cascade){
    replay.addEventListener('click', function(){
      cascade.classList.add('ch-reset');
      cascade.classList.remove('in');
      void cascade.offsetWidth;
      cascade.classList.remove('ch-reset');
      void cascade.offsetWidth;
      window.requestAnimationFrame(function(){ cascade.classList.add('in'); });
    });
  }
  if (new URL(location.href).searchParams.get('lang') === 'en') {
    d.querySelectorAll('a[data-local-link]').forEach(function(a){ var dest = new URL(a.href); dest.searchParams.set('lang', 'en'); a.href = dest.href; });
  }
})();
