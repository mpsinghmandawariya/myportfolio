const EMAILJS_PUBLIC_KEY = "";
const EMAILJS_SERVICE_ID = "";
const EMAILJS_TEMPLATE_ID = "";

const projects = [
  {
    title: "AI Drug Recommendation System",
    description:
      "Built a machine learning pipeline to recommend optimal drugs based on patient profiles, with explainable predictions and a clinician-focused UI.",
    tech: ["Python", "Scikit-learn", "Flask"],
    tags: ["AI", "Python", "ML"],
    github: "https://github.com/username/ai-drug-recommendation",
    demo: "https://demo.example.com/ai-drug",
    image: "assets/project-ai.svg",
  },
  {
    title: "StackIt Q&A Platform",
    description:
      "Full-stack Q&A platform with rich editor, tagging system, and reputation points to encourage knowledge sharing.",
    tech: ["React", "Node.js", "MongoDB"],
    tags: ["Web", "React", "Node"],
    github: "https://github.com/username/stackit-qa",
    demo: "https://demo.example.com/stackit",
    image: "assets/project-stackit.svg",
  },
  {
    title: "Exam Seating Arrangement System",
    description:
      "Automated seating allocation engine that generates balanced exam layouts, exports PDFs, and handles conflict-free constraints.",
    tech: ["Java", "MySQL", "Spring"],
    tags: ["Systems", "Java", "Database"],
    github: "https://github.com/username/exam-seating",
    demo: "https://demo.example.com/exam-seating",
    image: "assets/project-exam.svg",
  },
  {
    title: "Campus Companion Dashboard",
    description:
      "Unified dashboard for campus events, attendance, and academic insights with a mobile-first design.",
    tech: ["Next.js", "Tailwind", "Firebase"],
    tags: ["Web", "Dashboard", "Cloud"],
    github: "https://github.com/username/campus-companion",
    demo: "https://demo.example.com/campus",
    image: "assets/project-campus.svg",
  },
];

const initTheme = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".icon");
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "dark");
    themeIcon.textContent = theme === "dark" ? "Moon" : "Sun";
  };

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
};

const initNav = () => {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
};

const initTyping = () => {
  const typingEl = document.querySelector("[data-typing]");
  if (!typingEl) return;

  const phrases = typingEl.dataset.phrases.split("|");
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex += 1;
    } else {
      charIndex -= 1;
    }

    typingEl.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(tick, deleting ? 45 : 80);
  };

  tick();
};

const renderProjects = () => {
  const filterContainer = document.getElementById("project-filters");
  const grid = document.getElementById("project-grid");

  if (!filterContainer || !grid) return;

  const tagSet = new Set();
  projects.forEach((project) => project.tags.forEach((tag) => tagSet.add(tag)));
  const tags = ["All", ...Array.from(tagSet)];

  const renderCards = (activeTag) => {
    grid.innerHTML = "";
    const filtered = activeTag === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeTag));

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title} screenshot" />
        <div>
          <h3>${project.title}</h3>
          <p class="muted">${project.description}</p>
        </div>
        <div class="project-meta">
          ${project.tech.map((tech) => `<span>${tech}</span>`).join("")}
        </div>
        <div class="project-links">
          <a class="btn btn-ghost" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
          <a class="btn btn-outline" href="${project.demo}" target="_blank" rel="noreferrer">Live Demo</a>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  filterContainer.innerHTML = "";
  tags.forEach((tag, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn";
    btn.textContent = tag;
    if (index === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      filterContainer.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(tag);
    });

    filterContainer.appendChild(btn);
  });

  renderCards("All");
};

const initReveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => observer.observe(el));
};

const initCertificates = () => {
  const modal = document.getElementById("preview-modal");
  const closeBtn = document.getElementById("preview-close");
  const previewImage = document.getElementById("preview-image");
  const previewTitle = document.getElementById("preview-title");

  if (!modal || !closeBtn || !previewImage || !previewTitle) return;

  document.querySelectorAll("[data-preview]").forEach((btn) => {
    btn.addEventListener("click", () => {
      previewImage.src = btn.dataset.preview;
      previewTitle.textContent = btn.dataset.title || "Certificate Preview";
      modal.showModal();
    });
  });

  closeBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
};

const initContactForm = () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "Sending...";

    const payload = {
      from_name: form.name.value,
      reply_to: form.email.value,
      message: form.message.value,
    };

    if (
      window.emailjs &&
      EMAILJS_PUBLIC_KEY &&
      EMAILJS_SERVICE_ID &&
      EMAILJS_TEMPLATE_ID
    ) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
        .then(() => {
          status.textContent = "Message sent successfully.";
          form.reset();
        })
        .catch(() => {
          status.textContent = "Failed to send. Please try again later.";
        });
    } else {
      const subject = encodeURIComponent("Portfolio Contact from " + payload.from_name);
      const body = encodeURIComponent(payload.message + "\n\nFrom: " + payload.reply_to);
      window.location.href = `mailto:mahipal@example.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email client...";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
  initTheme();
  initNav();
  initTyping();
  renderProjects();
  initReveal();
  initCertificates();
  initContactForm();
});
