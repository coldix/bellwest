// bellwest — promo page interactions
// Version: 1.0.0 | 2026-06-17

(function () {
  const BASE_PRICE = 495;
  const PRICING_MONTHS = [
    { label: "July 2026", month: "July", year: 2026, discount: 90 },
    { label: "August 2026", month: "August", year: 2026, discount: 80 },
    { label: "September 2026", month: "September", year: 2026, discount: 70 },
    { label: "October 2026", month: "October", year: 2026, discount: 60 },
    { label: "November 2026", month: "November", year: 2026, discount: 50 },
    { label: "December 2026", month: "December", year: 2026, discount: 40 },
    { label: "January 2027", month: "January", year: 2027, discount: 30 },
    { label: "February 2027", month: "February", year: 2027, discount: 20 },
    { label: "March 2027", month: "March", year: 2027, discount: 10 },
    { label: "April 2027+", month: "April", year: 2027, discount: 0 },
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatPrice(amount) {
    return amount % 1 === 0 ? "$" + amount.toFixed(0) : "$" + amount.toFixed(2);
  }

  function getTier(index) {
    const tier = PRICING_MONTHS[index] || PRICING_MONTHS[PRICING_MONTHS.length - 1];
    const price = BASE_PRICE * (1 - tier.discount / 100);
    const savings = BASE_PRICE - price;
    return { ...tier, price, savings, index };
  }

  function initPricingSlider() {
    const slider = document.getElementById("promo-price-slider");
    const priceEl = document.getElementById("promo-live-price");
    const monthEl = document.getElementById("promo-live-month");
    const discountEl = document.getElementById("promo-live-discount");
    const savingsEl = document.getElementById("promo-live-savings");
    const fillEl = document.getElementById("promo-slider-fill");
    const orderBtn = document.getElementById("promo-order-btn");
    const stripeSlot = document.getElementById("stripe-checkout-slot");
    const monthField = document.getElementById("promo-selected-month");

    if (!slider || !priceEl) return;

    function updatePricing() {
      const index = Number(slider.value);
      const tier = getTier(index);
      const max = Number(slider.max);
      const pct = max > 0 ? (index / max) * 100 : 0;

      priceEl.textContent = formatPrice(tier.price);
      if (monthEl) monthEl.textContent = tier.label;
      if (discountEl) {
        discountEl.textContent = tier.discount > 0 ? tier.discount + "% OFF" : "Full price";
        discountEl.classList.toggle("is-full", tier.discount === 0);
      }
      if (savingsEl) {
        savingsEl.textContent =
          tier.savings > 0 ? "Save " + formatPrice(tier.savings) + " this month" : "Standard monthly rate";
      }
      if (fillEl) fillEl.style.width = pct + "%";

      document.querySelectorAll(".promo-slider-tick").forEach(function (tick) {
        tick.classList.toggle("is-active", Number(tick.dataset.index) === index);
      });

      if (monthField) monthField.value = tier.label + " — " + formatPrice(tier.price);

      const orderSubject = "bellwest.au promo order — " + tier.label + " (" + formatPrice(tier.price) + ")";
      const orderBody = [
        "I'd like to order a bellwest.au promo page.",
        "",
        "Selected month: " + tier.label,
        "Monthly rate: " + formatPrice(tier.price) + (tier.discount > 0 ? " (" + tier.discount + "% introductory discount)" : " (full price)"),
        "Base price reference: $495/month + artwork/images",
        "",
        "Please send payment details / invoice.",
      ].join("\n");

      if (orderBtn) {
        orderBtn.href =
          "mailto:col@oze.com.au?subject=" +
          encodeURIComponent(orderSubject) +
          "&body=" +
          encodeURIComponent(orderBody);
        orderBtn.textContent = "Order now — " + formatPrice(tier.price);
      }

      if (stripeSlot) {
        stripeSlot.dataset.month = tier.label;
        stripeSlot.dataset.price = tier.price.toFixed(2);
      }
    }

    slider.addEventListener("input", updatePricing);
    updatePricing();
  }

  function initTiltCards() {
    if (reducedMotion) return;

    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      const max = Number(card.dataset.tiltMax || 8);

      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" + -y * max + "deg) rotateY(" + x * max + "deg) translateZ(12px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (reducedMotion) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", i * 0.08 + "s");
      observer.observe(el);
    });
  }

  function initPromoForm() {
    const promoForm = document.getElementById("promo-inquiry-form");
    if (!promoForm) return;

    promoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!promoForm.checkValidity()) {
        promoForm.reportValidity();
        return;
      }

      const name = document.getElementById("promo-name").value.trim();
      const email = document.getElementById("promo-email").value.trim();
      const phone = document.getElementById("promo-phone").value.trim();
      const address = document.getElementById("promo-address").value.trim();
      const monthSelection = document.getElementById("promo-selected-month").value.trim();

      const body = [
        "Promo page inquiry from bellwest.au/promo",
        "",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "Property/Business address: " + address,
        "Pricing selection: " + monthSelection,
      ].join("\n");

      window.location.href =
        "mailto:col@oze.com.au?subject=" +
        encodeURIComponent("bellwest.au promo page — " + name) +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  initPricingSlider();
  initTiltCards();
  initReveal();
  initPromoForm();
})();