/* Static prototype: no requests, no storage and no collection of form data. */
(() => {
  'use strict';
  const doc = document;
  doc.documentElement.classList.add('js');
  const translations = [
    ['data-en', 'innerHTML'],
    ['data-en-alt', 'alt'],
    ['data-en-label', 'aria-label'],
    ['data-en-ph', 'placeholder']
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
    doc.title = language === 'en'
      ? (doc.body.classList.contains('article-page') ? 'Pepper · Call for partner laboratories · Mockup 2' : 'Pepper · Better detection of endocrine disruptors · Mockup 2')
      : (doc.body.classList.contains('article-page') ? 'Pepper · Appel à laboratoires partenaires · Maquette 2' : 'Pepper · Mieux détecter les perturbateurs endocriniens · Maquette 2');
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    if (location.protocol !== 'file:') history.replaceState(null, '', url);
    doc.querySelectorAll('a[data-article-link],a[data-home-link]').forEach(link => {
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
})();
