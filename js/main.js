/**
 * VOLT FIT - ACADEMIA & PERFORMANCE
 * Interações e Lógica Front-end
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPricingToggle();
  initGallery();
  initBmiCalculator();
  initFaqAccordion();
  initUnitsSelector();
  initForms();
  initCounters();
});

/* ==========================================================================
   1. NAVBAR & MENU MOBILE
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  // Navbar scroll background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-slate-950/95', 'shadow-lg', 'border-b', 'border-blue-900/40');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-slate-950/95', 'shadow-lg', 'border-b', 'border-blue-900/40');
      header.classList.add('bg-transparent');
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl text-yellow-400"></i>';
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-2xl text-yellow-400"></i>';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl text-yellow-400"></i>';
      });
    });
  }
}

/* ==========================================================================
   2. PLANOS & PREÇOS (MENSAL VS ANUAL TOGGLE)
   ========================================================================== */
function initPricingToggle() {
  const billingToggle = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  
  if (!billingToggle) return;

  const prices = {
    silver: { monthly: '89,90', annual: '69,90' },
    gold: { monthly: '139,90', annual: '109,90' },
    black: { monthly: '189,90', annual: '149,90' }
  };

  const silverPriceEl = document.getElementById('priceSilver');
  const goldPriceEl = document.getElementById('priceGold');
  const blackPriceEl = document.getElementById('priceBlack');
  const billingPeriodEls = document.querySelectorAll('.billing-period');

  billingToggle.addEventListener('change', () => {
    const isAnnual = billingToggle.checked;

    if (isAnnual) {
      silverPriceEl.textContent = prices.silver.annual;
      goldPriceEl.textContent = prices.gold.annual;
      blackPriceEl.textContent = prices.black.annual;

      billingPeriodEls.forEach(el => el.textContent = '/mês (no plano anual)');
      annualLabel.classList.add('text-yellow-400', 'font-bold');
      annualLabel.classList.remove('text-slate-400');
      monthlyLabel.classList.remove('text-yellow-400', 'font-bold');
      monthlyLabel.classList.add('text-slate-400');
    } else {
      silverPriceEl.textContent = prices.silver.monthly;
      goldPriceEl.textContent = prices.gold.monthly;
      blackPriceEl.textContent = prices.black.monthly;

      billingPeriodEls.forEach(el => el.textContent = '/mês (sem fidelidade)');
      monthlyLabel.classList.add('text-yellow-400', 'font-bold');
      monthlyLabel.classList.remove('text-slate-400');
      annualLabel.classList.remove('text-yellow-400', 'font-bold');
      annualLabel.classList.add('text-slate-400');
    }
  });
}

/* ==========================================================================
   3. GALERIA COM FILTROS E LIGHTBOX MODAL
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentVisibleItems = Array.from(galleryItems);
  let currentIndex = 0;

  // Filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-yellow-400', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
      });
      btn.classList.add('bg-yellow-400', 'text-slate-950', 'font-bold');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });

      // Atualiza lista de itens visíveis para navegação no lightbox
      currentVisibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  // Abrir Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = currentVisibleItems.indexOf(item);
      openLightbox(item);
    });
  });

  function openLightbox(item) {
    if (!item) return;
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || 'Estrutura Volt Fit';
    const category = item.getAttribute('data-category') || 'Academia';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category.toUpperCase();

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    openLightbox(currentVisibleItems[currentIndex]);
  }

  function showPrev() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    openLightbox(currentVisibleItems[currentIndex]);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  // Fechar ao clicar no backdrop
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   4. CALCULADORA DE IMC INTERATIVA
   ========================================================================== */
function initBmiCalculator() {
  const form = document.getElementById('bmiForm');
  const resultBox = document.getElementById('bmiResult');
  const scoreEl = document.getElementById('bmiScore');
  const statusEl = document.getElementById('bmiStatus');
  const tipEl = document.getElementById('bmiTip');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const heightCm = parseFloat(document.getElementById('bmiHeight').value);

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
      alert('Por favor, informe peso e altura válidos.');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    scoreEl.textContent = bmi;

    let status = '';
    let tip = '';
    let badgeColor = '';

    if (bmi < 18.5) {
      status = 'Abaixo do peso ideal';
      badgeColor = 'text-blue-400';
      tip = 'Recomendamos nosso programa focado em hipertrofia e ganho de massa magra com suporte nutricional.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = 'Peso Saudável / Ideal';
      badgeColor = 'text-green-400';
      tip = 'Excelente! Foque em definição muscular, resistência e condicionamento com nossas aulas de Cross e Musculação.';
    } else if (bmi >= 25 && bmi <= 29.9) {
      status = 'Sobrepeso moderado';
      badgeColor = 'text-yellow-400';
      tip = 'Nossos treinos intervalados de alta intensidade (HIIT) e spinning são perfeitos para acelerar seu gasto calórico.';
    } else {
      status = 'Obesidade';
      badgeColor = 'text-red-400';
      tip = 'Conte com nosso plano guiado por personal trainer para treinar com segurança e transformar sua saúde.';
    }

    statusEl.textContent = status;
    statusEl.className = `text-lg font-bold ${badgeColor}`;
    tipEl.textContent = tip;

    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-toggle');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');

      // Fecha todos os outros
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.classList.remove('open');
      });
      document.querySelectorAll('.faq-icon').forEach(i => {
        i.style.transform = 'rotate(0deg)';
      });

      // Abre o atual se não estava aberto
      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   6. SELETOR DE UNIDADES (LOCALIZAÇÃO)
   ========================================================================== */
function initUnitsSelector() {
  const unitButtons = document.querySelectorAll('.unit-btn');
  const unitDetails = document.querySelectorAll('.unit-info-card');
  const mapIframe = document.getElementById('mapIframe');

  const unitMaps = {
    centro: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.106694142322!2d-46.65390548447545!3d-23.564611284681603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr",
    jardins: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.883713063529!2d-46.66986508447525!3d-23.57262108467761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59e13d967b57%3A0xa1936b13e9a16f9f!2sJardins%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1680000000001!5m2!1spt-BR!2sbr"
  };

  unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetUnit = btn.getAttribute('data-unit');

      unitButtons.forEach(b => {
        b.classList.remove('bg-yellow-400', 'text-slate-950', 'border-yellow-400', 'font-bold');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-700');
      });

      btn.classList.add('bg-yellow-400', 'text-slate-950', 'border-yellow-400', 'font-bold');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-700');

      unitDetails.forEach(card => {
        if (card.getAttribute('data-unit') === targetUnit) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      if (mapIframe && unitMaps[targetUnit]) {
        mapIframe.src = unitMaps[targetUnit];
      }
    });
  });
}

/* ==========================================================================
   7. FORMULÁRIOS & TOAST
   ========================================================================== */
function initForms() {
  const leadForm = document.getElementById('freeClassForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('leadName').value;
      const unit = document.getElementById('leadUnit').value;

      document.getElementById('modalStudentName').textContent = name || 'Atleta';
      document.getElementById('modalChosenUnit').textContent = unit || 'Unidade Principal';

      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
      }

      leadForm.reset();
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Obrigado! Seu e-mail foi cadastrado para receber dicas e ofertas VIP.');
      newsletterForm.reset();
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   8. CONTADORES ANIMADOS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const step = Math.ceil(target / (duration / 25));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target.toLocaleString('pt-BR');
              clearInterval(timer);
            } else {
              counter.textContent = current.toLocaleString('pt-BR');
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

