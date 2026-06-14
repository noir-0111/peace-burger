/* PEACE BURGER LP — main.js
   最小限の JS:
   1. アンカーのスムーススクロール（CSS の scroll-behavior の保険）
   2. data-typewriter 要素のタイプライター演出
      - data-tw-on-view が付いていれば、ビュー内に入ってから再生
   3. data-animate-on-view 要素に、ビュー内で .in-view を付与
      - CSS 側で「.in-view .target { animation: ... }」と書ける
*/
(function () {
  "use strict";

  /* --- 1) スムーススクロール --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // フォーカス移動（アクセシビリティ）
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* --- 2) タイプライター演出 -------------------------------------------
     対象: [data-typewriter] が付いた要素
     仕様:
       - 元 HTML 内の <br> はそのまま改行として残す
       - 各文字を <span class="tw-char"> で包む
       - 再生時に .tw-play を付与 → CSS 側で animation が発火
       - opacity だけ動かすので最終高さが最初から確保される
         （＝下の要素が押し下げられない＝R1 重なり防止と整合）
       - 入力完了後、末尾に点滅カーソル | が現れる
       - prefers-reduced-motion: reduce ならアニメ無効（普通の文章として表示）
     データ属性:
       data-tw-start     : 開始ディレイ ms（既定 0／on-view は intersection からの ms）
       data-tw-speed     : 1文字あたり ms（既定 55）
       data-tw-on-view   : 付与時はビュー内に入ってから再生
       data-tw-no-cursor : 付与時は末尾の点滅カーソルを生成しない
                           （複数段落で連続タイピングする場合、途中段落に
                            残るカーソルを消すために使う）
  ------------------------------------------------------------------ */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 0) 日英 言語切替 ------------------------------------------------
     方式: [data-i18n="key"] の要素について
       - 日本語 = ページ初期 HTML（読込時にそのまま保持）
       - 英語   = 下記 I18N_EN 辞書の HTML 文字列で差し替え
     切替時は <html lang> と localStorage を更新し、タイプライター/
     テキストrise の対象要素だけ再初期化して演出を壊さない。
  ------------------------------------------------------------------ */
  var I18N_EN = {
    'hero-lead': 'Hirao’s Italian bar “Hirutoyoru”<br>turns into a burger shop on the 2nd &amp; 4th Sundays only!<br>Handmade from the buns up—enjoy a special day.',
    'btn-menu': 'View Menu <span aria-hidden="true">▶</span>',
    'btn-access': 'Access <span aria-hidden="true">▶</span>',

    'best-desc': 'Our signature burger.<br>Handmade buns, a juicy patty,<br>fresh lettuce and house-made sauce.<br>One bite and you’ll never forget it!',
    'best-btn': 'See Full Menu <span aria-hidden="true">⇒</span>',

    'story-head': 'Day &amp; Night — Enjoy It Twice',
    'story-body':
      '<p>Hirutoyoru, an Italian bar in Hirao, Fukuoka.<br>Tuesday to Saturday nights, it’s a wine &amp; pasta spot.</p>' +
      '<p>But on the 2nd &amp; 4th Sundays only,<br>it transforms into <span class="pb-big">“<span class="pb-red">PEACE BURGER</span>”</span>!</p>' +
      '<p>“Let’s grab a burger today!”<br>Just twice a month we craft each handmade burger,<br>baking every bun one by one with care.</p>' +
      '<p>With family, with friends, or on your own—<br>why not enjoy your Sunday lunch at Peace Burger?</p>',

    'secret-head': '<span class="num">3</span> Secrets to Our Flavor',
    'col1-title': '<img class="title-mark" src="assets/img/s4/55_slash_marks_left.png" alt="" aria-hidden="true">Handmade Buns<img class="title-mark" src="assets/img/s4/57_equal_signs.png" alt="" aria-hidden="true">',
    'col1-desc': 'Baked in-house just for this day—<br>fluffy, fragrant buns.',
    'col2-title': '<img class="title-mark" src="assets/img/s4/55_slash_marks_left.png" alt="" aria-hidden="true">Crafted Patty<img class="title-mark" src="assets/img/s4/57_equal_signs.png" alt="" aria-hidden="true">',
    'col2-desc': 'You’ll taste the difference—<br>quality beef, perfectly grilled.',
    'col3-title': '<img class="title-mark" src="assets/img/s4/55_slash_marks_left.png" alt="" aria-hidden="true">A Weekly Special<img class="title-mark" src="assets/img/s4/57_equal_signs.png" alt="" aria-hidden="true">',
    'col3-desc': 'Sundays only, so no compromises—<br>each one made with heart.',

    'menu-tap-hint': '<span class="menu-tap-hint__icon" aria-hidden="true">👆</span> Tap a dish to see it bigger',
    'kana-peace': 'Classic BLT',
    'desc-peace': 'Not sure? Start here!<br>The classic BLT—100% beef patty,<br>lettuce &amp; special cheese sauce!',
    'kana-teriyaki': 'Sweet &amp; savory',
    'desc-teriyaki': 'An exquisite sweet-savory sauce—<br>seriously tasty, a perfect match!',
    'kana-teriyaki-egg': 'Teriyaki + egg',
    'desc-teriyaki-egg': 'Teriyaki topped with a runny egg—<br>rich, savory and satisfying!',
    'kana-ebikatsu': 'Crispy shrimp',
    'desc-ebikatsu': 'Loaded with plump shrimp!<br>That fresh-fried crunch is irresistible!',

    'side-potato-sub': 'Comes with every burger',
    'side-potato-unit': 'à la carte',
    'side-salad-sub': 'Light &amp; refreshing!',
    'side-drink-sub': 'Cola / Orange / Oolong tea<br>Ginger ale / Iced coffee',
    'side-alcohol-sub': 'Highball / Wine',

    'night-head': 'By Night, an Italian Bar',
    'night-text-1': 'From Tuesday to Sunday nights,<br>this same place becomes “Hirutoyoru.”',
    'night-text-2': 'House-made pasta and authentic Italian dishes,<br>paired with carefully chosen wines.<br>A relaxed, grown-up space for a slow evening.',
    'night-text-3': '“Day and night, enjoyable twice”—<br>that’s Hirutoyoru.',
    'night-hours': '18:00 - 23:00 / Tue - Sun',
    'night-brand':
      '<img class="brand-mark" src="assets/img/s6/13_impact_marks_yellow.png" alt="" aria-hidden="true"> Hirutoyoru <img class="brand-mark flip-x" src="assets/img/s6/13_impact_marks_yellow.png" alt="" aria-hidden="true">',

    'acc-head': 'How to Find Us',
    'acc-card-sub': 'italian bar Hirutoyoru',
    'acc-addr-label': 'Address',
    'acc-addr-value': '〒815-0071<br>2-1-1 Heiwa, Minami-ku, Fukuoka City',
    'acc-tel-label': 'Phone',
    'acc-hours-pb-label': 'Hours<small>(PEACE BURGER)</small>',
    'acc-hours-pb-value': '2nd &amp; 4th Sundays 11:30 – 15:00',
    'acc-hours-hy-label': 'Hours<small>(Hirutoyoru)</small>',
    'acc-hours-hy-value': 'Tue – Sun 18:00 – 23:00',
    'acc-closed-label': 'Closed',
    'acc-closed-value': 'Mondays',
    'acc-pay-label': 'Payment',
    'acc-pay-value': 'Cash / Credit card<br>E-money / QR payment',
    'acc-inquiry': 'Got questions? Feel free to reach out!',
    'cta-tel': 'Call Us',
    'cta-line': 'LINE',
    'cta-line-sub': 'Latest news on LINE',

    '_title': 'PEACE BURGER | Sunday-only handmade burgers in Hirao, Fukuoka'
  };

  var i18nEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var i18nOriginalJA = new Map();
  i18nEls.forEach(function (el) { i18nOriginalJA.set(el, el.innerHTML); });
  var originalTitle = document.title;
  var currentLang = (function () {
    try { return localStorage.getItem('pb-lang') || 'ja'; } catch (e) { return 'ja'; }
  })();

  // data-i18n 要素の中身を指定言語に差し替える（演出の再初期化はしない）
  function setI18nContent(lang) {
    i18nEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (lang === 'en') {
        if (I18N_EN[key] != null) el.innerHTML = I18N_EN[key];
      } else {
        el.innerHTML = i18nOriginalJA.get(el);
      }
    });
  }

  // 言語で画像を差し替える要素（見出し画像など）。日本語=元のsrc/alt、英語=data-en-src/data-en-alt
  var i18nImgs = Array.prototype.slice.call(document.querySelectorAll('img[data-en-src]'));
  var i18nImgOriginal = new Map();
  i18nImgs.forEach(function (img) {
    i18nImgOriginal.set(img, { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' });
  });
  function setI18nImages(lang) {
    i18nImgs.forEach(function (img) {
      if (lang === 'en') {
        img.setAttribute('src', img.getAttribute('data-en-src'));
        if (img.hasAttribute('data-en-alt')) img.setAttribute('alt', img.getAttribute('data-en-alt'));
      } else {
        var o = i18nImgOriginal.get(img);
        img.setAttribute('src', o.src);
        img.setAttribute('alt', o.alt);
      }
    });
  }

  // 切替ボタンの見た目・aria を更新
  function updateLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  // 読込直後：保存言語が英語なら、演出セットアップ前に中身を英語化しておく
  document.documentElement.lang = currentLang;
  if (currentLang === 'en') {
    setI18nContent('en');
    document.title = I18N_EN._title;
  }
  setI18nImages(currentLang);
  updateLangButtons(currentLang);

  function setupTypewriter(el) {
    var startMs   = parseInt(el.getAttribute('data-tw-start') || '0',  10);
    var speedMs   = parseInt(el.getAttribute('data-tw-speed') || '55', 10);
    var noCursor  = el.hasAttribute('data-tw-no-cursor');

    var html  = el.innerHTML;
    var parts = html.split(/<br\s*\/?>/i);
    var tmp   = document.createElement('div');

    el.innerHTML = '';
    var chars = [];

    parts.forEach(function (part, lineIdx) {
      tmp.innerHTML = part;
      var text = tmp.textContent.replace(/^\s+|\s+$/g, '');

      Array.from(text).forEach(function (ch) {
        var sp = document.createElement('span');
        sp.className = 'tw-char';
        sp.textContent = ch;
        el.appendChild(sp);
        chars.push(sp);
      });

      if (lineIdx < parts.length - 1) {
        el.appendChild(document.createElement('br'));
      }
    });

    var cursor = null;
    if (!noCursor) {
      cursor = document.createElement('span');
      cursor.className = 'tw-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      el.appendChild(cursor);
    }

    return {
      play: function () {
        chars.forEach(function (sp, i) {
          sp.style.animationDelay = (startMs + i * speedMs) + 'ms';
          sp.classList.add('tw-play');
        });
        if (cursor) {
          cursor.style.animationDelay =
            (startMs + Math.max(0, chars.length - 1) * speedMs) + 'ms';
          cursor.classList.add('tw-play');
        }
      }
    };
  }

  if (!reduce) {
    document.querySelectorAll('[data-typewriter]').forEach(function (el) {
      var inst = setupTypewriter(el);
      el._twInstance = inst;

      if (el.hasAttribute('data-tw-on-view') && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              inst.play();
              io.disconnect();
            }
          });
        }, { threshold: 0.25 });
        io.observe(el);
      } else {
        // 即時再生（ヒーローなど常時可視の要素）
        inst.play();
      }
    });
  }

  /* --- 3) テキストの「下から浮き上がる」演出の準備 ------------------
     [data-text-rise] が付いた要素配下の <p> の中身を
     <span class="inn"> で包む（ユーザー提案の matrix 方式に対応）。
       外側 <p>     = .bg-wrap 役（overflow:hidden のマスク／opacity 0→1）
       内側 .inn    = matrix(1,0,0,1,0,Y) で下に隠した本文／opacity 0→1
     どちらも transition で同時に立ち上がり、外側もフェードするため
     ふわっと浮き上がる滑らかな印象になる。
     段差表示は CSS 側 :nth-child の transition-delay で行う。
  ------------------------------------------------------------------ */
  function wrapTextRise(el) {
    el.querySelectorAll('p').forEach(function (p) {
      // 既に .inn で包まれていれば二重ラップしない
      if (p.firstElementChild && p.firstElementChild.classList.contains('inn')) return;
      var inner = document.createElement('span');
      inner.className = 'inn';
      while (p.firstChild) inner.appendChild(p.firstChild);
      p.appendChild(inner);
    });
  }

  if (!reduce) {
    document.querySelectorAll('[data-text-rise]').forEach(wrapTextRise);
  }

  /* --- 4) セクション単位の「ビュー内アニメ」発火 --------------------
     [data-animate-on-view] が付いた要素が画面に入ったら .in-view を付与。
     CSS 側で「.s-best.in-view .best-frame { animation: ... }」と書ける。
  ------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    document.querySelectorAll('[data-animate-on-view]').forEach(function (sec) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sec.classList.add('in-view');
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });
      io.observe(sec);
    });
  } else {
    // 古いブラウザは即時表示
    document.querySelectorAll('[data-animate-on-view]').forEach(function (sec) {
      sec.classList.add('in-view');
    });
  }

  /* --- 5) Scroll インジケータ ----------------------------------------
     - 画面中央下に固定（CSS 側で position: fixed; left: 50%; ...）
     - ページロード後、少し待ってからゆっくりフェードイン
     - スクロールしても消えず、常に追従する
     - クリックで「次の1画面ぶん」スムーススクロール
  ------------------------------------------------------------------ */
  var scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    // 初期表示（ヒーローの演出が一段落したくらいに、ゆっくり浮かび上がる）
    setTimeout(function () {
      scrollIndicator.classList.add('is-visible');
    }, 1400);

    // クリック：次の 1 画面ぶんへスムーススクロール
    scrollIndicator.addEventListener('click', function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      window.scrollBy({ top: Math.round(vh * 0.85), left: 0, behavior: 'smooth' });
    });
  }

  /* --- 5b) スマホ用 写真＆主役要素アニメ（rAF で直接 inline style 操作）
     CSS animation が効かない環境のため、requestAnimationFrame で
     毎フレーム直接 style.transform を書き換える。
     ・写真：上下にゆらゆら浮遊
     ・ロゴ／見出し：軽くスケール+回転で「生きてる」感
  ------------------------------------------------------------------ */
  if (!reduce && window.matchMedia('(max-width: 768px)').matches) {
    // 共通形式: amp=上下振幅 / rotAmp=回転振幅 / scaleAmp=拡縮振幅(0〜1) / period=周期ms
    var animConfigs = [
      /* === 写真系（大きく上下）
            ※ ヒーロー写真（.s-hero .hero-photo）はユーザー要望で意図的に外している === */
      { selector: '.s-best .best-frame',   baseRot:  0, amp: 18, rotAmp: 2,   scaleAmp: 0,    period: 3200, phase: 0.2  },
      { selector: '.s-story .ph-frame',    baseRot:  0, amp: 16, rotAmp: 2,   scaleAmp: 0,    period: 3400, phase: 0.4  },
      { selector: '.s-night .night-photo', baseRot:  0, amp: 16, rotAmp: 2,   scaleAmp: 0,    period: 3600, phase: 0.6  },
      /* === タイトル系（軽くゆらゆら + スケール） === */
      { selector: '.hero-logo',            baseRot:  0, amp:  8, rotAmp: 1.5, scaleAmp: 0.04, period: 2800, phase: 0    },
      { selector: '.hero-headline',        baseRot:  0, amp:  4, rotAmp: 2.5, scaleAmp: 0.025,period: 3200, phase: 0.35 }
    ];

    // 全対象要素を収集
    var targets = [];
    animConfigs.forEach(function (cfg) {
      var els = document.querySelectorAll(cfg.selector);
      els.forEach(function (el, idx) {
        el.style.setProperty('opacity', '1', 'important');
        targets.push({
          el:        el,
          baseRot:   cfg.baseRot,
          amp:       cfg.amp,
          rotAmp:    cfg.rotAmp,
          scaleAmp:  cfg.scaleAmp,
          period:    cfg.period,
          phase:     cfg.phase + idx * 0.15
        });
      });
    });

    if (targets.length > 0) {
      var startTime = Date.now();

      function tickAnim() {
        var now = Date.now();
        targets.forEach(function (t) {
          var elapsed = (now - startTime) / t.period + t.phase;
          var sinVal  = Math.sin(elapsed * Math.PI * 2);
          var cosVal  = Math.cos(elapsed * Math.PI * 2);
          var y       = sinVal * t.amp * -1;
          var rot     = t.baseRot + cosVal * t.rotAmp;
          var scale   = 1 + sinVal * t.scaleAmp;
          // setProperty で !important 付き、CSS の transform: none を確実に上書き
          t.el.style.setProperty(
            'transform',
            'rotate(' + rot.toFixed(2) + 'deg) translateY(' + y.toFixed(2) + 'px) scale(' + scale.toFixed(3) + ')',
            'important'
          );
        });
        requestAnimationFrame(tickAnim);
      }
      requestAnimationFrame(tickAnim);

      console.log('[Anim] requestAnimationFrame で',
        targets.length, '個の要素をアニメ開始（写真＋ロゴ＋見出し）');
    } else {
      console.warn('[Anim] アニメ対象の要素が見つかりませんでした');
    }
  }

  /* --- 5c) スマホ用 メニュー写真の拡大モーダル ---------------------
     スマホでメニューカードをタップすると、写真を画面いっぱいに
     大きく表示する。背景タップ or ×ボタンで閉じる。
  ------------------------------------------------------------------ */
  function openPhotoModal(imgSrc, imgAlt, caption) {
    // オーバーレイ作成
    var overlay = document.createElement('div');
    overlay.className = 'menu-photo-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '写真を拡大表示');

    // 拡大画像
    var bigImg = document.createElement('img');
    bigImg.src = imgSrc;
    bigImg.alt = imgAlt || '';

    // キャプション（メニュー名）
    var capEl = null;
    if (caption) {
      capEl = document.createElement('div');
      capEl.className = 'menu-photo-caption';
      capEl.textContent = caption;
    }

    // ×ボタン
    var closeBtn = document.createElement('button');
    closeBtn.className = 'menu-photo-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', '閉じる');
    closeBtn.textContent = '×';

    overlay.appendChild(bigImg);
    if (capEl) overlay.appendChild(capEl);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // アニメ発火（次のフレームでクラス付与）
    requestAnimationFrame(function () {
      overlay.classList.add('is-open');
    });

    // 背景スクロール停止
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = prevOverflow;
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.removeEventListener('keydown', onKey);
      }, 350);
    }

    // 背景タップで閉じる
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn) closeModal();
    });
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeModal();
    });
    // ESC キーで閉じる
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKey);
  }

  // メニューカードにタップハンドラを設定
  document.querySelectorAll('.menu-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      // スマホサイズの時だけ発火（デスクトップでは既存ホバー効果が動作）
      if (!window.matchMedia('(max-width: 768px)').matches) return;

      var img  = card.querySelector('.mc-photo img');
      var name = card.querySelector('.mc-name');
      if (!img) return;

      openPhotoModal(
        img.src,
        img.alt,
        name ? name.textContent : ''
      );
      // ヒントは閉じずに表示し続ける（他のカードも気軽にタップしてもらうため）
    });
  });

  /* --- 6) ハンバーガーメニュー（モバイル） ---------------------------
     - ボタンタップで開閉
     - メニュー内リンク or バックドロップで閉じる
     - リンクのスクロールは既存の 1) スムーススクロールが拾ってくれる
  ------------------------------------------------------------------ */
  var hamburgerBtn      = document.getElementById('hamburgerBtn');
  var hamburgerMenu     = document.getElementById('hamburgerMenu');
  var hamburgerBackdrop = document.getElementById('hamburgerBackdrop');

  if (hamburgerBtn && hamburgerMenu) {

    function setMenu(open) {
      hamburgerBtn.classList.toggle('is-open', open);
      hamburgerMenu.classList.toggle('is-open', open);
      if (hamburgerBackdrop) hamburgerBackdrop.classList.toggle('is-open', open);

      hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburgerBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      hamburgerMenu.setAttribute('aria-hidden', open ? 'false' : 'true');

      // 開いている間は背景スクロールを止める
      document.body.style.overflow = open ? 'hidden' : '';
    }

    // ボタンタップで開閉トグル
    hamburgerBtn.addEventListener('click', function () {
      setMenu(!hamburgerBtn.classList.contains('is-open'));
    });

    // メニュー内のリンクタップ → 閉じる（スクロールは既存処理が担当）
    hamburgerMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    // バックドロップタップで閉じる
    if (hamburgerBackdrop) {
      hamburgerBackdrop.addEventListener('click', function () { setMenu(false); });
    }

    // ESC キーで閉じる（キーボードユーザー向け）
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburgerBtn.classList.contains('is-open')) {
        setMenu(false);
      }
    });
  }

  /* --- 7) 言語切替の実行 ---------------------------------------------
     ボタン押下で日英を切替。差し替え後、タイプライター/テキストrise の
     対象だけ再構築して演出を復元する（オフ画面でも即 play して
     「切替後に文字が消える」を防ぐ）。
  ------------------------------------------------------------------ */
  function activateTypewriter(el) {
    if (reduce) return; // モーション抑制時は素の文章のまま
    var inst = setupTypewriter(el);
    el._twInstance = inst;
    inst.play();
  }

  function switchLang(lang) {
    if (lang === currentLang) return;
    setI18nContent(lang);
    setI18nImages(lang);

    // 差し替えた要素のうち、演出付きのものを再初期化
    i18nEls.forEach(function (el) {
      if (el.hasAttribute('data-typewriter')) {
        activateTypewriter(el);
      } else if (el.hasAttribute('data-text-rise') && !reduce) {
        wrapTextRise(el);
      }
    });

    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = (lang === 'en') ? I18N_EN._title : originalTitle;
    try { localStorage.setItem('pb-lang', lang); } catch (e) {}
    updateLangButtons(lang);
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchLang(btn.getAttribute('data-lang-btn'));
    });
  });

  // ============================================================
  // Google Analytics 4 — カスタムイベント計測
  // gtag は index.html の <head> で読み込み済み。未読み込みなら no-op。
  // ============================================================
  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  // (A) ACCESS セクションの主要 CTA（電話 / Instagram / LINE）
  //     data-ga-event 属性付きアンカーを汎用フック
  document.querySelectorAll('a[data-ga-event]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.getAttribute('data-ga-event'), {
        link_label: el.getAttribute('data-ga-label') || '',
        link_url:   el.getAttribute('href') || '',
        link_text:  (el.textContent || '').trim().slice(0, 50)
      });
    });
  });

  // (B) ナビゲーション（ヘッダー & ハンバーガー & ヒーロー内ボタン）
  //     #story / #menu / #access へのアンカー全部を一括計測
  document.querySelectorAll('a[href^="#"]').forEach(function (el) {
    el.addEventListener('click', function () {
      var target = el.getAttribute('href');
      if (!target || target === '#') return;
      track('nav_click', {
        nav_target: target,                                  // 例: "#menu"
        nav_text:   (el.textContent || '').trim().slice(0, 50),
        nav_area:   el.closest('.hamburger-menu') ? 'hamburger'
                  : el.closest('.hero-nav')       ? 'hero_nav'
                  : el.closest('.acc-footer-nav') ? 'footer'
                  : 'inline_button'
      });
    });
  });

  // (C) SUNDAY MENU カードのタップ（スマホで写真モーダルを開いた回数）
  document.querySelectorAll('.menu-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (!window.matchMedia('(max-width: 768px)').matches) return;
      var name = card.querySelector('.mc-name');
      track('menu_card_tap', {
        menu_name: name ? name.textContent.trim() : ''
      });
    });
  });

  // (D) Google マップ iframe へのクリック（focus イベントで間接検知）
  //     iframe 内のクリックは直接取れないので、iframe へフォーカスが
  //     移った瞬間 ≒ 地図を触り始めた、として記録する。
  (function () {
    var mapFrame = document.querySelector('iframe[src*="maps.google.com"], iframe[src*="google.com/maps"]');
    if (!mapFrame) return;
    var fired = false;
    window.addEventListener('blur', function () {
      if (fired) return;
      if (document.activeElement === mapFrame) {
        fired = true;
        track('map_interact', { area: 'access_map' });
      }
    });
  })();
})();
