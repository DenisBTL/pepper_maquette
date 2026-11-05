(() => {
  'use strict';
  const target = new URL(document.documentElement.dataset.destination, location.href);
  if (target.origin !== location.origin) return;
  target.search = location.search;
  target.hash = location.hash;
  const link = document.querySelector('[data-destination-link]');
  if (link) link.href = target.href;
  location.replace(target.href);
})();
