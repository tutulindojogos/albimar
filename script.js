(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  // Header muda de cor ao rolar
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
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
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Bolhas subindo no hero
  var bubbles = document.getElementById('bubbles');
  var count = window.innerWidth < 600 ? 14 : 26;
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

  // Revelar elementos ao rolar
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('show'); });
  }

  // Contadores animados
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
        if (e.isIntersecting) {
          animateCounter(e.target);
          co.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
  }

  // Ano no rodapé
  document.getElementById('year').textContent = new Date().getFullYear();
})();
