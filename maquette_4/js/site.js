/* Static prototype: no requests, no storage and no collection of form data. */
(() => {
  'use strict';
  const doc = document;
  doc.documentElement.classList.add('js');
  const translations = [
    ['data-en', 'innerHTML'],
    ['data-en-alt', 'alt'],
    ['data-en-label', 'aria-label'],
    ['data-en-ph', 'placeholder'],
    ['data-en-title', 'title']
  ];
  const french = new WeakMap();
  translations.forEach(([attribute, property]) => {
    doc.querySelectorAll(`[${attribute}]`).forEach(element => {
      const values = french.get(element) || {};
      values[property] = property === 'innerHTML' ? element.innerHTML : element.getAttribute(property);
      french.set(element, values);
    });
  });
  function setLanguage(language) {
    doc.documentElement.lang = language;
    // Translate leaf nodes only: parent and child must never both own a translation.
    translations.forEach(([attribute, property]) => {
      doc.querySelectorAll(`[${attribute}]`).forEach(element => {
        const value = language === 'en' ? element.getAttribute(attribute) : french.get(element)[property];
        if (property === 'innerHTML') element.innerHTML = value;
        else element.setAttribute(property, value);
      });
    });
    doc.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    const page = doc.body.classList.contains('charte-page') ? 'charte' : doc.body.classList.contains('article-page') ? 'article' : 'home';
    const titles = {
      home: { fr: 'Pepper · Mieux détecter les perturbateurs endocriniens · Maquette 4', en: 'Pepper · Better detection of endocrine disruptors · Mockup 4' },
      article: { fr: 'Pepper · Appel à laboratoires partenaires · Maquette 4', en: 'Pepper · Call for partner laboratories · Mockup 4' },
      charte: { fr: 'Pepper · Direction artistique · Cyan et miel', en: 'Pepper · Art direction · Cyan and honey' }
    };
    doc.title = titles[page][language];
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    if (location.protocol !== 'file:') history.replaceState(null, '', url);
    doc.querySelectorAll('a[data-article-link],a[data-home-link],a[data-local-link]').forEach(link => {
      const destination = new URL(link.href);
      if (language === 'en') destination.searchParams.set('lang', 'en');
      else destination.searchParams.delete('lang');
      link.href = destination.href;
    });
  }
  doc.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

  const menuButton = doc.querySelector('.menu-toggle');
  const navigation = doc.querySelector('.navigation');
  function closeMenu(restoreFocus = false) {
    const wasOpen = menuButton?.getAttribute('aria-expanded') === 'true';
    navigation?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (restoreFocus && wasOpen) menuButton.focus();
  }
  menuButton?.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  doc.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
  doc.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width:1101px)').addEventListener('change', () => closeMenu());

  let lastTrigger;
  function openDialog(id, trigger) {
    const dialog = doc.getElementById(id);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    if (trigger.dataset.topic) {
      const select = dialog.querySelector('select');
      if (select) select.value = trigger.dataset.topic;
    }
    lastTrigger = trigger;
    dialog.showModal();
    doc.body.classList.add('dialog-open');
  }
  doc.querySelectorAll('[data-dialog]').forEach(trigger => trigger.addEventListener('click', () => openDialog(trigger.dataset.dialog, trigger)));
  doc.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      doc.body.classList.remove('dialog-open');
      dialog.querySelectorAll('form').forEach(form => form.reset());
      dialog.querySelectorAll('.form-feedback').forEach(feedback => { feedback.hidden = true; });
      lastTrigger?.focus();
    });
  });
  doc.querySelectorAll('dialog form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const feedback = form.querySelector('.form-feedback');
      if (feedback) feedback.hidden = false;
    });
    form.addEventListener('input', () => {
      const feedback = form.querySelector('.form-feedback');
      if (feedback) feedback.hidden = true;
    });
  });
  if (new URL(location.href).searchParams.get('lang') === 'en') setLanguage('en');

  /* Même accompagnement de lecture que dans la maquette 1. */
  const header = doc.querySelector('.site-header');
  const readbar = doc.getElementById('readbar-fill');
  const sceneNav = doc.querySelector('.scene-nav');
  const sceneLinks = [...(sceneNav?.querySelectorAll('a') || [])];
  const scenes = [...doc.querySelectorAll('[data-reading-scene]')];
  const darkScenes = [...doc.querySelectorAll('[data-reading-scene][data-nav-contrast="light"]')];
  const wideReading = matchMedia('(min-width:1340px) and (min-height:600px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
  let lastHeaderY = Math.max(0, window.scrollY);
  let readingFrame = null;

  function updateReading() {
    readingFrame = null;
    const y = Math.max(0, window.scrollY);
    const delta = y - lastHeaderY;
    const keepHeader = navigation?.classList.contains('is-open') ||
      header?.contains(doc.activeElement) || doc.querySelector('dialog[open]');
    if (header) {
      if (y <= 140 || keepHeader) header.classList.remove('is-hidden');
      else if (Math.abs(delta) > 8) header.classList.toggle('is-hidden', delta > 0);
    }
    if (Math.abs(delta) > 8 || y <= 140 || keepHeader) lastHeaderY = y;
    if (readbar) {
      const total = doc.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0;
      readbar.style.transform = `scaleX(${progress})`;
    }
    if (!wideReading.matches || !sceneLinks.length) return;
    const midpoint = window.innerHeight / 2;
    let current = scenes[0];
    scenes.forEach(scene => { if (scene.getBoundingClientRect().top <= midpoint) current = scene; });
    if (window.scrollY >= doc.documentElement.scrollHeight - window.innerHeight - 2) current = scenes.at(-1);
    const darkBounds = darkScenes.map(scene => scene.getBoundingClientRect());
    sceneLinks.forEach(link => {
      if (link.hash === '#' + current?.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
      const bounds = link.getBoundingClientRect();
      const center = bounds.top + bounds.height / 2;
      link.classList.toggle('is-inverse', darkBounds.some(rect => rect.top <= center && rect.bottom >= center));
    });
  }
  function queueReading() {
    if (readingFrame === null) readingFrame = requestAnimationFrame(updateReading);
  }
  function measureHeader() {
    if (header) doc.documentElement.style.setProperty('--reading-header-height', `${header.getBoundingClientRect().height}px`);
    queueReading();
  }
  window.addEventListener('scroll', queueReading, { passive: true });
  window.addEventListener('resize', measureHeader, { passive: true });
  window.addEventListener('pageshow', queueReading);
  wideReading.addEventListener('change', queueReading);
  header?.addEventListener('focusin', () => { header.classList.remove('is-hidden'); queueReading(); });
  header?.addEventListener('focusout', queueReading);
  menuButton?.addEventListener('click', queueReading);
  doc.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', queueReading);
    dialog.addEventListener('toggle', queueReading);
  });
  doc.querySelectorAll('[data-dialog]').forEach(trigger => trigger.addEventListener('click', queueReading));
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(measureHeader);
    if (header) observer.observe(header);
    if (doc.querySelector('main')) observer.observe(doc.querySelector('main'));
    if (doc.querySelector('.site-footer')) observer.observe(doc.querySelector('.site-footer'));
  }
  doc.fonts?.ready.then(measureHeader);
  measureHeader();

  /* Défilement amorti, annulable ; le clavier retrouve la cible à l’arrivée. */
  let glideFrame = null;
  function cancelGlide() {
    if (glideFrame !== null) cancelAnimationFrame(glideFrame);
    glideFrame = null;
  }
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(event =>
    window.addEventListener(event, cancelGlide, { passive: true }));
  reducedMotion.addEventListener('change', cancelGlide);
  function focusTarget(target) {
    const previous = target.getAttribute('tabindex');
    if (previous === null) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
  }
  function arrive(target) {
    if (location.protocol !== 'file:') {
      const url = new URL(location.href);
      url.hash = target.id;
      history.replaceState(null, '', url);
    }
    header?.classList.remove('is-hidden');
    lastHeaderY = Math.max(0, window.scrollY);
    focusTarget(target);
    queueReading();
  }
  doc.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    let id;
    try { id = decodeURIComponent(link.hash.slice(1)); } catch { return; }
    const target = id && doc.getElementById(id);
    if (!target || !target.getClientRects().length) return;
    event.preventDefault();
    cancelGlide();
    const inset = (header?.getBoundingClientRect().height || 0) + 16;
    const start = Math.max(0, window.scrollY);
    const maximum = Math.max(0, doc.documentElement.scrollHeight - window.innerHeight);
    const end = Math.max(0, Math.min(maximum, target.getBoundingClientRect().top + start - inset));
    const distance = end - start;
    if (reducedMotion.matches || link.classList.contains('skip-link') || Math.abs(distance) < 2) {
      window.scrollTo({ top: end, behavior: 'instant' });
      arrive(target);
      return;
    }
    const duration = Math.min(1100, Math.max(600, Math.abs(distance) * .45));
    let started;
    function step(now) {
      if (started === undefined) started = now;
      const progress = Math.min(1, (now - started) / duration);
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      if (progress < 1) glideFrame = requestAnimationFrame(step);
      else { glideFrame = null; arrive(target); }
    }
    glideFrame = requestAnimationFrame(step);
  });
})();
