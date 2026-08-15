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

  /* ---------- apparition au défilement ---------- */
  var io = window.IntersectionObserver ? new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold:.12 }) : null;

  function reveal(){
    d.querySelectorAll('.reveal:not(.in)').forEach(function(el){
      if (io){ io.observe(el); } else { el.classList.add('in'); }
    });
  }

  reveal();
  count();
})();
