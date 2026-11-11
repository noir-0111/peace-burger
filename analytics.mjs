// Retain the existing contact event names used by this site's GA4 reports.
const contacts = [
  ['a[href^="tel:"]', 'cta_tel', 'tel'],
  ['a[href^="https://www.instagram.com/"]', 'cta_instagram', 'instagram'],
  ['a[href^="https://lin.ee/"]', 'cta_line', 'line']
];

for (const [selector, eventName, service] of contacts) {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag !== 'function') return;
      const area = link.closest('.header-social') ? 'header' : 'access';
      window.gtag('event', eventName, {
        link_label: `${area}_${service}`,
        link_url: link.getAttribute('href'),
        link_text: (link.textContent.trim() || link.getAttribute('aria-label') || '').slice(0, 50)
      });
    });
  });
}
