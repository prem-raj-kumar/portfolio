/* =====================================================
   PROJECT DATA
===================================================== */
const projects = {
  "student-performance": {
    title: "Student Performance Analysis",
    badge: "Python Project",
    description:
      "Analyzed student academic performance data to identify factors affecting outcomes and uncover improvement opportunities.",
    summary:
      "This project explores score distributions, demographic impact, and performance trends using exploratory data analysis techniques.",
    images: [
      "exam.png",
      "gender_distribution.png",
      "segments.png",
      "attendance.png",
      "teacher_quality.png"
      
    ],
    tools: ["Python", "Pandas", "EDA"],
    github: "https://github.com/yourname/student-performance-analysis",
    live: "#"
  },

  "sales": {
    title: "Book Sales Analysis",
    badge: "Python Project",
    description:
      "Analyzed regional sales data to identify growth patterns, key revenue drivers, and actionable insights for business decisions.",
    summary:
      "The analysis focused on regional performance, revenue contribution, and trend identification to support data-driven decisions.",
    images: [
      "images/sales-1.png",
      "images/sales-2.png"
    ],
    tools: ["Python", "NumPy", "Matplotlib"],
    github: "https://github.com/yourname/sales-analysis",
    live: "#"
  }
};

/* =====================================================
   DOM ELEMENTS
===================================================== */
const modal = document.getElementById("projectModal");
const modalBox = document.querySelector(".project-modal-box");

const modalTitle = document.getElementById("modalTitle");
const modalBadge = document.getElementById("modalBadge");
const modalDescription = document.getElementById("modalDescription");
const modalSummary = document.getElementById("modalSummary");
const modalImage = document.getElementById("modalImage");
const modalGithub = document.getElementById("modalGithub");

const modalTools = document.getElementById("modalTools");

/* =====================================================
   IMAGE CAROUSEL STATE
===================================================== */
let currentImageIndex = 0;
let activeImages = [];

/* =====================================================
   OPEN MODAL
===================================================== */
function openProjectModal(key) {
  const project = projects[key];

  if (!project) {
    console.error(`Project "${key}" not found`);
    return;
  }

  // Text content
  modalTitle.textContent = project.title;
  modalBadge.textContent = project.badge;
  modalDescription.textContent = project.description;
  modalSummary.textContent = project.summary;

  // Links
  modalGithub.href = project.github;
  //modalLive.href = project.live;

  // Tools
  modalTools.innerHTML = "";
  project.tools.forEach(tool => {
    const span = document.createElement("span");
    span.textContent = tool;
    modalTools.appendChild(span);
  });

  // Images
  activeImages = project.images || [];
  currentImageIndex = 0;
  updateModalImage();

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* =====================================================
   UPDATE IMAGE
===================================================== */
function updateModalImage() {
  if (!activeImages.length) return;
  modalImage.src = activeImages[currentImageIndex];
  modalImage.alt = "Project Screenshot " + (currentImageIndex + 1);
}

/* =====================================================
   IMAGE NAVIGATION
===================================================== */
function nextImage() {
  if (!activeImages.length) return;
  currentImageIndex = (currentImageIndex + 1) % activeImages.length;
  updateModalImage();
}

function prevImage() {
  if (!activeImages.length) return;
  currentImageIndex =
    (currentImageIndex - 1 + activeImages.length) % activeImages.length;
  updateModalImage();
}

/* =====================================================
   CLOSE MODAL
===================================================== */
function closeProjectModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* =====================================================
   EVENT HANDLERS
===================================================== */

/* Close when clicking outside modal box */
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeProjectModal();
  }
});

/* Prevent inner clicks */
modalBox.addEventListener("click", function (e) {
  e.stopPropagation();
});

/* Close on ESC */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeProjectModal();
  }
});
