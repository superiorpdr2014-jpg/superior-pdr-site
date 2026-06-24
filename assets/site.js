/* ============================================================
   SUPERIOR PDR — shared subpage behaviour
   - bilingual (zh default) via a [selector, en, zh, mode] table
   - hover dropdown is CSS-only; JS only assigns data-key + lang
   - reuses localStorage key 'superior-lang' shared with the homepage
   ============================================================ */
(function () {
  // shared chrome strings (nav + dropdown + footer + cta band)
  var CHROME_T = [
    ['nav.top .logo-text .bot-line', 'SINCE 2014 · TAIPEI · TAIWAN', '自 2014 · 台北 · 台灣', 'text'],
    ['nav.top .links a[data-key="home"]',        'Home',        '首頁',     'text'],
    ['nav.top .links a[data-key="about"]',       'About',       '關於我們', 'text'],
    ['nav.top .links a[data-key="services"]',    'Services',    '服務項目', 'text'],
    ['nav.top .links a[data-key="tools"]',       '凹痕工廠Tools', '凹痕工廠Tools', 'text'],
    ['nav.top .links a[data-key="studio"]',      'Journal',     '工作日誌', 'text'],
    ['nav.top .links a[data-key="case"]',        'Case Study',  '案例實績', 'text'],
    ['nav.top .links a[data-key="training"]',    'Training',    '技術教學', 'text'],
    ['nav.top .links a[data-key="locations"]',   'Locations',   '據點分佈', 'text'],
    ['nav.top .links a[data-key="contact"]',     'Contact',     '聯絡我們', 'text'],
    ['nav.top .dropdown a[data-d="excellence"]', 'Journey of Excellence', '卓越歷程', 'text'],
    ['nav.top .dropdown a[data-d="about"]',      'About Us',              '關於我們', 'text'],
    ['nav.top .dropdown a[data-d="quality"]',    'Repair Quality',        '關於修復品質', 'text'],
    ['nav.top .dropdown a[data-d="pricing"]',    'Pricing & Booking',     '參考價目與預約流程', 'text'],
    ['nav.top .dropdown a[data-d="technicians"]','Certified Technicians',  '卓越技師', 'text'],
    ['nav.top .dropdown a[data-d="svc-pdr"]',   'PDR Dent Repair',         'PDR凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-ev"]',    'EV Dent Repair',          '電動車凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-large"]', 'Large Area Dent Repair',  '大面積凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-alloy"]', 'Alloy Dent Repair',       '鋁合金凹痕修復', 'text'],
    ['nav.top .dropdown a[data-d="svc-moto"]',  'Motorcycle Tank Repair',  '重機油箱凹痕修復', 'text'],
    ['nav.top .cta span', 'Book Now', '立即預約', 'text'],
    // cta band (shared)
    ['.cta-band .ct .s', 'BOOK NOW · FREE ESTIMATE', '立即預約 · 免費估價', 'text'],
    ['.cta-band .ct .t', 'Ready when you are.', '隨時為您服務。', 'text'],
    ['.cta-band .ct-actions .cta:nth-of-type(1) span', 'Online Booking', '線上預約', 'text'],
    ['.cta-band .ct-actions .cta:nth-of-type(2) span', 'Call Us', '客服專線', 'text'],
    // footer
    ['footer .foot-links a:nth-of-type(1)', 'Home',      '首頁',     'text'],
    ['footer .foot-links a:nth-of-type(2)', 'Services',  '服務項目', 'text'],
    ['footer .foot-links a:nth-of-type(3)', 'Showcase',  '作品實績', 'text'],
    ['footer .foot-links a:nth-of-type(4)', 'Training',  '技術教學', 'text'],
    ['footer .foot-links a:nth-of-type(5)', 'Locations', '據點分佈', 'text'],
    ['footer .foot-links a:nth-of-type(6)', 'Contact',   '聯絡我們', 'text'],
    ['footer .logo-text .bot-line', '© 2026 SUPERIOR PDR · ALL RIGHTS RESERVED', '© 2026 SUPERIOR PDR · 版權所有', 'text']
  ];

  function table() { return CHROME_T.concat(window.PAGE_T || []); }

  /* ── Central nav template ──────────────────────────────────────────
     Pages set <nav id="topnav" data-current="KEY"></nav> (empty).
     Keys: home | about | excellence | quality | pricing | technicians
           svc-pdr | svc-ev | svc-large | svc-alloy | svc-moto
           credentials | showcase | blog | training | contact
     To add a new page: add its key here and set data-current on that page.
  ─────────────────────────────────────────────────────────────────── */
  function buildNavHTML(cur) {
    var aboutKeys = ['excellence','about','quality','pricing','technicians'];
    var svcKeys   = ['svc-pdr','svc-ev','svc-large','svc-alloy','svc-moto'];
    var trainKeys = ['training','training-2w','training-4w','training-adv','training-event'];
    var aboutOn = aboutKeys.indexOf(cur) > -1;
    var svcOn   = svcKeys.indexOf(cur) > -1;
    var trainOn = trainKeys.indexOf(cur) > -1;
    function cc(k)  { return cur === k ? ' current' : ''; }
    function ddc(d) { return cur === d ? ' current' : ''; }
    return [
      '<a href="index.html" class="logo">',
      '  <img class="logo-circle" src="media/logo-circle.png" alt="Superior PDR">',
      '  <div class="logo-text"><div class="top-line">SUPERIOR PDR</div>',
      '  <div class="bot-line">自 2014 · 台北 · 台灣</div></div>',
      '</a>',
      '<div class="links">',
      '  <a class="nav-link'+cc('home')+'" href="index.html" data-key="home">首頁</a>',
      '  <div class="nav-item">',
      '    <a class="nav-link'+(aboutOn?' current':'')+'" href="about-us.html" data-key="about">關於我們<span class="nav-caret"></span></a>',
      '    <div class="dropdown">',
      '      <a class="ddi'+ddc('excellence')+'" data-d="excellence" href="history.html">卓越歷程</a>',
      '      <a class="ddi'+ddc('about')+'" data-d="about" href="about-us.html">關於我們</a>',
      '      <a class="ddi'+ddc('quality')+'" data-d="quality" href="quality.html">關於修復品質</a>',
      '      <a class="ddi'+ddc('pricing')+'" data-d="pricing" href="price-2.html">參考價目與預約流程</a>',
      '      <a class="ddi'+ddc('technicians')+'" data-d="technicians" href="technicians.html">卓越技師</a>',
      '    </div>',
      '  </div>',
      '  <div class="nav-item">',
      '    <a class="nav-link'+(svcOn?' current':'')+'" href="pdr.html" data-key="services">服務項目<span class="nav-caret"></span></a>',
      '    <div class="dropdown">',
      '      <a class="ddi'+ddc('svc-pdr')+'" data-d="svc-pdr" href="pdr.html">PDR凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-ev')+'" data-d="svc-ev" href="electriccar.html">電動車凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-large')+'" data-d="svc-large" href="bigdent.html">大面積凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-alloy')+'" data-d="svc-alloy" href="aluminum.html">鋁合金凹痕修復</a>',
      '      <a class="ddi'+ddc('svc-moto')+'" data-d="svc-moto" href="motortank.html">重機油箱凹痕修復</a>',
      '    </div>',
      '  </div>',
      '  <a class="nav-link'+cc('blog')+'" href="blog.html" data-key="studio">工作日誌</a>',
      '  <a class="nav-link'+cc('case-video')+'" href="case-video.html" data-key="case">案例實績</a>',
      '  <div class="nav-item">',
      '    <a class="nav-link'+(trainOn?' current':'')+' " href="news-3.html" data-key="training">技術教學<span class="nav-caret"></span></a>',
      '    <div class="dropdown">',
      '      <a class="ddi'+ddc('training')+'" data-d="training" href="news-3.html">學習PDR</a>',
      '      <a class="ddi" href="https://www.denttrainer.com/courses/pdr-pdr-101-course" target="_blank" rel="noopener">PDR線上教學</a>',
      '      <a class="ddi'+ddc('training-2w')+'" data-d="training-2w" href="training-2week.html">中階技術訓練 <small style="opacity:.6;font-size:11px">2 Week</small></a>',
      '      <a class="ddi'+ddc('training-4w')+'" data-d="training-4w" href="training-4week.html">完整技術訓練 <small style="opacity:.6;font-size:11px">4 Week</small></a>',
      '      <a class="ddi'+ddc('training-adv')+'" data-d="training-adv" href="advancedtraining.html">PDR進階技術訓練</a>',
      '      <a class="ddi'+ddc('training-event')+'" data-d="training-event" href="advancedevent.html">國際進階訓練研討會</a>',
      '    </div>',
      '  </div>',
      '  <a class="nav-link'+cc('contact')+'" href="contact.html" data-key="locations">據點分佈</a>',
      '  <a class="nav-link" href="https://www.dentstagetools.com.tw/" data-key="tools" target="_blank" rel="noopener">凹痕工廠Tools</a>',
      '</div>',
      '<div class="nav-social" style="display:flex;align-items:center;gap:8px;margin-left:10px">',
      '  <a href="https://www.facebook.com/PdrSuperior" target="_blank" rel="noopener" aria-label="Facebook" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#1877f2;text-decoration:none;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>',
      '  <a href="https://www.instagram.com/superiorpdrtaiwan/" target="_blank" rel="noopener" aria-label="Instagram" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7);text-decoration:none;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg></a>',
      '  <a href="https://www.youtube.com/channel/UC8mXr_dYrD6Or-jA91W1irw?view_as=subscriber" target="_blank" rel="noopener" aria-label="YouTube" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:#ff0000;text-decoration:none;transition:opacity .2s" onmouseover="this.style.opacity=\'.8\'" onmouseout="this.style.opacity=\'1\'"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000"/></svg></a>',
      '</div>',
      '<a class="cta" href="https://lin.ee/7ijf0fu" target="_blank" rel="noopener">',
      '  <span>LINE 預約</span>',
      '  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>',
      '</a>',
      '<button id="langToggle" class="lang-toggle" aria-label="Toggle language">',
      '  <span class="lang-opt zh active">中</span>',
      '  <span class="lang-sep">/</span>',
      '  <span class="lang-opt en">EN</span>',
      '</button>',
      '<button id="hamBtn" class="ham" aria-label="Menu">',
      '  <span></span><span></span><span></span>',
      '</button>'
    ].join('\n');
  }

  function injectNav() {
    var nav = document.getElementById('topnav');
    if (!nav || !nav.hasAttribute('data-current')) return;
    nav.innerHTML = buildNavHTML(nav.getAttribute('data-current'));
  }

  function applyLang(lang) {
    table().forEach(function (row) {
      var sel = row[0], en = row[1], zh = row[2], mode = row[3] || 'text';
      var el = document.querySelector(sel);
      if (!el) return;
      var val = lang === 'zh' ? zh : en;
      if (mode === 'html') el.innerHTML = val; else el.textContent = val;
    });
    // any element carrying data-en / data-zh (lets page authors translate inline)
    document.querySelectorAll('[data-zh]').forEach(function (el) {
      var v = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      if (v == null) return;
      if (v.indexOf('<') !== -1) el.innerHTML = v; else el.textContent = v;
    });
    document.querySelectorAll('#langToggle .lang-opt').forEach(function (o) { o.classList.remove('active'); });
    var act = document.querySelector('#langToggle .lang-opt.' + lang);
    if (act) act.classList.add('active');
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    try { localStorage.setItem('superior-lang', lang); } catch (e) {}
  }
  window.applySuperiorLang = applyLang;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    // inject centralised nav if page uses stub pattern
    injectNav();

    // ── Mobile nav drawer ────────────────────────────────────────────
    var mobNavEl = document.createElement('div');
    mobNavEl.className = 'mob-nav';
    mobNavEl.innerHTML = [
      '<div class="mob-group"><a href="index.html">首頁</a></div>',
      '<div class="mob-group">',
      '  <div class="mob-toggle">關於我們<span class="nav-caret"></span></div>',
      '  <div class="mob-sub">',
      '    <a href="history.html">卓越歷程</a>',
      '    <a href="about-us.html">關於我們</a>',
      '    <a href="quality.html">關於修復品質</a>',
      '    <a href="price-2.html">參考價目與預約流程</a>',
      '    <a href="technicians.html">卓越技師</a>',
      '  </div>',
      '</div>',
      '<div class="mob-group">',
      '  <div class="mob-toggle">服務項目<span class="nav-caret"></span></div>',
      '  <div class="mob-sub">',
      '    <a href="pdr.html">PDR凹痕修復</a>',
      '    <a href="electriccar.html">電動車凹痕修復</a>',
      '    <a href="bigdent.html">大面積凹痕修復</a>',
      '    <a href="aluminum.html">鋁合金凹痕修復</a>',
      '    <a href="motortank.html">重機油箱凹痕修復</a>',
      '  </div>',
      '</div>',
      '<div class="mob-group"><a href="blog.html">工作日誌</a></div>',
      '<div class="mob-group"><a href="case-video.html">案例實績</a></div>',
      '<div class="mob-group">',
      '  <div class="mob-toggle">技術教學<span class="nav-caret"></span></div>',
      '  <div class="mob-sub">',
      '    <a href="news-3.html">學習PDR</a>',
      '    <a href="https://www.denttrainer.com/courses/pdr-pdr-101-course" target="_blank" rel="noopener">PDR線上教學</a>',
      '    <a href="training-2week.html">中階技術訓練 (2 Week)</a>',
      '    <a href="training-4week.html">完整技術訓練 (4 Week)</a>',
      '    <a href="advancedtraining.html">PDR進階技術訓練</a>',
      '    <a href="advancedevent.html">國際進階訓練研討會</a>',
      '  </div>',
      '</div>',
      '<div class="mob-group"><a href="contact.html">據點分佈</a></div>',
      '<div class="mob-group"><a href="https://www.dentstagetools.com.tw/" target="_blank" rel="noopener">凹痕工廠Tools</a></div>',
      '<div class="mob-cta-wrap">',
      '  <a class="mob-cta" href="https://lin.ee/7ijf0fu" target="_blank" rel="noopener">',
      '    LINE 預約',
      '    <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>',
      '  </a>',
      '</div>'
    ].join('\n');
    document.body.appendChild(mobNavEl);

    var hamBtn = document.getElementById('hamBtn');
    if (hamBtn) {
      hamBtn.addEventListener('click', function () {
        hamBtn.classList.toggle('open');
        mobNavEl.classList.toggle('open');
        document.body.style.overflow = mobNavEl.classList.contains('open') ? 'hidden' : '';
      });
    }
    mobNavEl.querySelectorAll('.mob-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.mob-group').classList.toggle('open');
      });
    });
    mobNavEl.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (hamBtn) hamBtn.classList.remove('open');
        mobNavEl.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // assign stable nav keys to the 9 top-level links (skip dropdown items)
    var navKeys = ['home', 'about', 'services', 'studio', 'case', 'training', 'locations', 'tools'];
    document.querySelectorAll('nav.top .links .nav-link').forEach(function (a, i) {
      if (navKeys[i]) a.setAttribute('data-key', navKeys[i]);
    });

    // language
    var saved = 'zh';
    try { saved = localStorage.getItem('superior-lang') || 'zh'; } catch (e) {}
    applyLang(saved);
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.addEventListener('click', function () {
      var cur = 'zh';
      try { cur = localStorage.getItem('superior-lang') || 'zh'; } catch (e) {}
      applyLang(cur === 'zh' ? 'en' : 'zh');
    });

    // nav scrolled state
    var nav = document.getElementById('topnav');
    if (nav) window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });

    // reveal on scroll
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // counters
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseInt(el.dataset.counter, 10), suffix = el.dataset.suffix || '';
        var start = performance.now(), dur = 1500;
        (function step(now) {
          var t = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (t < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString() + suffix;
        })(start);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-counter]').forEach(function (el) { cio.observe(el); });
  });
})();
