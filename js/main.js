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
   - Published article: set `status: "published"` and provide `body`
     (array of paragraphs). It opens in an on-page reader modal.
   - Upcoming article: leave `status: "coming-soon"` (no body) so the
     card shows "Coming Soon" instead of a fabricated date.
   The card shows an estimated read time derived from the body — no
   publication dates are invented.

   Only the first VISIBLE_INSIGHTS cards are shown so the section
   doesn't read as unfinished. Raise this as articles are published.
   ------------------------------------------------------------ */
const VISIBLE_INSIGHTS = 3
const insights = [
  {
    title: "Why Lease Abstraction Is More Than Data Entry",
    category: "Lease Administration",
    summary:
      "Lease abstraction decisions directly affect billing, recoveries, and reporting. A look at why careful reading beats speed.",
    status: "published",
    body: [
      "Lease abstraction is often treated as a data-entry exercise, but every abstracted term can affect billing, recoveries, reporting, and compliance.",
      "A commencement date drives rent schedules and option periods. A missed expense cap can overstate recoveries. An incorrect square-footage figure can distort a tenant’s share of operating expenses. Even a small error in an amendment reference can create confusion when accounting or property management relies on the abstract.",
      "A strong abstraction does more than summarize a lease. It translates the governing documents into clear, usable financial and operational requirements.",
    ],
    help:
      "Austin reviews leases and amendments with a focus on how each term affects billing, recoveries, reporting, and day-to-day property operations. His approach emphasizes accuracy, traceability, and practical implementation.",
  },
  {
    title: "How CAM Caps Affect Tenant Recoveries",
    category: "Recoveries",
    summary:
      "Cumulative and compounding caps reshape recoverable expense year over year. Here is how the mechanics work.",
    status: "published",
    body: [
      "CAM caps limit how quickly certain operating expenses may increase from year to year. While the concept sounds simple, the calculation can vary significantly depending on the lease.",
      "A cap may be cumulative or noncumulative, compounding or noncompounding, and may apply only to controllable expenses. Taxes, insurance, utilities, snow removal, and other categories are often excluded.",
      "The result also depends on the correct base year and whether unused increases carry forward. Applying the wrong methodology can materially change the tenant’s share.",
      "A defensible recovery calculation should identify the capped expense pool, exclusions, prior-year amount, permitted increase, and final recoverable total.",
    ],
    help:
      "Austin analyzes lease-specific recovery structures, tests calculations against the governing documents, and helps identify discrepancies between lease requirements, operating expenses, and tenant billing.",
  },
  {
    title: "Understanding Percentage Rent and Natural Breakpoints",
    category: "Financial Analysis",
    summary:
      "Natural breakpoints, contractual breakpoints, and reporting timing interact in ways that change what a tenant owes.",
    status: "published",
    body: [
      "Percentage rent allows a landlord to receive additional rent when a tenant’s sales exceed a defined threshold, known as the breakpoint.",
      "Some leases state a fixed contractual breakpoint. Others use a natural breakpoint, which is calculated by dividing annual base rent by the percentage-rent rate. For example, if annual base rent is $100,000 and the percentage-rent rate is 5%, the natural breakpoint is $2,000,000.",
      "That formula is straightforward, but the actual calculation often is not.",
      "The lease may use a sales year that differs from the calendar year. It may exclude certain types of revenue, allow deductions, require monthly or annual reporting, or provide different treatment for returns, taxes, online sales, or affiliated businesses. Amendments may also change the base rent, percentage rate, reporting period, or breakpoint without clearly restating every related provision.",
      "Timing matters as well. A tenant may report sales monthly but only owe percentage rent after the full sales year ends. In other cases, estimated payments may be required throughout the year, followed by a reconciliation.",
      "A proper review should confirm the governing lease and amendments, annual base rent, applicable sales period, breakpoint method, percentage rate, permitted exclusions, reported sales, and billing timing. Even a small error in one input can materially change the amount due.",
    ],
    help:
      "Austin reviews percentage-rent provisions alongside rent schedules, sales reports, and amendments to validate the applicable breakpoint, reporting period, and amount owed. His approach focuses on tracing the calculation back to the governing documents and identifying inconsistencies before they become billing or reporting issues.",
  },
  {
    title: "The Financial Importance of Commencement Dates",
    category: "Lease Administration",
    summary:
      "Commencement dates anchor rent schedules, abatements, and option windows. Small date errors carry outsized cost.",
    status: "coming-soon",
  },
  {
    title: "What Makes a Commercial Lease Reconciliation Defensible",
    category: "Recoveries",
    summary:
      "A defensible reconciliation traces back to lease language, consistent methodology, and clean documentation.",
    status: "coming-soon",
  },
  {
    title: "Connecting Lease Administration to Asset Performance",
    category: "Asset Performance",
    summary:
      "Lease administration is often treated as back-office work. It is a direct input to property-level performance and risk.",
    status: "coming-soon",
  },
];

/* ------------------------------------------------------------
   Render insights
   ------------------------------------------------------------ */
function isPublished(article) {
  return article.status === "published" && Array.isArray(article.body) && article.body.length > 0;
}

function readingTime(article) {
  const words = [...(article.body || []), article.help || ""]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderInsights() {
  const grid = document.getElementById("insights-grid");
  if (!grid) return;

  const cards = insights.slice(0, VISIBLE_INSIGHTS).map((article, index) => {
    const published = isPublished(article);
    const metaLabel = published ? `${readingTime(article)} min read` : "Coming Soon";

    const readControl = published
      ? `<button type="button" class="insight-readlink insight-readlink--trigger" data-article-open="${index}">Read Article <span class="arrow" aria-hidden="true">↗</span></button>`
      : `<span class="insight-readlink" aria-disabled="true">Read Article <span class="arrow" aria-hidden="true">↗</span></span>`;

    const card = document.createElement("article");
    card.className = "insight-card reveal" + (published ? " is-clickable" : "");
    card.innerHTML = `
      <div class="insight-meta">
        <span class="insight-category">${article.category}</span>
        <span class="insight-dot" aria-hidden="true"></span>
        <span class="insight-date">${metaLabel}</span>
      </div>
      <h3 class="insight-title">${article.title}</h3>
      <p class="insight-summary">${article.summary}</p>
      <div class="insight-foot">${readControl}</div>
    `;
    return card;
  });

  grid.replaceChildren(...cards);
}

/* ------------------------------------------------------------
   Article reader modal (native <dialog>)
   ------------------------------------------------------------ */
function initArticleModal() {
  const grid = document.getElementById("insights-grid");
  const modal = document.getElementById("article-modal");
  if (!grid || !modal) return;

  const catEl = modal.querySelector(".article-modal-cat");
  const metaEl = modal.querySelector(".article-modal-meta");
  const titleEl = modal.querySelector(".article-modal-title");
  const contentEl = modal.querySelector(".article-modal-content");
  const scroller = modal.querySelector(".article-modal-inner");
  const closeBtn = modal.querySelector(".article-modal-close");
  let lastFocused = null;

  const openArticle = (index) => {
    const article = insights[index];
    if (!article || !isPublished(article) || modal.open) return;

    catEl.textContent = article.category;
    metaEl.textContent = `${readingTime(article)} min read`;
    titleEl.textContent = article.title;

    let html = article.body.map((p) => `<p>${p}</p>`).join("");
    if (article.help) {
      html +=
        `<div class="article-help">` +
        `<p class="article-help-label">How Austin can help</p>` +
        `<p>${article.help}</p>` +
        `</div>`;
    }
    contentEl.innerHTML = html;

    lastFocused = document.activeElement;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    if (scroller) scroller.scrollTop = 0;
    if (closeBtn) closeBtn.focus();
  };

  const closeArticle = () => {
    if (modal.open && typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
  };

  // Open from any card trigger (event delegation)
  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-article-open]");
    if (!trigger) return;
    openArticle(Number(trigger.getAttribute("data-article-open")));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeArticle);

  // Click on the backdrop (the dialog element itself) closes
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeArticle();
  });

  // Restore scroll + focus whenever the dialog closes (button, Esc, backdrop)
  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  });
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
  const desktop = window.matchMedia("(min-width: 1101px)");
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
   Contact form validation + submission
   The form posts to Formspree via fetch. On success we show a real
   confirmation; on failure we fall back to a direct email link. The
   <form> also has a native action/method so it still works without JS.
   ------------------------------------------------------------ */
const CONTACT_EMAIL = "austindshea01@gmail.com";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvgzgdj";

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

  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (message, kind) => {
    if (!status) return;
    status.hidden = false;
    status.classList.remove("is-success", "is-error");
    if (kind) status.classList.add(kind);
    if (message.html) status.innerHTML = message.html;
    else status.textContent = message.text;
  };

  form.addEventListener("submit", async (event) => {
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

    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }
    setStatus({ text: "Sending your message…" });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        setStatus(
          { text: "Thanks — your message has been sent. I’ll be in touch soon." },
          "is-success",
        );
      } else {
        let detail = "";
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length) {
            detail = " " + data.errors.map((e) => e.message).join(" ");
          }
        } catch (_ignored) {
          /* non-JSON error response */
        }
        throw new Error(detail);
      }
    } catch (_error) {
      setStatus(
        {
          html:
            `Sorry — your message couldn’t be sent just now. Please email ` +
            `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> directly.`,
        },
        "is-error",
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }
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
  initArticleModal();
  initNav();
  initHeaderState();
  initScrollSpy();
  initReveal();
  revealDynamic();
  initContactForm();
  initFooterYear();
});
