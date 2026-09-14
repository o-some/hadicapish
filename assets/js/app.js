import { siteConfig, formatMoney, getOffer } from "./config.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menu = $("#menu");
const menuToggle = $("#menu-toggle");
menuToggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
menu?.addEventListener("click", event => {
  if (event.target.closest("a")) { menu.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false"); }
});

$$('[data-config="brand.claim"]').forEach(node => node.textContent = siteConfig.brand.claim);
$$('[data-capacity]').forEach(node => node.textContent = siteConfig.booking.capacity);
$$('[data-source-timezone]').forEach(node => node.textContent = siteConfig.booking.sourceTimeZone);
$$('[data-local-timezone]').forEach(node => node.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || "Your local time");

const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
}, { threshold: .12 }) : null;
$$('.reveal').forEach(node => observer ? observer.observe(node) : node.classList.add("is-visible"));

const counterObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    const target = Number(node.dataset.count || 0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) node.textContent = `${target}${node.dataset.suffix || ""}`;
    else {
      const started = performance.now();
      const tick = now => {
        const progress = Math.min((now - started) / 1200, 1);
        node.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${node.dataset.suffix || ""}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    counterObserver.unobserve(node);
  });
}, { threshold: .7 }) : null;
$$('[data-count]').forEach(node => counterObserver?.observe(node));

const pricingRoot = $("#pricing-cards");
const renderPrices = type => {
  if (!pricingRoot) return;
  const offers = siteConfig.pricing.offers.filter(o => o.type === type);
  pricingRoot.innerHTML = offers.map(offer => {
    const perLesson = offer.price / offer.lessons;
    return `<article class="price-card ${offer.popular ? "popular" : ""}">
      ${offer.popular ? '<span class="badge">Most Popular</span>' : ""}
      <h3>${offer.name}</h3><div class="price">${formatMoney(offer.price)}${type === "subscription" ? '<small>/month</small>' : ""}</div>
      <p>${offer.lessons} × ${offer.minutes}-minute ${offer.lessons === 1 ? "lesson" : "lessons"}${offer.price ? ` · ${formatMoney(perLesson)} per lesson` : ""}</p>
      <ul><li>Personal live online tuition</li><li>Focused learning plan</li><li>Notes and revision support</li></ul>
      <a class="button ${offer.popular ? "" : "dark"}" href="./book/?offer=${offer.id}">Choose ${offer.name}</a>
    </article>`;
  }).join("");
};
renderPrices("subscription");
$$('[data-pricing-type]').forEach(button => button.addEventListener("click", () => {
  $$('[data-pricing-type]').forEach(item => item.setAttribute("aria-pressed", "false"));
  button.setAttribute("aria-pressed", "true"); renderPrices(button.dataset.pricingType);
}));

const wizard = $("#booking-wizard");
if (wizard) {
  const state = { step: 1, subject: "", curriculum: "", challenge: "", role: "", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", offer: new URLSearchParams(location.search).get("offer") || "consultation" };
  const capacityFull = siteConfig.booking.activeStudents >= siteConfig.booking.capacity;
  if (capacityFull) { $("#booking-flow").hidden = true; $("#waitlist-flow").hidden = false; }
  const render = () => {
    $$('.wizard-step', wizard).forEach(step => step.hidden = Number(step.dataset.step) !== state.step);
    $$('.progress span', wizard).forEach((bar, index) => bar.classList.toggle("active", index < state.step));
    $("#summary-subject").textContent = state.subject || "Not selected";
    $("#summary-curriculum").textContent = state.curriculum || "Not selected";
    $("#summary-timezone").textContent = state.timezone;
    const offer = getOffer(state.offer) || getOffer("consultation");
    $("#summary-offer").textContent = `${offer.name} · ${formatMoney(offer.price)}`;
    $("#wizard-back").hidden = state.step === 1;
    $("#wizard-next").textContent = state.step === 5 ? (offer.price ? "Continue to secure checkout" : "Request consultation") : "Continue";
  };
  wizard.addEventListener("click", event => {
    const choice = event.target.closest("[data-choice]");
    if (choice) {
      const key = choice.dataset.choice;
      $$(`[data-choice="${key}"]`, wizard).forEach(item => item.setAttribute("aria-pressed", "false"));
      choice.setAttribute("aria-pressed", "true"); state[key] = choice.dataset.value;
    }
  });
  $("#wizard-next").addEventListener("click", () => {
    const required = {1:"subject",2:"curriculum",3:"challenge",4:"role"}[state.step];
    if (required && !state[required]) { $("#wizard-error").textContent = "Please choose one option to continue."; return; }
    $("#wizard-error").textContent = "";
    if (state.step < 5) { state.step += 1; render(); return; }
    if (!$("#booking-form").reportValidity()) return;
    $("#integration-dialog").showModal();
  });
  $("#wizard-back").addEventListener("click", () => { state.step = Math.max(1, state.step - 1); render(); });
  render();
}

$("#year")?.replaceChildren(String(new Date().getFullYear()));
