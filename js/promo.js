// bellwest.au — promo page (pricing slider, form) — v1.7.1 | 2026-06-17

(function () {
  const BASE_PRICE = 495;
  const PRICING_MONTHS = [
    { label: "July 2026", short: "Jul", discount: 90 },
    { label: "August 2026", short: "Aug", discount: 80 },
    { label: "September 2026", short: "Sep", discount: 70 },
    { label: "October 2026", short: "Oct", discount: 60 },
    { label: "November 2026", short: "Nov", discount: 50 },
    { label: "December 2026", short: "Dec", discount: 40 },
    { label: "January 2027", short: "Jan", discount: 30 },
    { label: "February 2027", short: "Feb", discount: 20 },
    { label: "March 2027", short: "Mar", discount: 10 },
    { label: "April 2027+", short: "Full", discount: 0 },
  ];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatPrice(amount) {
    return amount % 1 === 0 ? "$" + amount.toFixed(0) : "$" + amount.toFixed(2);
  }

  function getTier(index) {
    const tier = PRICING_MONTHS[index] || PRICING_MONTHS[PRICING_MONTHS.length - 1];
    const price = BASE_PRICE * (1 - tier.discount / 100);
    const savings = BASE_PRICE - price;
    return Object.assign({}, tier, { price: price, savings: savings, index: index });
  }

  function buildPricingColumns() {
    const container = document.getElementById("pricing-columns");
    if (!container) return;

    container.innerHTML = PRICING_MONTHS.map(function (tier, i) {
      const t = getTier(i);
      const height = Math.max(18, Math.round((t.price / BASE_PRICE) * 100));
      return (
        '<button type="button" class="pricing-col' +
        (i === 0 ? " is-active" : "") +
        '" data-index="' +
        i +
        '" aria-label="' +
        tier.label +
        ", " +
        formatPrice(t.price) +
        '">' +
        '<div class="pricing-col-bar" style="--bar-height:' +
        height +
        '%">' +
        '<span class="pricing-col-price">' +
        formatPrice(t.price) +
        "</span>" +
        "</div>" +
        '<span class="pricing-col-month">' +
        tier.short +
        "</span>" +
        (tier.discount > 0
          ? '<span class="pricing-col-off">' + tier.discount + "%</span>"
          : '<span class="pricing-col-off is-full">FULL</span>') +
        "</button>"
      );
    }).join("");

    container.querySelectorAll(".pricing-col").forEach(function (col) {
      col.addEventListener("click", function () {
        const slider = document.getElementById("promo-price-slider");
        if (!slider) return;
        slider.value = col.dataset.index;
        slider.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });
  }

  function initPricingSlider() {
    const slider = document.getElementById("promo-price-slider");
    const priceEl = document.getElementById("promo-live-price");
    const monthEl = document.getElementById("promo-live-month");
    const discountEl = document.getElementById("promo-live-discount");
    const savingsEl = document.getElementById("promo-live-savings");
    const fillEl = document.getElementById("promo-slider-fill");
    const thumbGlow = document.getElementById("promo-thumb-glow");
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
      priceEl.classList.remove("price-pop");
      void priceEl.offsetWidth;
      priceEl.classList.add("price-pop");

      if (monthEl) monthEl.textContent = tier.label;
      if (discountEl) {
        discountEl.textContent = tier.discount > 0 ? tier.discount + "% OFF" : "Full price";
        discountEl.classList.toggle("is-full", tier.discount === 0);
      }
      if (savingsEl) {
        savingsEl.textContent =
          tier.savings > 0 ? "Save " + formatPrice(tier.savings) + " this year" : "Standard rate";
      }
      if (fillEl) fillEl.style.width = pct + "%";
      if (thumbGlow) thumbGlow.style.left = pct + "%";

      document.querySelectorAll(".pricing-col").forEach(function (col) {
        col.classList.toggle("is-active", Number(col.dataset.index) === index);
      });

      if (monthField) monthField.value = tier.label + " — " + formatPrice(tier.price);

      const orderSubject =
        "bellwest.au promo order — " + tier.label + " (" + formatPrice(tier.price) + ")";
      const orderBody = [
        "I'd like to order a bellwest.au promo page.",
        "",
        "Sign up in: " + tier.label,
        "Annual rate (p.a.): " +
          formatPrice(tier.price) +
          (tier.discount > 0
            ? " (" + tier.discount + "% introductory discount)"
            : " (full price)"),
        "Base price reference: $495 p.a. + artwork/images",
        "",
        "Please send payment details / invoice.",
      ].join("\n");

      if (orderBtn) {
        orderBtn.href =
          "mailto:col@oze.com.au?subject=" +
          encodeURIComponent(orderSubject) +
          "&body=" +
          encodeURIComponent(orderBody);
        orderBtn.textContent = "Order by email — " + formatPrice(tier.price);
      }

      if (stripeSlot) {
        stripeSlot.dataset.month = tier.label;
        stripeSlot.dataset.price = tier.price.toFixed(2);
      }
    }

    slider.addEventListener("input", updatePricing);
    updatePricing();
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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", Math.min(i * 0.06, 0.4) + "s");
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

  buildPricingColumns();
  initPricingSlider();
  initReveal();
  initPromoForm();
})();