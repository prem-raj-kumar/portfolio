/* =========================
   MOBILE MENU TOGGLE
========================= */
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks?.classList.toggle("show");
}

// Close mobile menu on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks")?.classList.remove("show");
  });
});




/* =========================
   INTERSECTION OBSERVER (Animations)
   SINGLE animation system
========================= */
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target); // animate once only
    }
  });
}, observerOptions);

document.querySelectorAll(
  ".section, .skill-item, .project-category-card, .job-entry, .education-entry, .blog-card"
).forEach(el => observer.observe(el));



/* =========================
   SCROLL HANDLER (ONE ONLY)
========================= */
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  /* Header shrink / blur */
  if (header) {
    header.classList.toggle("scrolled", scrollY > 50);
  }

  /* Hero background zoom (guarded) */
  if (hero) {
    hero.style.backgroundSize = 100 + scrollY / 40 + "%";
  }
});


/* =========================
   HERO CONTENT LOAD ANIMATION
========================= */
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");

  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add("visible");
    }, 300); // adjust between 600–1000ms if you want
  }
});

/* =========================
   SMOOTH SCROLL TO SECTION
========================= */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: "smooth" });
}


/* =========================
   PAGE TRANSITIONS (SCOPED)
========================= */
document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      this.target === "_blank"
    ) return;

    e.preventDefault();

    const page = document.querySelector(".page");
    page?.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});


/* =========================
   CONTACT FORM (Toast, no alert)
========================= */
document.querySelector(".contact-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const toast = document.querySelector(".toast");
  toast?.classList.add("show");

  setTimeout(() => {
    toast?.classList.remove("show");
  }, 3500);

  this.reset();
});
