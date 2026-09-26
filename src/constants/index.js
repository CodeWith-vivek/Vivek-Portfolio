
import htmlLogo from "../assets/tech_logo/html.webp";
import cssLogo from "../assets/tech_logo/css.webp";
import javascriptLogo from "../assets/tech_logo/javascript.webp";
import reactjsLogo from "../assets/tech_logo/reactjs.webp";
import reduxLogo from "../assets/tech_logo/redux.webp";
import tailwindcssLogo from "../assets/tech_logo/tailwindcss.webp";
import nodejsLogo from "../assets/tech_logo/nodejs.webp";
import expressjsLogo from "../assets/tech_logo/express.webp";
import mongodbLogo from "../assets/tech_logo/mongodb.webp";
import firebaseLogo from "../assets/tech_logo/firebase.webp";
import typescriptLogo from "../assets/tech_logo/typescript.webp";
import gitLogo from "../assets/tech_logo/git.webp";
import githubLogo from "../assets/tech_logo/github.webp";
import postmanLogo from "../assets/tech_logo/postman.webp";
import postgreLogo from "../assets/tech_logo/postgre.webp";
import nextjsLogo from "../assets/tech_logo/nextjs.webp";
import mysqlLogo from "../assets/tech_logo/mysql.webp";
import vercelLogo from "../assets/tech_logo/vercel.webp";
import netlifyLogo from "../assets/tech_logo/netlify.webp";
import {
  SiAstro,
  SiAlpinedotjs,
  SiDrizzle,
  SiZod,
  SiJsonwebtokens,
  SiDocker,
  SiAmazonec2,
  SiNginx,
  SiRender,
  SiAnthropic,
  SiOpenai,
  SiOllama,
  SiClaude,
} from "react-icons/si";


const navItems = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Skills",
    href: "#skill",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Projects",
    href: "#projects",
  },

  {
    name: "Education",
    href: "#education",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

const bentoSocialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/CodeWith-vivek",
    icon: "images/github.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/__v_i_v_e_k_._a_n_a_n_d?igsh=MWhkMmluaHM0dHduMQ==",
    icon: "images/insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-anand-453bba17a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: "images/linkedin.svg",
  },
];

const iconsList = [
  {
    name: "html",
    image: "images/html.svg",
  },
  {
    name: "css",
    image: "images/css.svg",
  },
  {
    name: "javascript",
    image: "images/js.svg",
  },
  {
    name: "react",
    image: "images/react.svg",
  },
  {
    name: "redux",
    image: "images/redux.svg",
  },
  {
    name: "typescript",
    image: "images/ts.svg",
  },
  {
    name: "nodejs",
    image: "images/nodejs.svg",
  },
  {
    name: "expressjs",
    image: "images/express.svg",
  },
  {
    name: "mongodb",
    image: "images/mongodb.svg",
  },
  {
    name: "pgsql",
    image: "images/postgresql.svg",
  },
  {
    name: "bootstrap",
    image: "images/bootstrap.svg",
  },
  {
    name: "tailwindcss",
    image: "images/tailwindcss.svg",
  },
  {
    name: "firebase",
    image: "images/firebase.svg",
  },
  {
    name: "github",
    image: "images/github.svg",
  },
  {
    name: "git",
    image: "images/git.svg",
  },

  {
    name: "figma",
    image: "images/figma.svg",
  },
  {
    name: "vscode",
    image: "images/vscode.svg",
  },
  {
    name: "aws",
    image: "images/aws.svg",
  },
  {
    name: "jwt",
    image: "images/jwt.svg",
  },
];

const leoSlide = {
  title: "LEO – Local-First AI Assistant",
  img: "images/leo.svg",
  description:
    "A local-first AI personal assistant with LLM chat, persistent memory, provider health monitoring, and voice input. In progress since Jul 2026.",
  stacks: ["Electron", "TypeScript", "Node.js", "Ollama"],
};

// Last slide repeats the first so the carousel can loop.
const slides = [
  { id: 1, ...leoSlide },
  {
    id: 2,
    title: "Crownify",
    img: "images/crownify.webp",
    description:
      "Full-stack e-commerce platform rebuilt from a server-rendered EJS/MVC app into a React SPA on a REST API, with auth, RBAC, product/order management, Razorpay payments, and an admin dashboard. Deployed on AWS EC2 behind Nginx, later migrated to Render.",
    stacks: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "AWS EC2", "Nginx"],
    github: "https://github.com/CodeWith-vivek/crownify2024",
  },
  {
    id: 3,
    title: "Admin Dashboard",
    github: "https://github.com/CodeWith-vivek/react-userMangement",
    description:
      "User management system with login/signup for users and admins built with React and Redux.",
    stacks: ["React", "Redux", "Nodejs", "Express", "MongoDB"],
    img: "images/Adminpanel.webp",
  },
  {
    id: 4,
    title: "Netflix Clone",
    img: "images/netflix.webp",
    stacks: ["React", "Firebase"],
    description:
      "A Netflix clone built with React and Firebase, featuring user signup/login, secure authentication, and movie playback with a modern UI.",
    github: "https://github.com/CodeWith-vivek/React-netflix-clone",
    preview: "https://react-netflix-clone-chi-ten.vercel.app/login",
  },
  {
    id: 5,
    title: "Olx Clone",
    img: "images/olx.webp",
    description:
      "A simple OLX clone built with React and Firebase, allowing users to list and sell items with authentication, image uploads, and real-time data storage.",
    stacks: ["React", "Firebase"],
    github: "https://github.com/CodeWith-vivek/react-olx-clone",
    preview: "https://react-olx-clone-three.vercel.app/",
  },
  {
    id: 6,
    title: "Jaguar",
    img: "images/jaguar.webp",
    description:
      "A static Jaguar homepage built with HTML and CSS, featuring a sleek layout, and modern UI showcasing luxury and performance.",
    stacks: ["HTML", "CSS"],
    github: "https://github.com/CodeWith-vivek/Jaguar",
  },
  {
    id: 7,
    title: "Sony Pictures",
    img: "images/sony.webp",
    description:
      "A static Sony Pictures homepage built with HTML and CSS, featuring a clean design and modern UI that highlights entertainment and cinematic excellence.",
    stacks: ["HTML", "CSS"],
    github: "https://github.com/CodeWith-vivek/sony-pictures",
  },
  { id: 8, ...leoSlide },
];

const footerIconsList = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/__v_i_v_e_k_._a_n_a_n_d?igsh=MWhkMmluaHM0dHduMQ==",
    icon: "images/insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-anand-453bba17a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: "images/linkedin.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/CodeWith-vivek",
    icon: "images/github.svg",
  },
];

// Skills with `logo` render an image, `icon` a react-icon, neither a text-only chip.
const SkillsInfo = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", logo: typescriptLogo },
      { name: "JavaScript", logo: javascriptLogo },
      { name: "SQL" },
      { name: "HTML5", logo: htmlLogo },
      { name: "CSS3", logo: cssLogo },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React JS", logo: reactjsLogo },
      { name: "Next.js", logo: nextjsLogo },
      { name: "Redux", logo: reduxLogo },
      { name: "Astro", icon: SiAstro },
      { name: "Tailwind CSS", logo: tailwindcssLogo },
      { name: "Alpine.js", icon: SiAlpinedotjs },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node JS", logo: nodejsLogo },
      { name: "Express JS", logo: expressjsLogo },
      { name: "REST APIs" },
      { name: "JWT Auth", icon: SiJsonwebtokens },
      { name: "RBAC" },
      { name: "Drizzle ORM", icon: SiDrizzle },
      { name: "Zod", icon: SiZod },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", logo: postgreLogo },
      { name: "pgvector", logo: postgreLogo },
      { name: "MongoDB", logo: mongodbLogo },
      { name: "MySQL", logo: mysqlLogo },
      { name: "Firebase", logo: firebaseLogo },
    ],
  },
  {
    title: "AI / GenAI",
    skills: [
      { name: "RAG" },
      { name: "Hybrid Search" },
      { name: "Vector Search" },
      { name: "Embeddings" },
      { name: "LLM Integration" },
      { name: "Prompt Engineering" },
      { name: "AI Agents" },
      { name: "Tool Calling" },
      { name: "LLM Guardrails" },
      { name: "Anthropic Claude", icon: SiAnthropic },
      { name: "OpenAI Embeddings", icon: SiOpenai },
      { name: "Ollama", icon: SiOllama },
    ],
  },
  {
    title: "Tools / Cloud",
    skills: [
      { name: "Git", logo: gitLogo },
      { name: "GitHub", logo: githubLogo },
      { name: "Docker", icon: SiDocker },
      { name: "Postman", logo: postmanLogo },
      { name: "AWS EC2", icon: SiAmazonec2 },
      { name: "Nginx", icon: SiNginx },
      { name: "Vercel", logo: vercelLogo },
      { name: "Netlify", logo: netlifyLogo },
      { name: "Render", icon: SiRender },
      { name: "Vercel AI SDK", logo: vercelLogo },
      { name: "Claude Code", icon: SiClaude },
    ],
  },
];

const experiences = [
  {
    title: "Trainee Software Developer",
    job: "Prime NRI Property Management",
    date: "May 2026 – Sep 2026",
    contents: [
      "Built the backend and AI/RAG layer of an AI customer-service platform (Next.js 16, TypeScript, Vercel AI SDK, Anthropic Claude, PostgreSQL/pgvector) in a 3-developer team.",
      "Designed the RAG pipeline for PDF/DOCX parsing, chunking, embeddings, hybrid vector/keyword search, and reranking; fixed a tool-calling loop re-triggering search up to 5x per query, cutting redundant retrieval calls.",
      "Replaced unstable LLM streaming with a generate-then-verify-then-stream architecture, improving reliability.",
      "Implemented a 3-layer LLM guardrail system: prompt-injection defense, jailbreak detection, and hallucination checks.",
      "Developed Zod-typed tool calling for lead capture and knowledge search, plus conversational memory with guest sessions, history compression, and identity handling to prevent context leakage.",
      "Developed the user-facing frontend (Stitch-based UI) alongside backend and RAG development.",
    ],
  },
  {
    title: "Freelance Full Stack Developer (part-time)",
    job: "Ernest Wells Ltd · UK (Remote)",
    date: "Jun 2026",
    contents: [
      "Independently built and deployed a production lead-generation site for a UK accountancy firm using Astro 6 SSR, TypeScript, and Tailwind CSS.",
      "Integrated CloudCannon CMS so non-technical staff could manage content, plus a secure contact form with Google Sheets storage and Resend notifications.",
      "Managed Vercel deployment, domain configuration, launch, and client handover.",
    ],
  },
  {
    title: "Sales Officer",
    job: "ESAF Small Finance Bank",
    date: "Jun 2023 – Sep 2023",
    contents: [
      "Managed customer onboarding, loan processing, and deposit sales, meeting monthly targets.",
      "Guided clients through onboarding, explaining product benefits and eligibility.",
      "Strengthened interpersonal and communication skills through daily client interactions.",
    ],
  },
  {
    title: "Business Associate",
    job: "Darsana Marbles (Family Business)",
    date: "Apr 2019 – 2026",
    contents: [
      "Managed retail operations, inventory, billing, and vendor negotiations for a granite, marble, and tile business.",
      "Supported the business between technical roles and training.",
    ],
  },
];

const educationData = [
  {
    institution: "Brototype, Kochi",
    degree: "Full Stack Development Training (MERN)",
    years: "Jun 2024 – Dec 2025",
    description:
      "Intensive, project-driven full-stack training in MongoDB, Express, React, and Node.js, building authentication, REST APIs, and deployments into real projects.",
  },
  {
    institution: "Leora Institution, Kochi",
    degree: "CMA USA – Course Completion",
    years: "Sep 2019 – May 2020",
    description:
      "Completed the US Certified Management Accountant course, covering financial planning, performance management, and analytics.",
  },
  {
    institution: "Girideepam Institute of Advanced Learning",
    degree: "B.Com – Finance & Accounting",
    years: "Jun 2016 – May 2019",
    description:
      "Focused on finance, accounting, and business management fundamentals. Built a disciplined academic foundation and team collaboration skills.",
  },
  {
    institution: "Sacred Heart Public School",
    degree: "Higher Secondary Education",
    years: "2014 – 2016",
    description:
      "Completed higher secondary education with a focus on commerce. Developed strong analytical and communication skills.",
  },
];
export {
  navItems,
  bentoSocialLinks,
  iconsList,
  slides,
  footerIconsList,
  SkillsInfo,
  experiences,
  educationData
};
