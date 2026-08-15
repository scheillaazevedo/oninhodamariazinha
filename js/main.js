// O Ninho da Mariazinha — script principal
// Inclui: hero slider (homepage), modais (abrir/fechar), toggle pessoa/empresa,
// menu mobile (hambúrguer) e gráfico de impacto (Chart.js), quando presentes na página.

(function () {
  // ---------- Hero slider (apenas na homepage) ----------
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.slide');
    const dotsWrap = document.getElementById('heroSliderDots');
    let current = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let dots = [];
    if (dotsWrap && slides.length > 1) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Imagem ' + (i + 1) + ' de ' + slides.length);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
      dots = dotsWrap.querySelectorAll('button');
    }

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    if (slides.length > 1 && !prefersReducedMotion) {
      setInterval(() => {
        goTo((current + 1) % slides.length);
      }, 4500);
    }
  }

  // ---------- Gráfico de impacto (Chart.js), quando o canvas existir ----------
  const impactCanvas = document.getElementById('impactChart');
  if (impactCanvas && window.Chart) {
    new Chart(impactCanvas, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Famílias apoiadas',
          data: [55, 68, 74, 86, 95, 102],
          borderColor: '#3F5C38',
          backgroundColor: 'rgba(146,189,133,0.18)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#3F5C38',
          tension: .35,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#E3E0D3' }, ticks: { color: '#63625A', font: { family: 'Work Sans' } } },
          x: { grid: { display: false }, ticks: { color: '#63625A', font: { family: 'Work Sans' } } }
        }
      }
    });
  }

  // ---------- Modais (abrir/fechar) ----------
  const overlays = document.querySelectorAll('.modal-overlay');
  let lastFocused = null;

  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); openModal(btn.getAttribute('data-modal-open')); });
  });

  overlays.forEach(overlay => {
    overlay.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(overlay));
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => {
        if (overlay.classList.contains('is-open')) closeModal(overlay);
      });
    }
  });

  // ---------- Toggle Pessoa singular / Empresa (modal Apoie-nos) ----------
  document.querySelectorAll('.toggle-group').forEach(group => {
    const btns = group.querySelectorAll('.toggle-btn');
    const modal = group.closest('.modal');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        const target = btn.getAttribute('data-toggle-target');
        modal.querySelectorAll('.toggle-panel').forEach(p => {
          p.hidden = p.getAttribute('data-panel') !== target;
        });
      });
    });
  });

  // ---------- Menu mobile (hambúrguer) ----------
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Formulário de voluntariado (confirmação inline, se existir) ----------
  const formVoluntario = document.getElementById('form-voluntario');
  if (formVoluntario) {
    formVoluntario.addEventListener('submit', function (e) {
      e.preventDefault();
      formVoluntario.style.display = 'none';
      const confirm = document.getElementById('form-voluntario-confirm');
      if (confirm) confirm.style.display = 'block';
    });
  }

  // Carrega o rodapé partilhado a partir de partials/footer.html
  fetch('partials/footer.html')
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById('footer-placeholder');
      if (placeholder) placeholder.outerHTML = html;
    })
    .catch(() => {});
})();
