const portfolioData = {
  profile: {
    name: "sajomoanne",
    bio: "I am a guy trying to manage my studies and also turn my ideas into reality, though theyre all in early dev. days",
    github: "https://github.com/sajomoanne",
    email: "sajomoanne@gmail.com"
  },
  projects: [
    {
      title: "LockIN tool",
      description: "A tool to plan and get your deep-work sessions done",
      projectUrl: "https://sajomoanne.github.io/lockIN/",
      repoUrl: "https://github.com/sajomoanne",
      imageUrl: "./images/lockin.png"
    },
    {
      title: "OpenNotebookLMs",
      description: "discover and share google NotebookLMs",
      projectUrl: "https://sajomoanne.github.io/OpenNotebookLMs/",
      repoUrl: "https://github.com/sajomoanne/OpenNotebookLMs",
      imageUrl: "./images/opennotebooklms.png"
    },
    {
      title: "BookRecallDemo (repo dont exist YET)",
      description: "A tool to help you recall stuff from books you've read, or to get knowledge from some good books thru active learning.",
      projectUrl: "https://sajomoanne.github.io/my_portfolio",
      repoUrl: "https://github.com/sajomoanne?tab=repositories",
      imageUrl: "https://placehold.co/1200x675/0f172a/94a3b8?text=BookRecallDemo"
    },
    {
      title: "My Portfolio",
      description: "the title is very self-explainatory",
      projectUrl: "https://sajomoanne.github.io/my_portfolio",
      repoUrl: "https://github.com/sajomoanne/my_portfolio",
      imageUrl: "./images/portfolio.png"
    }
  ],
  ideas: [
    "none, im improving my current projects",
  ]
};

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 700) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) {
    return;
  }

  const startTime = performance.now();

  function frame(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function initSmoothAnchorScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link) {
      return;
    }

    const targetSelector = link.getAttribute("href");
    if (!targetSelector || targetSelector === "#") {
      return;
    }

    const target = document.querySelector(targetSelector);
    if (!target) {
      return;
    }

    event.preventDefault();

    const targetY = target.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetY);

    if (history.pushState) {
      history.pushState(null, "", targetSelector);
    }
  });
}

function buildInlinePlaceholder(title) {
  const safeTitle = title || "Project Preview";
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <circle cx="1000" cy="140" r="180" fill="#22c55e" fill-opacity="0.15"/>
  <circle cx="220" cy="600" r="220" fill="#7dd3fc" fill-opacity="0.12"/>
  <text x="70" y="590" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="44">${safeTitle}</text>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createProjectCard(project, index) {
  const projectLink = project.projectUrl || project.liveUrl || project.demoUrl || project.url || project.codeUrl || "#";
  const repoLink = project.repoUrl || project.githubUrl || project.codeUrl || "https://github.com";
  const imageSrc = project.imageUrl || buildInlinePlaceholder(project.title);

  return `
    <article class="project-card rounded-2xl p-4 shadow-card">
      <a
        href="${projectLink}"
        target="_blank"
        rel="noreferrer"
        aria-label="Open ${project.title}"
        class="project-thumb mb-4 block overflow-hidden rounded-xl border border-slate-700/70"
      >
        <img
          src="${imageSrc}"
          alt="${project.title} preview image"
          loading="lazy"
          class="h-full w-full aspect-[16/10] object-cover"
        />
      </a>
      <h3 class="text-lg font-semibold text-white">${project.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-300">${project.description}</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <a
          href="${repoLink}"
          target="_blank"
          rel="noreferrer"
          class="tag-chip rounded-full px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slateGlow hover:text-white"
        >
          repo
        </a>
      </div>
    </article>
  `;
}

function createIdeaItem(idea, index) {
  return `
    <li class="idea-item rounded-xl px-4 py-3 text-sm text-slate-200">
      <span class="mr-2 text-accent">0${index + 1}.</span>${idea}
    </li>
  `;
}

function renderPortfolio() {
  const { profile, projects, ideas } = portfolioData;

  const heroBio = document.getElementById("heroBio");
  const projectGrid = document.getElementById("projectGrid");
  const ideasList = document.getElementById("ideasList");

  const githubLink = document.getElementById("githubLink");
  const linkedinLink = document.getElementById("linkedinLink");
  const emailLink = document.getElementById("emailLink");

  const footerName = document.getElementById("footerName");
  const year = document.getElementById("year");

  heroBio.textContent = profile.bio;

  projectGrid.innerHTML = projects.map(createProjectCard).join("");
  ideasList.innerHTML = ideas.map(createIdeaItem).join("");

  if (githubLink && profile.github) {
    githubLink.href = profile.github;
  }

  if (linkedinLink && profile.linkedin) {
    linkedinLink.href = profile.linkedin;
  }

  if (emailLink && profile.email) {
    emailLink.href = `mailto:${profile.email}`;
  }

  footerName.textContent = profile.name;
  year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio();
  initSmoothAnchorScroll();
});
