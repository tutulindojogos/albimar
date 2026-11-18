(function () {
  'use strict';

  /* =====================================================
     MARCAS POR CATEGORIA  (edite aqui para mudar o catálogo)
     ===================================================== */
  var CATEGORIES = {
    cervejas: {
      icon: '🍺',
      title: 'Cervejas',
      desc: 'Lata, long neck, garrafa e barril das marcas que o público pede.',
      adult: true,
      brands: ['Heineken', 'Skol', 'Brahma', 'Antarctica', 'Budweiser', 'Stella Artois',
               'Itaipava', 'Amstel', 'Eisenbahn', 'Original', 'Corona', 'Bohemia']
    },
    refrigerantes: {
      icon: '🥤',
      title: 'Refrigerantes',
      desc: 'Versões tradicionais, zero e linha retornável.',
      brands: ['Coca-Cola', 'Pepsi', 'Guaraná Antarctica', 'Fanta', 'Sprite', 'Tubaína',
               'Dolly', 'Kuat', 'Schweppes', 'Sukita']
    },
    aguas: {
      icon: '💧',
      title: 'Águas',
      desc: 'Com e sem gás, em garrafas, galões e fardos.',
      brands: ['Crystal', 'Bonafont', 'Minalba', 'Indaiá', 'Prata', 'Lindoya', 'São Lourenço']
    },
    sucos: {
      icon: '🍊',
      title: 'Sucos e Chás',
      desc: 'Néctares, sucos prontos e chás gelados para todos os gostos.',
      brands: ['Del Valle', 'Maguary', 'Ades', 'Do Bem', 'Fuze Tea', 'Matte Leão',
               'Natural One', 'Tial']
    },
    energeticos: {
      icon: '⚡',
      title: 'Energéticos',
      desc: 'Energia na medida para o seu balcão.',
      brands: ['Red Bull', 'Monster', 'Fusion', 'TNT Energy', 'Baly', 'Burn', 'Flash Power', 'Nos']
    },
    destilados: {
      icon: '🥃',
      title: 'Destilados',
      desc: 'Vodkas, whiskies, cachaças, gins e licores.',
      adult: true,
      brands: ['Smirnoff', 'Absolut', 'Johnnie Walker', "Jack Daniel's", 'Jim Beam', 'Ypióca',
               '51', 'Velho Barreiro', 'Tanqueray', 'Gordon\'s', 'Campari', 'Jägermeister']
    }
  };

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header / progresso / menu ---------- */
  var header = document.getElementById('header');
  var progress = document.getElementById('progress');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    burger.classList.remove('open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    var open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ---------- Bolhas no hero ---------- */
  var bubbles = document.getElementById('bubbles');
  var count = window.innerWidth < 600 ? 14 : 28;
  for (var i = 0; i < count; i++) {
    var b = document.createElement('span');
    var size = 8 + Math.random() * 34;
    b.className = 'bubble';
    b.style.width = b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDuration = 9 + Math.random() * 12 + 's';
    b.style.animationDelay = -Math.random() * 18 + 's';
    bubbles.appendChild(b);
  }

  /* ---------- Faixa de marcas (marquee) ---------- */
  var track = document.getElementById('marqueeTrack');
  var all = [];
  Object.keys(CATEGORIES).forEach(function (k) {
    CATEGORIES[k].brands.slice(0, 6).forEach(function (n) { all.push(n); });
  });
  var html = '';
  for (var r = 0; r < 2; r++) {
    all.forEach(function (n) { html += '<span>' + n + '</span><i>✦</i>'; });
  }
  track.innerHTML = html;

  /* ---------- Categorias e marcas ---------- */
  var tabs = document.querySelectorAll('.cat-tab');
  var grid = document.getElementById('brandGrid');
  var panelIcon = document.getElementById('panelIcon');
  var panelTitle = document.getElementById('panelTitle');
  var panelDesc = document.getElementById('panelDesc');
  var panelCount = document.getElementById('panelCount');
  var panelNote = document.getElementById('panelNote');
  var panel = document.getElementById('brandPanel');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // quantidade de marcas em cada aba
  tabs.forEach(function (t) {
    var c = CATEGORIES[t.dataset.cat];
    t.querySelector('small').textContent = c.brands.length + ' marcas';
  });

  function showCategory(key, userClick) {
    var c = CATEGORIES[key];
    if (!c) return;

    tabs.forEach(function (t) {
      var on = t.dataset.cat === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });

    panelIcon.textContent = c.icon;
    panelTitle.textContent = c.title;
    panelDesc.textContent = c.desc;
    panelCount.textContent = c.brands.length + ' marcas';
    panelNote.textContent = c.adult ? '🔞 Venda permitida somente para maiores de 18 anos. Beba com moderação.' : '';
    panelNote.style.display = c.adult ? 'block' : 'none';

    grid.innerHTML = c.brands.map(function (name, idx) {
      return '<li class="brand-item" style="--i:' + idx + '"><span class="brand-item__name">' + esc(name) + '</span></li>';
    }).join('');

    // reinicia a animação do painel
    panel.classList.remove('swap');
    void panel.offsetWidth;
    panel.classList.add('swap');

    // no celular, leva o usuário até a lista de marcas
    if (userClick && window.innerWidth < 900) {
      panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showCategory(t.dataset.cat, true); });
  });
  showCategory('cervejas', false);

  /* ---------- Revelar ao rolar ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('show'); });
  }

  /* ---------- Contadores ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('pt-BR') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
