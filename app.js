/**
 * Project Pulse & Pod - Core Javascript Controller
 * 15+ Years Web Development Experience Design: Modular, State-Driven, Responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initHeaderScroll();
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
// 3. DARK MODE (Permanent — no toggle needed)
// ==========================================
// Dark mode is set directly on the <body> tag in index.html.
// No runtime theme switching is required.



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
const CROP_DATA = {
  moong: {
    title: "Premium Green Moong",
    quote: "Procured from East AP. Naturally winnowed, sun-dried, sieved, and herbal neem protected.",
    image: "assets/green_moong.png",
    nutrition: { protein: 24, fiber: 16, iron: 38 },
    purity: "99.9% (Water Cleaned & Sieved)",
    moisture: "Max 11.0%",
    foreign: "Max 0.05%",
    infest: "Nil (Guntur Mirchi & Neem Protected)",
    admix: "Max 0.2%",
    pkgRetail: "250g, 500g, 1kg eco-friendly paper pouches.",
    pkgBulk: "25kg / 50kg Biodegradable Eco Jute bags."
  },
  gram: {
    title: "Premium Black Gram",
    quote: "East AP farm field gate sourcing. Sieved, water-cleaned, and naturally protected.",
    image: "assets/black_gram.png",
    nutrition: { protein: 25, fiber: 18, iron: 32 },
    purity: "99.8% (Sieved & Water Cleaned)",
    moisture: "Max 12.0%",
    foreign: "Max 0.1%",
    infest: "Nil (Guntur Mirchi & Neem Protected)",
    admix: "Max 0.3%",
    pkgRetail: "500g, 1kg eco-friendly paper pouches.",
    pkgBulk: "25kg / 50kg Biodegradable Eco Jute bags."
  },
  sesame: {
    title: "Sun-Dried Sesame Seeds",
    quote: "Uniform golden seeds with rich oil contents, harvested using natural sun-drying.",
    image: "assets/sesame.png",
    nutrition: { protein: 18, fiber: 12, iron: 52 },
    purity: "99.9% (Water Cleaned & Sieved)",
    moisture: "Max 6.0%",
    foreign: "Max 0.02%",
    infest: "Nil (Guntur Mirchi & Neem Protected)",
    admix: "Max 0.1%",
    pkgRetail: "200g, 500g glass jars or paper packs.",
    pkgBulk: "25kg / 50kg Biodegradable Eco Jute bags."
  }
};

function initCropShowcase() {
  const cards = document.querySelectorAll('.crop-card');
  const specPanel = document.getElementById('crop-spec-panel');
  const closeBtn = document.querySelector('.spec-close-btn');
  
  if (cards.length === 0 || !specPanel) return;
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cropKey = card.dataset.cropTarget;
      const data = CROP_DATA[cropKey];
      if (!data) return;
      
      // Update spec panel layout contents
      document.getElementById('spec-title').textContent = data.title;
      document.getElementById('spec-image').src = data.image;
      document.getElementById('spec-image').alt = data.title;
      document.getElementById('spec-quote-text').textContent = data.quote;
      
      // Update nutrition metrics
      document.getElementById('nutri-p-val').textContent = `${data.nutrition.protein}g`;
      document.getElementById('nutri-p-bar').style.width = `${data.nutrition.protein * 3}%`; // Scaling multiplier for UI visual bar
      document.getElementById('nutri-f-val').textContent = `${data.nutrition.fiber}g`;
      document.getElementById('nutri-f-bar').style.width = `${data.nutrition.fiber * 4}%`;
      document.getElementById('nutri-i-val').textContent = `${data.nutrition.iron}%`;
      document.getElementById('nutri-i-bar').style.width = `${data.nutrition.iron}%`;
      
      // Update commercial spec table details
      document.getElementById('spec-purity').textContent = data.purity;
      document.getElementById('spec-moisture').textContent = data.moisture;
      document.getElementById('spec-foreign').textContent = data.foreign;
      document.getElementById('spec-infest').textContent = data.infest;
      document.getElementById('spec-admix').textContent = data.admix;
      
      // Update packaging text
      document.getElementById('spec-pkg-retail').textContent = data.pkgRetail;
      document.getElementById('spec-pkg-bulk').textContent = data.pkgBulk;
      
      // Scroll spec panel into view
      specPanel.style.display = 'block';
      specPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      specPanel.style.display = 'none';
    });
  }

  // Spec Panel Inner Tab Switcher
  const tabBtns = document.querySelectorAll('.spec-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const tabTarget = btn.dataset.tab;
      const specInfo = btn.closest('.spec-info');
      specInfo.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      specInfo.querySelector(`#tab-${tabTarget}`).classList.add('active');
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
const BASE_PRICES = {
  moong: 78000,   // price per Metric Ton (INR)
  gram: 84000,
  sesame: 112000
};

function initB2BCalculator() {
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
    const basePrice = BASE_PRICES[crop];
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
