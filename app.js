const portfolioData = {
  profile: {
    name: "Your Name",
    bio: "I am a full-stack enthusiast focused on building resilient web applications with thoughtful UX, modern JavaScript architecture, and scalable cloud-ready systems.",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-profile",
    email: "you@example.com"
  },
  projects: [
    {
      title: "Realtime Analytics Dashboard",
      description: "A high-performance dashboard with live metrics, role-based views, and data exports.",
      codeUrl: "https://github.com/your-username/project-one"
    },
    {
      title: "AI Notes Assistant",
      description: "A productivity web app for summarizing long-form notes and generating action items.",
      codeUrl: "https://github.com/your-username/project-two"
    },
    {
      title: "Developer Hiring Platform",
      description: "A full-stack recruiting platform with profile matching and interview workflow automation.",
      codeUrl: "https://github.com/your-username/project-three"
    },
    {
      title: "Headless Commerce Starter",
      description: "A modular storefront starter kit with fast SSR pages and flexible payment integration.",
      codeUrl: "https://github.com/your-username/project-four"
    }
  ],
  ideas: [
    "Context-aware UI assistant that adapts layouts based on user intent in real time.",
    "WebGPU-powered in-browser 3D component playground for design systems.",
    "Offline-first collaboration board with local AI suggestions and delayed sync.",
    "Edge-rendered experiment platform for instant A/B testing of product ideas."
  ]
};

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

document.addEventListener("DOMContentLoaded", renderPortfolio);
