/* PEPPER — maquette de démonstration
   Bascule FR/EN, navigation entre vues, méga-menu, menu mobile,
   filtres, modale vidéo et apparitions au défilement. */
(function(){
  "use strict";
  var d = document;

  /* ---------- langue ---------- */
  var frHtml = new WeakMap(), frPh = new WeakMap(), frAlt = new WeakMap();
  d.querySelectorAll('[data-en]').forEach(function(el){ frHtml.set(el, el.innerHTML); });
  d.querySelectorAll('[data-en-ph]').forEach(function(el){ frPh.set(el, el.placeholder); });
  d.querySelectorAll('[data-en-alt]').forEach(function(el){ frAlt.set(el, el.alt); });

  function setLang(l){
    var en = (l === 'en');
    d.documentElement.lang = l;
    d.querySelectorAll('[data-en]').forEach(function(el){
      el.innerHTML = en ? el.getAttribute('data-en') : frHtml.get(el);
    });
    d.querySelectorAll('[data-en-ph]').forEach(function(el){
      el.placeholder = en ? el.getAttribute('data-en-ph') : frPh.get(el);
    });
    d.querySelectorAll('[data-en-alt]').forEach(function(el){
      el.alt = en ? el.getAttribute('data-en-alt') : frAlt.get(el);
    });
    d.querySelectorAll('.lang button').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.lang === l));
    });
    count();
  }
  d.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.dataset.lang); });
  });

  /* ---------- méga-menu ---------- */
  var megas = Array.prototype.slice.call(d.querySelectorAll('.mega'));
  var megaTriggers = Array.prototype.slice.call(d.querySelectorAll('[data-mega]'));

  function closeMegas(except){
    megaTriggers.forEach(function(t){
      var panel = d.getElementById(t.getAttribute('aria-controls'));
      if (panel && panel !== except){
        panel.setAttribute('data-open', 'false');
        t.setAttribute('aria-expanded', 'false');
      }
    });
  }
  megaTriggers.forEach(function(t){
    t.addEventListener('click', function(e){
      e.preventDefault();
      var panel = d.getElementById(t.getAttribute('aria-controls'));
      if (!panel) return;
      var open = panel.getAttribute('data-open') === 'true';
      closeMegas(panel);
      panel.setAttribute('data-open', String(!open));
      t.setAttribute('aria-expanded', String(!open));
    });
  });
  d.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      var openTrigger = megaTriggers.filter(function(t){ return t.getAttribute('aria-expanded') === 'true'; })[0];
      closeMegas();
      if (openTrigger) openTrigger.focus();
      var dlg = d.getElementById('video-modal');
      if (dlg && dlg.open) dlg.close();
    }
  });
  d.addEventListener('click', function(e){
    if (!e.target.closest('header')) closeMegas();
  });
  megas.forEach(function(m){
    m.addEventListener('focusout', function(){
      window.setTimeout(function(){
        if (!m.contains(d.activeElement) && !d.activeElement.closest('[data-mega]')) closeMegas();
      }, 0);
    });
  });

  /* ---------- vues ---------- */
  function show(v){
    d.querySelectorAll('.view').forEach(function(s){ s.classList.toggle('active', s.id === 'v-' + v); });
    d.querySelectorAll('nav .navlink').forEach(function(b){
      if (b.dataset.view === v){ b.setAttribute('aria-current', 'page'); }
      else { b.removeAttribute('aria-current'); }
    });
    closeMegas();
    var nav = d.getElementById('nav');
    if (nav) nav.classList.remove('open');
    var burger = d.querySelector('.burger');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
    reveal();
  }
  d.querySelectorAll('[data-view]').forEach(function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); show(el.dataset.view); });
  });

  /* ---------- menu mobile ---------- */
  var burger = d.querySelector('.burger'), nav = d.getElementById('nav');
  if (burger && nav){
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- en-tête rétractable ----------
     Se masque en descendant (passé le hero), réapparaît dès qu'on
     remonte, et jamais quand le menu mobile ou le méga-menu est ouvert. */
  var header = d.querySelector('header');
  var lastY = window.scrollY, scrollTicking = false;
  function headerOnScroll(){
    var y = window.scrollY;
    if (Math.abs(y - lastY) > 8){
      var menuOpen = (nav && nav.classList.contains('open')) ||
        megaTriggers.some(function(t){ return t.getAttribute('aria-expanded') === 'true'; });
      if (y > lastY && y > 140 && !menuOpen){
        header.classList.add('hide');
      } else if (y < lastY){
        header.classList.remove('hide');
      }
      lastY = y;
    }
    scrollTicking = false;
  }
  window.addEventListener('scroll', function(){
    if (!scrollTicking){ scrollTicking = true; window.requestAnimationFrame(headerOnScroll); }
  }, { passive:true });
  header.addEventListener('focusin', function(){ header.classList.remove('hide'); });

  /* ---------- filtres ---------- */
  function count(){
    var en = d.documentElement.lang === 'en';
    var p = d.querySelectorAll('#plist .p-item:not([hidden])').length;
    var r = d.querySelectorAll('#rlist .r-item:not([hidden])').length;
    var pc = d.getElementById('pcount'), rc = d.getElementById('rcount');
    if (pc) pc.textContent = en ? (p + ' project' + (p > 1 ? 's' : '')) : (p + ' projet' + (p > 1 ? 's' : ''));
    if (rc) rc.textContent = r + ' document' + (r > 1 ? 's' : '');
  }
  function wire(btnSel, itemSel, attr){
    d.querySelectorAll(btnSel).forEach(function(b){
      b.addEventListener('click', function(){
        d.querySelectorAll(btnSel).forEach(function(x){ x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        var v = b.getAttribute(attr === 'data-s' ? 'data-f' : 'data-r');
        d.querySelectorAll(itemSel).forEach(function(it){
          it.hidden = !(v === 'all' || it.getAttribute(attr) === v);
        });
        count();
      });
    });
  }
  wire('.filters [data-f]', '#plist .p-item', 'data-s');
  wire('.filters [data-r]', '#rlist .r-item', 'data-t');

  /* ---------- lettre d'information (démo : aucun envoi) ---------- */
  var nlform = d.getElementById('nlform');
  if (nlform){
    nlform.addEventListener('submit', function(e){
      e.preventDefault();
      nlform.reset();
      var msg = d.documentElement.lang === 'en'
        ? 'Demo only: no data is sent.'
        : 'Démo : aucune donnée n’est envoyée.';
      window.alert(msg);
    });
  }

  /* ---------- modale vidéo ---------- */
  var dlg = d.getElementById('video-modal');
  if (dlg){
    d.querySelectorAll('[data-video-open]').forEach(function(b){
      b.addEventListener('click', function(){
        if (typeof dlg.showModal === 'function') dlg.showModal();
      });
    });
    dlg.querySelectorAll('[data-video-close]').forEach(function(b){
      b.addEventListener('click', function(){ dlg.close(); });
    });
    dlg.addEventListener('click', function(e){ if (e.target === dlg) dlg.close(); });
  }

  /* ---------- apparition au défilement ----------
     Les chiffres clés ne sont volontairement PAS animés en compteur : une
     valeur qui resterait bloquée à zéro afficherait un chiffre faux, ce qui
     n'est pas acceptable sur une page qui engage la crédibilité scientifique.
     La mise en scène passe par la cascade d'apparition seule. */
  var io = window.IntersectionObserver ? new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { threshold:.15, rootMargin:'0px 0px -8% 0px' }) : null;

  function reveal(){
    d.querySelectorAll('.reveal:not(.in), [data-anim]:not(.in), .stagger:not(.in)').forEach(function(el){
      if (io){ io.observe(el); } else { el.classList.add('in'); }
    });
  }

  reveal();
  count();

  /* ---------- accompagnement du défilement ----------
     Les flèches de transition et les liens d'ancre ne « sautent » plus d'une
     scène à l'autre : le défilement est conduit sur une courbe amortie, assez
     lente pour que l'œil suive le passage d'une section à la suivante.
     Neutralisé sous prefers-reduced-motion, où le saut direct reste la
     réponse attendue. */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeInOutCubic(t){
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  var glideFrame = null, gliding = false;

  function glideTo(targetY, done, speed){
    if (glideFrame) window.cancelAnimationFrame(glideFrame);
    var startY = window.scrollY;
    var max = Math.max(0, d.documentElement.scrollHeight - window.innerHeight);
    var endY = Math.max(0, Math.min(targetY, max));
    var delta = endY - startY;
    if (Math.abs(delta) < 2){ if (done) done(); return; }
    /* durée proportionnelle à la distance, bornée : une scène voisine se
       rejoint en ~0,6 s, un saut de plusieurs écrans ne dépasse pas 1,1 s.
       Le recalage de fin de défilement (speed « short ») va deux fois plus vite. */
    var dur = speed === 'short'
      ? Math.min(420, Math.max(240, Math.abs(delta) * 2.2))
      : Math.min(1100, Math.max(600, Math.abs(delta) * .45));
    var t0 = null;
    gliding = true;
    function step(ts){
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, startY + delta * easeInOutCubic(p));
      if (p < 1){ glideFrame = window.requestAnimationFrame(step); }
      else { glideFrame = null; gliding = false; if (done) done(); }
    }
    glideFrame = window.requestAnimationFrame(step);
  }

  /* un geste de l'utilisateur reprend toujours la main sur l'animation */
  ['wheel','touchstart','keydown'].forEach(function(evt){
    window.addEventListener(evt, function(){
      if (glideFrame){ window.cancelAnimationFrame(glideFrame); glideFrame = null; gliding = false; }
    }, { passive:true });
  });

  if (!reduceMotion){
    /* le défilement amorti remplace le scroll-behavior natif du CSS */
    d.documentElement.style.scrollBehavior = 'auto';

    d.addEventListener('click', function(e){
      var a = e.target.closest('a[href^="#"]');
      /* le lien d'évitement doit rester instantané : au clavier, on attend
         d'atterrir sur le contenu, pas de regarder une animation */
      if (!a || a.classList.contains('skip')) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = d.getElementById(id);
      if (!target || !target.offsetParent) return;
      e.preventDefault();
      var style = window.getComputedStyle(target);
      var offset = parseFloat(style.scrollMarginTop) || 0;
      glideTo(target.getBoundingClientRect().top + window.scrollY - offset, function(){
        if (history.replaceState) history.replaceState(null, '', '#' + id);
        /* le focus suit le défilement : la navigation clavier reste cohérente */
        var prevTabIndex = target.getAttribute('tabindex');
        if (prevTabIndex === null) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll:true });
        if (prevTabIndex === null){
          target.addEventListener('blur', function handler(){
            target.removeAttribute('tabindex');
            target.removeEventListener('blur', handler);
          });
        }
      });
    });

    /* --- recalage des scènes en fin de défilement ---
       Quand le défilement s'arrête à quelques dizaines de pixels du sommet
       d'une scène plein écran, la scène est ramenée au cadre. Deux garde-fous :
       le recalage n'agit qu'au voisinage immédiat (jamais au milieu d'une
       lecture) et jamais sur une scène plus haute que la fenêtre — sinon le
       bas de son contenu deviendrait inatteignable. */
    var scenes = Array.prototype.slice.call(
      d.querySelectorAll('#v-home .hero, #v-home .stripe, #v-home .photoband, #v-home .figures')
    );
    var settleTimer = null;

    function settle(){
      if (gliding) return;
      var vh = window.innerHeight;
      var threshold = Math.min(110, vh * .13);
      var best = null, bestGap = Infinity;
      scenes.forEach(function(scene){
        if (!scene.offsetParent) return;
        if (scene.offsetHeight > vh + 8) return;
        var gap = scene.getBoundingClientRect().top;
        if (Math.abs(gap) < Math.abs(bestGap)){ bestGap = gap; best = scene; }
      });
      if (!best || Math.abs(bestGap) < 3 || Math.abs(bestGap) > threshold) return;
      /* en butée haute ou basse de page, on laisse le défilement où il est */
      var y = window.scrollY;
      if (y < 4 || y > d.documentElement.scrollHeight - vh - 4) return;
      glideTo(y + bestGap, null, 'short');
    }

    window.addEventListener('scroll', function(){
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 160);
    }, { passive:true });
  }
})();
