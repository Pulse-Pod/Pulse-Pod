/**
 * Project Pulse & Pod - Core Javascript Controller
 * 15+ Years Web Development Experience Design: Modular, State-Driven, Responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeaderScroll();
  initThemeToggles();
  initStatsCounters();
  initCropShowcase();
  initSupplyChainVisualizer();
  initB2BCalculator();
  initMobileNav();
});

// ==========================================
// 1. PRELOADER CONTROLLER
// ==========================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.querySelector('.loader-bar-fill');
  
  if (!preloader || !loaderBar) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Trigger initial page load animations
        document.querySelectorAll('.animate-up').forEach((el, index) => {
          el.style.animationDelay = `${index * 0.15}s`;
        });
      }, 300);
    }
    loaderBar.style.width = `${progress}%`;
  }, 100);
}

// ==========================================
// 2. HEADER SCROLL STATE
// ==========================================
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================
// 3. THEME TOGGLES & CROP SPECIFIC THEMES
// ==========================================
function initThemeToggles() {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  // Theme Toggle: Light/Dark Mode
  if (themeToggle) {
    // Check local storage for preference, default to true (dark) if not set
    const isDark = localStorage.getItem('theme-dark') !== 'false';
    if (isDark) {
      body.classList.add('dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      body.classList.remove('dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
    
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      const darkActive = body.classList.contains('dark');
      localStorage.setItem('theme-dark', darkActive);
      
      if (darkActive) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    });
  }

}

// ==========================================
// 4. STATS COUNTERS (INTERSECTION OBSERVER)
// ==========================================
function initStatsCounters() {
  const trigger = document.getElementById('metrics-trigger');
  const counters = document.querySelectorAll('.counter');
  
  if (!trigger || counters.length === 0) return;
  
  let animated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(trigger);
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const isFloat = counter.dataset.target.includes('.');
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        
        const currentVal = easeProgress * target;
        
        if (isFloat) {
          counter.textContent = currentVal.toFixed(1);
        } else {
          counter.textContent = Math.floor(currentVal);
        }
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target; // Clamp final value
        }
      }
      
      requestAnimationFrame(updateNumber);
    });
  }
}

// ==========================================
// 5. CROP SHOWCASE DATA & INTERACTION
// ==========================================
// ==========================================
// 5. CROP SHOWCASE DATA & INTERACTION (DYNAMIC SLIDER)
// ==========================================
function initCropShowcase() {
  const config = window.PULSE_POD_CONFIG;
  if (!config || !config.crops) return;

  const track = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('slider-dots');
  if (!track || !dotsContainer) return;

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  config.crops.forEach((crop, index) => {
    // 1. Create the slide element
    const slide = document.createElement('div');
    slide.className = `crop-slide ${index === 0 ? 'active' : ''}`;
    slide.dataset.crop = crop.key;

    // Build the spec panel inside each slide dynamically
    slide.innerHTML = `
      <div class="slide-layout grid-two">
        <div class="slide-visual">
          <img src="${crop.image}" alt="${crop.title}">
          <div class="spec-quote-box">
            <span class="quote-mark">“</span>
            <p class="spec-quote-text">${crop.quote}</p>
          </div>
        </div>
        <div class="spec-info">
          <span class="crop-category">${crop.category}</span>
          <h3>${crop.title}</h3>
          
          <div class="spec-tabs">
            <button class="spec-tab-btn active" data-tab="nutrition-${crop.key}">Nutritional Profile</button>
            <button class="spec-tab-btn" data-tab="commercial-${crop.key}">Commercial Specs</button>
            <button class="spec-tab-btn" data-tab="packaging-${crop.key}">Packaging Standards</button>
          </div>
          
          <!-- Tab Content: Nutrition -->
          <div id="tab-nutrition-${crop.key}" class="tab-pane active">
            <div class="nutri-bar">
              <span class="bar-label">Protein (per 100g) <strong>${crop.nutrition.protein.value}</strong></span>
              <div class="bar-outer">
                <div class="bar-inner" style="width: ${crop.nutrition.protein.percentage * 3}%;"></div>
              </div>
            </div>
            <div class="nutri-bar">
              <span class="bar-label">Dietary Fiber (per 100g) <strong>${crop.nutrition.fiber.value}</strong></span>
              <div class="bar-outer">
                <div class="bar-inner" style="width: ${crop.nutrition.fiber.percentage * 4}%;"></div>
              </div>
            </div>
            <div class="nutri-bar">
              <span class="bar-label">Iron (DV %) <strong>${crop.nutrition.iron.value}</strong></span>
              <div class="bar-outer">
                <div class="bar-inner" style="width: ${crop.nutrition.iron.percentage}%;"></div>
              </div>
            </div>
            <p class="spec-disclaimer">*Nutritional figures represent averages sourced from seasonal laboratory reports.</p>
          </div>
          
          <!-- Tab Content: Commercial Specs -->
          <div id="tab-commercial-${crop.key}" class="tab-pane">
            <table class="spec-table">
              <tr><td>Purity Rating</td><td>${crop.specs.purity}</td></tr>
              <tr><td>Moisture Content</td><td>${crop.specs.moisture}</td></tr>
              <tr><td>Foreign Matter</td><td>${crop.specs.foreign}</td></tr>
              <tr><td>Weevil Cut / Infestation</td><td>${crop.specs.infest}</td></tr>
              <tr><td>Admixture Grade</td><td>${crop.specs.admix}</td></tr>
            </table>
          </div>
          
          <!-- Tab Content: Packaging -->
          <div id="tab-packaging-${crop.key}" class="tab-pane">
            <div class="packaging-options">
              <div class="pkg-card">
                <h4>Quick Commerce Retail</h4>
                <p>${crop.pkgRetail}</p>
              </div>
              <div class="pkg-card">
                <h4>B2B Bulk Wholesale</h4>
                <p>${crop.pkgBulk}</p>
              </div>
            </div>
          </div>
          
          <a href="#calculator" class="btn btn-primary spec-cta">Estimate Bulk Quote</a>
        </div>
      </div>
    `;
    track.appendChild(slide);

    // 2. Create the dots indicator
    const dot = document.createElement('button');
    dot.className = `dot-indicator ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  // Tab switching click handlers inside slides
  const tabBtns = track.querySelectorAll('.spec-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const paneContainer = btn.closest('.spec-info');
      paneContainer.querySelectorAll('.spec-tab-btn').forEach(b => b.classList.remove('active'));
      paneContainer.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabTarget = btn.dataset.tab;
      paneContainer.querySelector(`#${tabTarget}`).classList.add('active');
    });
  });

  // Slider Navigation Logic
  let currentSlide = 0;
  const totalSlides = config.crops.length;
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots indicators
    const dots = dotsContainer.querySelectorAll('.dot-indicator');
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update active class on slides for transition effects
    const slides = track.querySelectorAll('.crop-slide');
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
    });
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50; // minimum distance in px to trigger swipe
    if (touchStartX - touchEndX > swipeThreshold) {
      goToSlide(currentSlide + 1); // Swipe left -> Next
    } else if (touchEndX - touchStartX > swipeThreshold) {
      goToSlide(currentSlide - 1); // Swipe right -> Previous
    }
  }

  // Update calculator selection dynamically on CTA click
  track.querySelectorAll('.spec-cta').forEach(cta => {
    cta.addEventListener('click', () => {
      const calcCropSelect = document.getElementById('calc-crop');
      const slideCrop = cta.closest('.crop-slide').dataset.crop;
      if (calcCropSelect && slideCrop) {
        calcCropSelect.value = slideCrop;
        calcCropSelect.dispatchEvent(new Event('change'));
      }
    });
  });
}

// ==========================================
// 6. SUPPLY CHAIN TIMELINE VISUALIZER
// ==========================================
const PIPELINE_DATA = {
  "1": {
    phase: "Phase 01",
    title: "Field Sourcing & Quality Checks",
    desc: "We procure crops directly from the fields of East Andhra Pradesh. Payouts are made fairly directly at their fields or at our procurement hubs based on quality verification checks.",
    img: "assets/hero_background.png",
    metric: "Sourcing Location: East Andhra Pradesh farm fields."
  },
  "2": {
    phase: "Phase 02",
    title: "Natural Winnowing & Cleaning",
    desc: "Seeds undergo cleaning using time-tested natural procedures: physical winnowing, sieving, and water cleaning to remove all dust, soil, and field debris.",
    img: "assets/processing_facility.png",
    metric: "Cleaning Style: Winnowing, Sieving & Water Washing."
  },
  "3": {
    phase: "Phase 03",
    title: "Sun Drying & Natural Repellents",
    desc: "Cleaned harvests are sun-dried under natural light. To safeguard the pulses organically, we mix them with natural pest repellents including dried neem leaves and spicy Guntur Mirchi (chili).",
    img: "assets/processing_facility.png",
    metric: "Pest Protection: Guntur Mirchi & Dried Neem Leaves."
  },
  "4": {
    phase: "Phase 04",
    title: "Eco Jute Bag Packaging",
    desc: "Clean pulses and seeds are packed into environment-safe, high-durability jute bags. Jute packaging provides organic ventilation and guarantees 100% environmental safety.",
    img: "assets/green_moong.png",
    metric: "Environmental Safeguard: 100% Biodegradable Jute Bags."
  },
  "5": {
    phase: "Phase 05",
    title: "Direct Market Supply",
    desc: "Dispatched direct to quick-commerce dark stores (Zepto, Blinkit, Bigbasket) and scheduled delivery drops at apartment gated community depots, saving transit time and retail markup.",
    img: "assets/sesame.png",
    metric: "Market Sourcing: Quick Commerce & Gated Communities."
  }
};

function initSupplyChainVisualizer() {
  const steps = document.querySelectorAll('.timeline-step');
  const fill = document.querySelector('.progress-fill');
  
  if (steps.length === 0 || !fill) return;
  
  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      
      const stepNum = step.dataset.step;
      const data = PIPELINE_DATA[stepNum];
      if (!data) return;
      
      // Calculate progress fill percentage (e.g., step 1 = 0%, step 5 = 100%)
      const percentage = ((parseInt(stepNum) - 1) / 4) * 100;
      fill.style.width = `${percentage}%`;
      
      // Update card interface text
      const detailCard = document.getElementById('step-detail-card');
      detailCard.style.opacity = 0; // Quick fade effect
      
      setTimeout(() => {
        document.getElementById('step-img').src = data.img;
        document.getElementById('step-img').alt = data.title;
        document.querySelector('.step-num-badge').textContent = data.phase;
        document.getElementById('step-title-text').textContent = data.title;
        document.getElementById('step-desc-text').textContent = data.desc;
        document.getElementById('step-metric-value').textContent = data.metric;
        detailCard.style.opacity = 1;
      }, 200);
    });
  });
}

// ==========================================
// 7. B2B LOGISTICS & SAVINGS CALCULATOR
// ==========================================
function initB2BCalculator() {
  const config = window.PULSE_POD_CONFIG;
  if (!config || !config.prices) return;
  const BASE_PRICES = config.prices;

  const cropSelect = document.getElementById('calc-crop');
  const qtySlider = document.getElementById('calc-quantity');
  const destSelect = document.getElementById('calc-destination');
  const qtyDisplay = document.getElementById('qty-display');
  const costDisplay = document.getElementById('result-cost');
  const savingsDisplay = document.getElementById('result-savings');
  const pkgDisplay = document.getElementById('result-packaging');
  const truckDisplay = document.getElementById('result-truck');
  const farmerPayDisplay = document.getElementById('result-farmer-payout');
  const scoreMeterFill = document.getElementById('score-meter-fill');
  
  if (!qtySlider) return;
  
  function updateCalculator() {
    const crop = cropSelect.value;
    const qty = parseFloat(qtySlider.value);
    const dest = destSelect.value;
    
    qtyDisplay.textContent = `${qty.toFixed(1)} Ton${qty > 1 ? 's' : ''}`;
    
    // Price calculations
    const basePrice = BASE_PRICES[crop] || 78000;
    const totalCost = basePrice * qty;
    
    // Savings calculations (Middleman premium ranges from 16% to 22% depending on channel)
    let markupFactor = 0.18; // Default 18% saving
    if (dest === 'zepto' || dest === 'blinkit') markupFactor = 0.21;
    if (dest === 'local') markupFactor = 0.16;
    
    const middlemanCost = totalCost * (1 + markupFactor);
    const savings = middlemanCost - totalCost;
    const savingsPercent = (savings / middlemanCost) * 100;
    
    // Farmer digital payouts index (Direct trade passes 85-90% of base price to farmers)
    let payoutPct = 0.88; // 88%
    if (crop === 'moong') payoutPct = 0.89;
    if (crop === 'sesame') payoutPct = 0.86;
    
    const farmerPayout = totalCost * payoutPct;
    
    // Package layouts
    const bagsCount = Math.round((qty * 1000) / 50); // 50kg jute bags
    
    // Truck load space (10-Ton typical delivery vehicle capacity)
    const truckCapacity = 10.0;
    const truckLoads = qty / truckCapacity;
    let truckText = "";
    if (truckLoads < 0.1) {
      truckText = "LCL Courier Pallets";
    } else if (truckLoads < 1.0) {
      truckText = `${Math.round(truckLoads * 10)}/10 of a 10T Truck`;
    } else {
      truckText = `${truckLoads.toFixed(1)} Truckload${truckLoads > 1 ? 's' : ''} (10T)`;
    }
    
    // Update DOM UI elements
    costDisplay.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
    savingsDisplay.textContent = `₹${Math.round(savings).toLocaleString('en-IN')} (${savingsPercent.toFixed(1)}%)`;
    pkgDisplay.textContent = `${bagsCount} Bags (50kg Eco Jute Bags)`;
    truckDisplay.textContent = truckText;
    farmerPayDisplay.textContent = `₹${Math.round(farmerPayout).toLocaleString('en-IN')}`;
    
    // Update fairness score bar indicator
    scoreMeterFill.style.width = `${payoutPct * 100}%`;
    document.querySelector('.score-caption').textContent = `${Math.round(payoutPct * 100)}% of your purchasing capital flows directly into grower accounts.`;
  }
  
  // Attach event handlers
  cropSelect.addEventListener('change', updateCalculator);
  qtySlider.addEventListener('input', updateCalculator);
  destSelect.addEventListener('change', updateCalculator);
  
  // Form submission handler
  document.getElementById('calc-cta-btn').addEventListener('click', (e) => {
    e.preventDefault();
    // Scroll smoothly to footer contact section
    document.querySelector('.site-footer').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Initial compute
  updateCalculator();
}



// ==========================================
// 9. MOBILE NAVIGATION & TOGGLE MENU
// ==========================================
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav-links');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  
  // Close menu when clicking link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}
