/* PEPPER — maquette de démonstration
   Bascule FR/EN, navigation entre vues, menu mobile, filtres, animations. */
(function(){
  "use strict";
  var d=document;

  /* ---------- langue ---------- */
  var fr=new WeakMap(), frPh=new WeakMap();
  d.querySelectorAll('[data-en]').forEach(function(el){ fr.set(el, el.innerHTML); });
  d.querySelectorAll('[data-en-ph]').forEach(function(el){ frPh.set(el, el.placeholder); });

  function setLang(l){
    d.documentElement.lang = l;
    d.querySelectorAll('[data-en]').forEach(function(el){
      el.innerHTML = (l==='en') ? el.getAttribute('data-en') : fr.get(el);
    });
    d.querySelectorAll('[data-en-ph]').forEach(function(el){
      el.placeholder = (l==='en') ? el.getAttribute('data-en-ph') : frPh.get(el);
    });
    d.querySelectorAll('.lang button').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.lang===l));
    });
    count();
  }
  d.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){ setLang(b.dataset.lang); });
  });

  /* ---------- vues ---------- */
  function show(v){
    d.querySelectorAll('.view').forEach(function(s){ s.classList.toggle('active', s.id==='v-'+v); });
    d.querySelectorAll('nav .navlink').forEach(function(b){
      if(b.dataset.view===v){ b.setAttribute('aria-current','page'); } else { b.removeAttribute('aria-current'); }
    });
    d.getElementById('nav').classList.remove('open');
    d.querySelector('.burger').setAttribute('aria-expanded','false');
    window.scrollTo({top:0,behavior:'instant'});
    reveal();
  }
  d.querySelectorAll('[data-view]').forEach(function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); show(el.dataset.view); });
  });

  /* ---------- menu mobile ---------- */
  var burger=d.querySelector('.burger'), nav=d.getElementById('nav');
  burger.addEventListener('click', function(){
    var o=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(o));
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
  });

  /* ---------- filtres ---------- */
  function count(){
    var en = d.documentElement.lang==='en';
    var p = d.querySelectorAll('#plist .p-item:not([hidden])').length;
    var r = d.querySelectorAll('#rlist .r-item:not([hidden])').length;
    var pc=d.getElementById('pcount'), rc=d.getElementById('rcount');
    if(pc) pc.textContent = en ? (p+' project'+(p>1?'s':'')) : (p+' projet'+(p>1?'s':''));
    if(rc) rc.textContent = en ? (r+' document'+(r>1?'s':'')) : (r+' document'+(r>1?'s':''));
  }
  function wire(btnSel, itemSel, attr){
    d.querySelectorAll(btnSel).forEach(function(b){
      b.addEventListener('click', function(){
        d.querySelectorAll(btnSel).forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true');
        var v = b.getAttribute(attr==='data-s'?'data-f':'data-r');
        d.querySelectorAll(itemSel).forEach(function(it){
          it.hidden = !(v==='all' || it.getAttribute(attr)===v);
        });
        count();
      });
    });
  }
  wire('.filters [data-f]', '#plist .p-item', 'data-s');
  wire('.filters [data-r]', '#rlist .r-item', 'data-t');

  /* ---------- newsletter (démo : aucun envoi) ---------- */
  var nlform=d.getElementById('nlform');
  if(nlform){
    nlform.addEventListener('submit', function(e){
      e.preventDefault();
      nlform.reset();
      alert('Démo : aucune donnée n\'est envoyée.');
    });
  }

  /* ---------- apparition ---------- */
  var io = window.IntersectionObserver ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12}) : null;
  function reveal(){
    d.querySelectorAll('.reveal:not(.in)').forEach(function(el){
      if(io){ io.observe(el); } else { el.classList.add('in'); }
    });
  }
  reveal(); count();
})();
