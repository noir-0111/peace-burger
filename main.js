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
  if (!reduce) {
    document.querySelectorAll('[data-text-rise]').forEach(function (el) {
      el.querySelectorAll('p').forEach(function (p) {
        var inner = document.createElement('span');
        inner.className = 'inn';
        while (p.firstChild) inner.appendChild(p.firstChild);
        p.appendChild(inner);
      });
    });
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
})();
