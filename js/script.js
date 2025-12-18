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
   CONTACT FORM (EmailJS + Toast)
========================= */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (typeof emailjs === "undefined") {
      console.error("EmailJS not loaded");
      return;
    }

    const submitBtn = contactForm.querySelector("button");
    submitBtn.disabled = true;

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      time: new Date().toLocaleString()
    };

    emailjs
      .send("service_igjmzz8", "template_zniymed", params)
      .then(() => {
        const toast = document.querySelector(".toast");
        toast?.classList.add("show");

        setTimeout(() => {
          toast?.classList.remove("show");
        }, 3500);

        contactForm.reset();
        submitBtn.disabled = false;
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        submitBtn.disabled = false;
      });
  });
}






