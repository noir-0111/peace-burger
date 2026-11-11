import { businessDates, shiftMonth, jstParts, nextOpening } from './calendar-utils.mjs';
import { languages, locales, copy, applyTranslations } from './i18n.mjs?v=9';
import { setupFoodFilms } from './food-films.mjs?v=8';
let language = 'ja';
const t = () => copy[language];
applyTranslations(language);
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotion.matches;
const updateFilms = setupFoodFilms();
function applyMotionPreference() {
  updateFilms(motionEnabled, language);
  document.body.classList.toggle('motion-off', !motionEnabled);
  updateScroll();
}
reducedMotion.addEventListener('change', event => { motionEnabled = !event.matches; applyMotionPreference(); });

// A short, dismissible welcome; ordinary navigation never waits on an image.
const intro = $('#intro');
let introTimer;
const introBackground = $$('.site-header, main, .footer, .mobile-dock');
function hideIntro() {
  clearTimeout(introTimer);
  intro.classList.add('is-leaving');
  introBackground.forEach(element => { element.inert = false; });
  document.body.classList.remove('intro-open');
  if (intro.contains(document.activeElement)) $('.brand').focus({ preventScroll: true });
  setTimeout(() => { intro.hidden = true; }, motionEnabled ? 820 : 0);
}
function showIntro() {
  if (!motionEnabled) return;
  intro.hidden = false;
  document.body.classList.add('intro-open');
  introBackground.forEach(element => { element.inert = true; });
  $('#skip-intro').focus({ preventScroll: true });
  introTimer = setTimeout(hideIntro, 1900);
}
$('#skip-intro').addEventListener('click', hideIntro);
intro.addEventListener('keydown', event => {
  if (event.key === 'Escape') hideIntro();
  if (event.key === 'Tab') { event.preventDefault(); $('#skip-intro').focus(); }
});
try {
  if (!sessionStorage.getItem('peace-intro-v3') && !location.hash) showIntro();
  sessionStorage.setItem('peace-intro-v3', 'seen');
} catch { if (!location.hash) showIntro(); }

const navigation = $('#mobile-menu');
$('.nav-toggle').addEventListener('click', () => {
  navigation.showModal(); document.body.classList.add('menu-open');
});
$('#close-menu').addEventListener('click', () => navigation.close());
navigation.addEventListener('close', () => document.body.classList.remove('menu-open'));
$$('#mobile-menu a').forEach(anchor => anchor.addEventListener('click', () => navigation.close()));

// Photography, perspective and a separate shadow make the food feel dimensional.
const heroFood = $('#hero-food');
heroFood.addEventListener('pointermove', event => {
  if (!motionEnabled || event.pointerType === 'touch') return;
  const box = heroFood.getBoundingClientRect();
  heroFood.style.setProperty('--rx', `${-((event.clientY - box.top) / box.height - .5) * 13}deg`);
  heroFood.style.setProperty('--ry', `${((event.clientX - box.left) / box.width - .5) * 20}deg`);
});
heroFood.addEventListener('pointerleave', () => {
  heroFood.style.setProperty('--rx', '0deg'); heroFood.style.setProperty('--ry', '0deg');
});
function playClass(element, className, duration) {
  if (!motionEnabled) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  setTimeout(() => element.classList.remove(className), duration);
}
function bounceBuns() {
  playClass($('#buns-play'), 'is-squishing', 1000);
  playClass($('.sensory-buns'), 'is-bouncing', 1000);
}
$('#buns-play').addEventListener('click', bounceBuns);
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
let scrollPending = false;
function updateScroll() {
  scrollPending = false;
  if (!motionEnabled) return;
  const viewport = innerHeight;
  const track = $('#signature').getBoundingClientRect();
  const narrow = innerWidth <= 600;
  const entryTop = narrow ? $('.signature-food').getBoundingClientRect().top : track.top;
  const progress = clamp((viewport * .9 - entryTop) / (viewport * (narrow ? .6 : .85)));
  $('.signature-food').style.setProperty('--sig-x', `${(1 - progress) * 55}%`);
  $('.signature-food').style.setProperty('--sig-r', `${4 - progress * 5.6}deg`);
  const patty = $('.craft-patty').getBoundingClientRect();
  if (patty.bottom > 0 && patty.top < viewport) {
    const p = clamp((viewport - patty.top) / (viewport + patty.height));
    $('.patty-photo').style.setProperty('--patty-scale', String(1.13 - p * .13));
  }
  const fries = $('.fries-break').getBoundingClientRect();
  if (fries.bottom > 0 && fries.top < viewport) {
    const p = clamp((viewport - fries.top) / (viewport + fries.height));
    $('.fries-break > img').style.setProperty('--fries-x', `${-35 + p * 50}px`);
    $('.fries-break > img').style.setProperty('--fries-r', `${-15 + p * 18}deg`);
  }
}
function requestScrollUpdate() {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
}
addEventListener('scroll', requestScrollUpdate, { passive: true });
addEventListener('resize', requestScrollUpdate, { passive: true });
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.matches('.buns-copy')) bounceBuns();
      if (!entry.target.matches('.craft-reason')) reveal.unobserve(entry.target);
    } else if (entry.target.matches('.craft-reason')) {
      entry.target.classList.remove('in-view');
    }
  }, { threshold: .15 });
  $$('.craft-heading, .buns-copy, .patty-paper, .story-bubble, .craft-reason').forEach(element => reveal.observe(element));
  document.body.classList.add('motion-ready');
  const footerObserver = new IntersectionObserver(entries => {
    $('.mobile-dock').classList.toggle('is-hidden', entries[0].isIntersecting);
  }, { threshold: 0 });
  footerObserver.observe($('.footer'));
}
applyMotionPreference();

// The four plates can be turned by buttons, keys, or a horizontal gesture.
const prices = ['1,300', '1,300', '1,500', '1,500'];
let currentProduct = 0;
function selectProduct(index) {
  currentProduct = (index + prices.length) % prices.length;

  $$('.menu-plate').forEach((plate, i) => {
    const position = (i - currentProduct + prices.length) % prices.length;
    plate.classList.remove('is-current', 'is-right', 'is-left', 'is-away');
    plate.classList.add(['is-current', 'is-right', 'is-away', 'is-left'][position]);
    plate.setAttribute('aria-pressed', String(position === 0));
    plate.setAttribute('aria-hidden', String(position === 2));
    plate.tabIndex = position === 2 ? -1 : 0;
    plate.setAttribute('aria-label', language === 'en' || language === 'zh-Hans' ? t().choose + t().names[i] : t().names[i] + t().choose);
  });
  $$('[data-select]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.select) === currentProduct));
    button.textContent = t().names[Number(button.dataset.select)];
  });
  $('#menu-name').textContent = t().names[currentProduct];
  $('#menu-description').textContent = t().descriptions[currentProduct];
  $('#menu-price').textContent = prices[currentProduct];
  $('#menu-count').textContent = `${String(currentProduct + 1).padStart(2, '0')} / 04`;
}
$('#menu-prev').addEventListener('click', () => selectProduct(currentProduct - 1));
$('#menu-next').addEventListener('click', () => selectProduct(currentProduct + 1));
$$('[data-select]').forEach(button => button.addEventListener('click', () => selectProduct(Number(button.dataset.select))));
let swipeStart = null, suppressPlateClickUntil = 0;
$$('.menu-plate').forEach(plate => plate.addEventListener('click', () => {
  if (performance.now() > suppressPlateClickUntil) selectProduct(Number(plate.dataset.index));
}));
$('#menu-random').addEventListener('click', () => selectProduct(currentProduct + 1 + Math.floor(Math.random() * 3)));
$('.menu-carousel').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); selectProduct(currentProduct + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
$('#menu-stage').addEventListener('pointerdown', event => { swipeStart = { x: event.clientX, y: event.clientY }; });
$('#menu-stage').addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x, dy = event.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    suppressPlateClickUntil = performance.now() + 500;
    selectProduct(currentProduct + (dx < 0 ? 1 : -1));
  }
});
$('#menu-stage').addEventListener('pointercancel', () => { swipeStart = null; });
selectProduct(0);

let nightMode = false;
function selectStory(night) {
  nightMode = night;
  $('#story').classList.toggle('is-night', night);
  $('#story-day').classList.toggle('is-active', !night);
  $('#story-night').classList.toggle('is-active', night);
  $('#story-day').setAttribute('aria-pressed', String(!night));
  $('#story-night').setAttribute('aria-pressed', String(night));
  const story = night ? t().night : t().day;
  $('#shop-sign').textContent = story.sign;
  $('#story-subtitle').textContent = story.subtitle;
  $('#story-text').textContent = story.text;
  $('.story-bubble > p').innerHTML = story.bubble;
  $('.story-bubble > small').textContent = story.note;
}
$('#story-day').addEventListener('click', () => selectStory(false));
$('#story-night').addEventListener('click', () => selectStory(true));

let today = jstParts();
let calendarMonth = nextOpening(today);
function renderCalendar() {
  const { year, month } = calendarMonth;
  const openingDays = businessDates(year, month);
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const monthLength = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const monthText = new Intl.DateTimeFormat(locales[language], { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
  $('#calendar-month').textContent = monthText;
  $$('.calendar-table th').forEach((th, i) => { th.textContent = new Intl.DateTimeFormat(locales[language], {weekday: 'short', timeZone:'UTC'}).format(new Date(Date.UTC(2026, 10, 1 + i))); });
  $('.calendar-table').setAttribute('aria-label', `${monthText} · ${t().calendar}`);
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < Math.ceil((firstWeekday + monthLength) / 7); row++) {
    const tr = document.createElement('tr');
    for (let weekday = 0; weekday < 7; weekday++) {
      const day = row * 7 + weekday - firstWeekday + 1;
      const td = document.createElement('td');
      if (day > 0 && day <= monthLength) {
        const span = document.createElement('span'); span.textContent = day; td.append(span);
        const opening = openingDays.includes(day);
        const dateNumber = Date.UTC(year, month - 1, day);
        const todayNumber = Date.UTC(today.year, today.month - 1, today.day);
        td.classList.toggle('opening-day', opening);
        td.classList.toggle('is-past', dateNumber < todayNumber);
        td.classList.toggle('is-today', dateNumber === todayNumber);
        if (dateNumber === todayNumber) td.setAttribute('aria-current', 'date');
        const dateLabel = new Intl.DateTimeFormat(locales[language], {month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(dateNumber));
        td.setAttribute('aria-label', `${dateLabel}${opening ? ' · ' + t().opening : ''}`);
      }
      tr.append(td);
    }
    fragment.append(tr);
  }
  $('#calendar-days').replaceChildren(fragment);
  const upcoming = nextOpening(today);
  $('#next-date').textContent = language === 'ja' ? `${upcoming.month}月${upcoming.day}日（日）` : new Intl.DateTimeFormat(locales[language], {month: 'short', day: 'numeric', weekday: 'short', timeZone: 'UTC'}).format(new Date(Date.UTC(upcoming.year, upcoming.month - 1, upcoming.day)));
  $('#next-caption').textContent = upcoming.isOpen ? t().today : upcoming.isToday ? t().beforeOpen : t().next;
}
$('#month-prev').addEventListener('click', () => { calendarMonth = shiftMonth(calendarMonth.year, calendarMonth.month, -1); renderCalendar(); });
$('#month-next').addEventListener('click', () => { calendarMonth = shiftMonth(calendarMonth.year, calendarMonth.month, 1); renderCalendar(); });
$('#month-today').addEventListener('click', () => { calendarMonth = jstParts(); renderCalendar(); });
renderCalendar();
setInterval(() => { today = jstParts(); renderCalendar(); }, 60000);

function setLanguage(value) {
  language = languages.includes(value) ? value : 'ja';
  applyTranslations(language);
  selectProduct(currentProduct);
  selectStory(nightMode);
  renderCalendar();
  applyMotionPreference();
  requestScrollUpdate();
  try { localStorage.setItem('peace-language', language); } catch {}
}
$('#language-select').addEventListener('change', event => setLanguage(event.target.value));
let initialLanguage = 'ja';
try { initialLanguage = localStorage.getItem('peace-language') || 'ja'; } catch {}
setLanguage(initialLanguage);
