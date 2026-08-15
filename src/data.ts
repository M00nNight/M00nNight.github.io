export const profile = {
  name: "Zamil Khan",
  role: "Lead Frontend Developer",
  location: "Gurgaon, Haryana, India",
  openness: "Open to relocation (EU) or remote",
  email: "zamilkhan687@gmail.com",
  linkedin: "linkedin.com/in/zamilkhan",
  linkedinUrl: "https://www.linkedin.com/in/zamilkhan",
  github: "zamil-khan",
  githubUrl: "https://github.com/zamil-khan",
  summary:
    "Experienced frontend developer specializing in React, TypeScript, and Tailwind CSS. I build scalable, user-friendly apps, mentor junior devs, drive frontend architecture, and participate in hiring and code reviews. Passionate about performance, accessibility, and clean energy / sustainability-focused products.",
};

export const navItems = [
  { id: "about", label: "~/about", file: "about.md" },
  { id: "skills", label: "~/skills", file: "skills.deps" },
  { id: "projects", label: "~/projects", file: "projects.json" },
  { id: "experience", label: "~/log", file: "career.log" },
  { id: "game", label: "~/game", file: "game.sh" },
  { id: "contact", label: "~/contact", file: "contact.sh" },
] as const;

export type SkillGroup = {
  id: string;
  title: string;
  file: string;
  accent: string; // tailwind color token suffix
  wide?: boolean;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    file: "frontend.deps",
    accent: "aqua",
    wide: true,
    skills: [
      "TypeScript",
      "JavaScript",
      "React.js",
      "Next.js",
      "Material UI",
      "Tailwind CSS",
      "shadcn/ui",
      "State Management",
      "Responsive Design",
      "React Testing Library",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    file: "backend.deps",
    accent: "green",
    skills: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    file: "devops.deps",
    accent: "orange",
    skills: ["GitHub Actions", "Docker", "Jenkins", "Kubernetes", "AWS", "Git"],
  },
  {
    id: "languages",
    title: "Languages",
    file: "languages.deps",
    accent: "yellow",
    skills: ["TypeScript", "JavaScript", "Go", "Python (basic)"],
  },
  {
    id: "practices",
    title: "Practices",
    file: "practices.deps",
    accent: "purple",
    skills: ["Data Structures", "OOP", "Agile Scrum", "Code Reviews"],
  },
];

export type Job = {
  hash: string;
  refs: string;
  company: string;
  role: string;
  period: string;
  location: string;
  message: string;
  bullets: string[];
  files: string;
};

export const jobs: Job[] = [
  {
    hash: "9c41f7a",
    refs: "HEAD -> career, tag: v2.0",
    company: "HubinIT",
    role: "Frontend Developer",
    period: "Oct 2024 – May 2025",
    location: "Remote · Amsterdam, NL",
    message: "feat(ui): dynamic React + TypeScript interfaces",
    bullets: [
      "Built dynamic, component-driven UIs with React and TypeScript",
      "Cut page load times by 15% through targeted performance passes",
      "Integrated REST APIs end-to-end with typed clients",
      "Ensured cross-browser compatibility across the supported matrix",
      "Contributed to Agile sprints — planning, reviews, and shipping",
    ],
    files: "ui.tsx · api-client.ts · perf-budget.json",
  },
  {
    hash: "3be8d12",
    refs: "tag: v1.1",
    company: "Fuuss B.V.",
    role: "Full Stack Engineer",
    period: "Jun 2023 – Dec 2023",
    location: "Full-stack · global user base",
    message: "fix(fullstack): squash bugs across the stack, worldwide",
    bullets: [
      "Diagnosed and resolved frontend & backend bugs for a global user base",
      "Collaborated across time zones via Slack, Notion, and GitHub",
      "Wrote onboarding docs that cut ramp-up time for new engineers",
    ],
    files: "client/* · server/* · docs/onboarding.md",
  },
  {
    hash: "0a52c9e",
    refs: "tag: v1.0, foundations",
    company: "Elcamino Software Pvt Ltd",
    role: "Customer Support Specialist",
    period: "Nov 2021 – May 2023",
    location: "On the front line with users",
    message: "init(career): learn how users really use software",
    bullets: [
      "Held a 90–98% CSAT score across the support queue",
      "Resolved tickets in under 30 seconds on average",
      "Turned user pain into product instincts that still ship today",
    ],
    files: "tickets/* · empathy.log",
  },
];

export const education = {
  degree: "B.Tech, Computer Science",
  school: "Maharshi Dayanand University",
  period: "Aug 2021 – May 2024",
};

export const certifications = [
  { name: "Full-Stack Web Development", issuer: "Frontend Masters", date: "Dec 2023" },
  { name: "Full-Stack Engineer", issuer: "100xDevs", date: "Jun 2024" },
];

export const projects = [
  {
    id: "corinna",
    name: "Corinna AI",
    file: "corinna-ai / README.md",
    tagline: "AI-driven customer support, powered by the ChatGPT API",
    description:
      "A React + TypeScript application that answers customer queries with ChatGPT — cutting support wait times by 40% while keeping conversations live and accounts locked down with secure authentication.",
    bullets: [
      "ChatGPT API integration with streaming, human-feeling responses",
      "Live updates keep agents and users in sync in real time",
      "Secure authentication — sessions, tokens, and roles done right",
    ],
    stack: ["React", "TypeScript", "ChatGPT API", "REST", "Auth"],
    metric: { value: "-40%", label: "customer support wait time" },
    status: { text: "production", color: "green" },
  },
  {
    id: "notes",
    name: "notes-cli",
    file: "notes-cli / package.json",
    tagline: "A Node.js command-line tool for organizing your thoughts",
    description:
      "A zero-friction CLI note-taking app: add, list, and search notes without leaving the terminal. Built with robust error handling so it fails loudly and never loses a word.",
    bullets: [
      "Organized note storage with clean, predictable commands",
      "Robust error handling — every edge case exits gracefully",
      "Terminal-first UX for keyboard-native workflows",
    ],
    stack: ["Node.js", "CLI", "fs", "Error Handling"],
    metric: { value: "exit 0", label: "always — errors handled" },
    status: { text: "stable", color: "aqua" },
  },
];

export const metrics = [
  { value: "3+", label: "years shipping for the web", tone: "text-yellow" },
  { value: "-15%", label: "page load time @ HubinIT", tone: "text-aqua" },
  { value: "-40%", label: "support wait · Corinna AI", tone: "text-green" },
  { value: "98%", label: "peak CSAT @ Elcamino", tone: "text-orange" },
];

export const heroTabs = [
  { label: "zamil.ts", target: "top", active: true },
  { label: "about.md", target: "about" },
  { label: "projects.json", target: "projects" },
  { label: "career.log", target: "experience" },
  { label: "game.sh", target: "game" },
  { label: "contact.sh", target: "contact" },
];

export const resumeMarkdown = `# Zamil Khan — Lead Frontend Developer

${profile.location} · ${profile.openness}
${profile.email} · ${profile.linkedin} · github.com/${profile.github}

## Summary
${profile.summary} Currently exploring React Native.

## Skills
- Frontend: TypeScript, JavaScript, React.js, Next.js, Material UI, Tailwind CSS, shadcn/ui, State Management, Responsive Design, React Testing Library
- Backend & APIs: Node.js, Express.js, REST APIs, PostgreSQL, MongoDB
- DevOps & Tools: GitHub Actions, Docker, Jenkins, Kubernetes, AWS, Git
- Languages: TypeScript, JavaScript, Go, Python (basic)
- Practices: Data Structures, OOP, Agile Scrum, Code Reviews

## Experience
### HubinIT — Frontend Developer (Oct 2024 – May 2025, Remote · Amsterdam, NL)
- Built dynamic React/TypeScript UIs; cut page load times by 15%
- Integrated REST APIs; ensured cross-browser compatibility
- Contributed to Agile sprints

### Fuuss B.V. — Full Stack Engineer (Jun 2023 – Dec 2023)
- Diagnosed/resolved frontend & backend bugs for a global user base
- Collaborated across time zones via Slack/Notion/GitHub; wrote onboarding docs

### Elcamino Software Pvt Ltd — Customer Support Specialist (Nov 2021 – May 2023)
- Maintained 90–98% CSAT; resolved tickets in under 30s average

## Projects
- Corinna AI — React + TypeScript app integrating the ChatGPT API; reduced support wait times by 40%; live updates and secure authentication
- Command-Line Note-Taking App — Node.js CLI tool for organizing notes, with robust error handling

## Education
B.Tech, Computer Science — Maharshi Dayanand University (Aug 2021 – May 2024)

## Certifications
- Full-Stack Web Development — Frontend Masters (Dec 2023)
- Full-Stack Engineer — 100xDevs (Jun 2024)
`;
