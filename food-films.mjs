const controlLabels = {
  ja: ['映像を再生', '映像を一時停止'],
  en: ['Play video', 'Pause video'],
  ko: ['영상 재생', '영상 일시 정지'],
  'zh-Hans': ['播放视频', '暂停视频']
};

export function setupFoodFilms() {
  let allowMotion = false;
  let language = 'ja';
  const films = new Map();

  function label(film) {
    const playing = !film.video.paused && !film.video.ended;
    const text = controlLabels[language][Number(playing)];
    film.control.dataset.playing = String(playing);
    film.control.setAttribute('aria-label', text);
    film.control.title = text;
  }

  function update(film) {
    const shouldPlay = film.inView && !document.hidden && (film.userPreference ?? allowMotion);
    if (!shouldPlay) {
      film.video.pause();
    } else if (film.video.paused && !film.failed) {
      if (!film.video.hasAttribute('src')) film.video.src = film.video.dataset.src;
      film.video.play().catch(error => {
        // Scrolling away cancels a pending play. Devices that disallow autoplay keep the play button.
        if (error.name === 'NotAllowedError') film.userPreference = false;
        label(film);
      });
    }
    label(film);
  }

  for (const section of document.querySelectorAll('[data-food-film]')) {
    const video = section.querySelector('video');
    const control = section.querySelector('.film-control');
    const film = { section, video, control, inView: false, userPreference: null, failed: false };
    films.set(section, film);
    video.muted = true;
    control.hidden = false;
    control.addEventListener('click', () => {
      film.userPreference = video.paused;
      update(film);
    });
    video.addEventListener('playing', () => {
      section.classList.add('film-started');
      label(film);
    });
    video.addEventListener('pause', () => label(film));
    video.addEventListener('error', () => {
      film.failed = true;
      section.classList.remove('film-started');
      control.hidden = true;
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const film = films.get(entry.target);
        film.inView = entry.isIntersecting && entry.intersectionRatio >= 0.08;
        update(film);
      }
    }, { threshold: [0, 0.08] });
    films.forEach(film => observer.observe(film.section));
  } else {
    // Let the visitor start the film on browsers without visibility tracking.
    films.forEach(film => { film.inView = true; film.userPreference = false; });
  }
  document.addEventListener('visibilitychange', () => films.forEach(update));
  return (enabled, locale) => {
    if (enabled !== allowMotion && 'IntersectionObserver' in window) {
      films.forEach(film => { film.userPreference = null; });
    }
    allowMotion = enabled;
    language = locale;
    films.forEach(update);
  };
}
