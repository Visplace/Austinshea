/* ============================================================
   Austin Shea — site interactivity
   ------------------------------------------------------------
   - Insights content (editable data array)
   - Mobile navigation menu
   - Scroll-spy active navigation state
   - Header shadow on scroll
   - Reveal-on-scroll animations
   - Contact form validation (honest, no false delivery claim)
   - Footer year
   ============================================================ */

/* ------------------------------------------------------------
   INSIGHTS DATA
   Add a new article by appending an object to this array.
   Set `status: "published"` and provide `date` + `url` once an
   article is live; leave `status: "coming-soon"` otherwise so the
   card shows "Coming Soon" instead of a fabricated date.
   ------------------------------------------------------------ */
const insights = [
  {
    title: "Why Lease Abstraction Is More Than Data Entry",
    category: "Lease Administration",
    summary:
      "Abstraction decisions ripple into billing, recoveries, and reporting. A look at why careful reading beats speed.",
    status: "coming-soon",
    date: null,
    url: null,
  },
  {
    title: "How CAM Caps Affect Tenant Recoveries",
    category: "Recoveries",
    summary:
      "Cumulative and compounding caps quietly reshape recoverable expense year over year. Here is how the mechanics work.",
    status: "coming-soon",
    date: null,
    url: null,
  },
  {
    title: "Understanding Percentage Rent and Natural Breakpoints",
    category: "Financial Analysis",
    summary:
      "Natural breakpoints, contractual breakpoints, and reporting timing interact in ways that change what a tenant owes.",
    status: "coming-soon",
    date: null,
    url: null,
  },
  {
    title: "The Financial Importance of Commencement Dates",
    category: "Lease Administration",
    summary:
      "Commencement dates anchor rent schedules, abatements, and option windows. Small date errors carry outsized cost.",
    status: "coming-soon",
    date: null,
    url: null,
  },
  {
    title: "What Makes a Commercial Lease Reconciliation Defensible",
    category: "Recoveries",
    summary:
      "A defensible reconciliation traces back to lease language, consistent methodology, and clean documentation.",
    status: "coming-soon",
    date: null,
    url: null,
  },
  {
    title: "Connecting Lease Administration to Asset Performance",
    category: "Asset Performance",
    summary:
      "Lease administration is often treated as back-office work. It is a direct input to property-level performance and risk.",
    status: "coming-soon",
    date: null,
    url: null,
  },
];

/* ------------------------------------------------------------
   Render insights
   ------------------------------------------------------------ */
function formatDate(iso) {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderInsights() {
  const grid = document.getElementById("insights-grid");
  if (!grid) return;

  const cards = insights.map((article) => {
    const isPublished = article.status === "published" && article.url;
    const dateLabel = isPublished && article.date ? formatDate(article.date) : "Coming Soon";

    const readLink = isPublished
      ? `<a class="insight-readlink" href="${article.url}">Read Article <span class="arrow" aria-hidden="true">↗</span></a>`
      : `<span class="insight-readlink" aria-disabled="true">Read Article <span class="arrow" aria-hidden="true">↗</span></span>`;

    const card = document.createElement("article");
    card.className = "insight-card reveal";
    card.innerHTML = `
      <div class="insight-meta">
        <span class="insight-category">${article.category}</span>
        <span class="insight-dot" aria-hidden="true"></span>
        <span class="insight-date">${dateLabel}</span>
      </div>
      <h3 class="insight-title">${article.title}</h3>
      <p class="insight-summary">${article.summary}</p>
      <div class="insight-foot">${readLink}</div>
    `;
    return card;
  });

  grid.replaceChildren(...cards);
}

/* ------------------------------------------------------------
   Mobile navigation
   ------------------------------------------------------------ */
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Close after selecting a link (mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Close when resizing up to desktop
  const desktop = window.matchMedia("(min-width: 861px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

/* ------------------------------------------------------------
   Header shadow on scroll
   ------------------------------------------------------------ */
function initHeaderState() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------------------------------------------
   Scroll-spy — highlight the nav link for the section in view.
   Only the sections that have a matching nav link are tracked.
   ------------------------------------------------------------ */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) map.set(section, link);
  });
  if (map.size === 0) return;

  let activeLink = null;
  const setActive = (link) => {
    if (link === activeLink) return;
    links.forEach((l) => l.classList.remove("is-active"));
    if (link) link.classList.add("is-active");
    activeLink = link;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Choose the entry closest to the top that is intersecting.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActive(map.get(visible[0].target));
      }
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  map.forEach((_link, section) => observer.observe(section));
}

/* ------------------------------------------------------------
   Reveal on scroll
   ------------------------------------------------------------ */
function initReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (items.length === 0) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof IntersectionObserver === "undefined") {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* Observe reveal elements added dynamically (insights). */
function revealDynamic() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("#insights-grid .reveal:not(.is-visible)");
  if (reduce || typeof IntersectionObserver === "undefined") {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   Contact form validation
   Honest behavior: on a valid submit we confirm the details are
   ready and hand off to the visitor's email client via a prefilled
   mailto link. We never claim the message was delivered, because
   this static form is not connected to a mail service.
   ------------------------------------------------------------ */
const CONTACT_EMAIL = "austindshea01@gmail.com";

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    inquiry: (v) => (v ? "" : "Please choose an inquiry type."),
    subject: (v) => (v.trim().length >= 2 ? "" : "Please add a subject."),
    message: (v) => (v.trim().length >= 10 ? "" : "Please include a short message (10+ characters)."),
  };

  const showError = (name, msg) => {
    const field = form.elements[name];
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (field) field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (errorEl) errorEl.textContent = msg;
  };

  // Live-clear errors as the user corrects them
  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    if (!field) return;
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        showError(name, validators[name](field.value));
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;
    let valid = true;

    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      const msg = validators[name](field ? field.value : "");
      showError(name, msg);
      if (msg && valid) {
        valid = false;
        firstInvalid = field;
      }
    });

    if (!valid) {
      if (status) status.hidden = true;
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Build a prefilled mailto so the visitor can actually send it.
    const data = new FormData(form);
    const subjectLine = `[${data.get("inquiry")}] ${data.get("subject")}`;
    const bodyLines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      data.get("company") ? `Company: ${data.get("company")}` : null,
      `Inquiry type: ${data.get("inquiry")}`,
      "",
      String(data.get("message") || ""),
    ].filter((line) => line !== null);

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subjectLine)}` +
      `&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    if (status) {
      status.hidden = false;
      status.classList.add("is-success");
      status.innerHTML =
        `Your message is ready. This form isn&rsquo;t connected to a mail service, so it will open in your email app to send. ` +
        `If nothing opens, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> directly.`;
    }

    // Hand off to the email client.
    window.location.href = mailto;
  });
}

/* ------------------------------------------------------------
   Footer year
   ------------------------------------------------------------ */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ------------------------------------------------------------
   Boot
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderInsights();
  initNav();
  initHeaderState();
  initScrollSpy();
  initReveal();
  revealDynamic();
  initContactForm();
  initFooterYear();
});
