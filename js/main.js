/* ============================================================
   Personal Website — interactions
   Mobile nav · scroll reveal · project filters · contact form
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile navigation toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal elements on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Projects filter ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Contact form: open the visitor's mail client ---------- */
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const status = document.querySelector("#form-status");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // EDIT: replace with your own email address
      const to = "hello@yuhao.fang";

      const data = new FormData(contactForm);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const subjectInput = (data.get("subject") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in all required fields before sending.";
        status.style.background = "#fde2e2";
        status.style.color = "#9c3f3f";
        status.classList.add("show");
        return;
      }

      const subject = encodeURIComponent(
        subjectInput || `Website message from ${name}`
      );
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      status.textContent = "Opening your email app… If nothing happens, email me directly at the address shown on the left.";
      status.style.background = "#e2ecdf";
      status.style.color = "#4e6e4b";
      status.classList.add("show");
      contactForm.reset();
    });
  }
});
