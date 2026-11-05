/* Les valeurs viennent des variables utilisées par la maquette. */
(() => {
  'use strict';
  const root = getComputedStyle(document.documentElement);
  const feedback = document.getElementById('colour-feedback');
  document.querySelectorAll('.charte-swatch[data-color]').forEach(button => {
    const code = button.querySelector('code');
    const value = root.getPropertyValue(button.dataset.color).trim().toUpperCase();
    if (/^#[0-9A-F]{6}$/.test(value)) code.textContent = value;
    button.addEventListener('click', async () => {
      const english = document.documentElement.lang === 'en';
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(code.textContent);
        feedback.textContent = english ? `${code.textContent} copied.` : `${code.textContent} copié.`;
      } catch {
        feedback.textContent = english
          ? `Copy unavailable. Select the code ${code.textContent} to copy it manually.`
          : `Copie indisponible. Sélectionnez le code ${code.textContent} pour le copier manuellement.`;
      }
    });
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => { feedback.textContent = ''; }));
})();
