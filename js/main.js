// bellwest.au — main.js (theme toggle, header, hero video, 3D tilt, reveal) v3.0.0

(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Theme toggle (Light / Dark) ---------- */
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) { try { localStorage.setItem("bw-theme", theme); } catch (e) {} }
    var btns = document.querySelectorAll(".theme-toggle button");
    btns.forEach(function (b) { b.classList.toggle("is-active", b.dataset.theme === theme); });
  }

  var toggle = document.createElement("div");
  toggle.className = "theme-toggle";
  toggle.setAttribute("role", "group");
  toggle.setAttribute("aria-label", "Colour theme");
  toggle.innerHTML =
    '<button type="button" data-theme="light" aria-label="Light theme">' + SUN + "</button>" +
    '<button type="button" data-theme="dark" aria-label="Dark theme">' + MOON + "</button>";
  toggle.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (btn) applyTheme(btn.dataset.theme, true);
  });
  // Place the pill inside the header nav (before the Inquire CTA) so it never overlaps it.
  var nav = document.querySelector(".site-nav");
  var navCta = nav ? nav.querySelector(".nav-cta") : null;
  if (nav && navCta) nav.insertBefore(toggle, navCta);
  else if (nav) nav.appendChild(toggle);
  else document.body.appendChild(toggle);
  applyTheme(currentTheme(), false);

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hero background video (YouTube) ---------- */
  var heroMedia = document.querySelector(".hero-media");
  if (heroMedia && !reduceMotion) {
    var youtubeId = heroMedia.dataset.youtubeId;
    if (youtubeId) {
      var iframe = document.createElement("iframe");
      iframe.className = "hero-youtube";
      iframe.src =
        "https://www.youtube.com/embed/" + youtubeId +
        "?autoplay=1&mute=1&loop=1&playlist=" + youtubeId +
        "&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3";
      iframe.title = heroMedia.dataset.youtubeTitle || "Hero background video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("tabindex", "-1");
      heroMedia.insertBefore(iframe, heroMedia.firstChild);
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealSel = "[data-reveal], .section-header, .showcase-card, .utility-card, .pitch-card, .feature-card, .panorama-block, .aside-card, .cta-band-inner, .domain-list, .promo-upsell-inner";
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSel));
  revealEls.forEach(function (el) { if (!el.hasAttribute("data-reveal")) el.classList.add("reveal-on-scroll"); });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3D tilt on cards ---------- */
  if (finePointer && !reduceMotion) {
    var tiltSel = ".showcase-card, .feature-card, .utility-card, .pitch-card, .aside-card, .panorama-block";
    var MAX = 6; // degrees
    document.querySelectorAll(tiltSel).forEach(function (card) {
      card.style.transformStyle = "preserve-3d";
      var glare = document.createElement("span");
      glare.className = "tilt-glare";
      card.appendChild(glare);

      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * MAX * 2;
        var ry = (px - 0.5) * MAX * 2;
        card.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-6px)";
        glare.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        glare.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        card.classList.add("is-tilting");
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
        card.classList.remove("is-tilting");
      });
    });
  }
})();
