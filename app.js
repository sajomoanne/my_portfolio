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
      codeUrl: "https://github.com/your-username/project-one"
    },
    {
      title: "OpenNotebookLMs",
      description: "discover and share google NotebookLMs",
      codeUrl: "https://github.com/sajomoanne/OpenNotebookLMs"
    },
    {
      title: "BookRecallDemo (repo dont exist YET)",
      description: "A tool to help you recall stuff from books you've read, or to get knowledge from some good books thru active learning.",
      codeUrl: "https://sajomoanne.github.io/my_portfolio"
    },
    {
      title: "My Portfolio",
      description: "the title is very self-explainatory",
      codeUrl: "https://sajomoanne.github.io/my_portfolio"
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

function createProjectCard(project, index) {
  return `
    <article class="project-card rounded-2xl p-4 shadow-card">
      <div class="project-thumb mb-4 flex aspect-[16/10] items-center justify-center rounded-xl border border-slate-700/70">
        <span class="text-xs font-medium tracking-[0.16em] text-slate-300 uppercase">Project ${index + 1}</span>
      </div>
      <h3 class="text-lg font-semibold text-white">${project.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-300">${project.description}</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <a
          href="${project.codeUrl}"
          target="_blank"
          rel="noreferrer"
          class="tag-chip rounded-full px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slateGlow hover:text-white"
        >
          View Code
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

  githubLink.href = profile.github;
  linkedinLink.href = profile.linkedin;
  emailLink.href = `mailto:${profile.email}`;

  footerName.textContent = profile.name;
  year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPortfolio();
  initSmoothAnchorScroll();
});
