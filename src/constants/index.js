
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
    href: "https://www.linkedin.com/in/vivek-anand-453bba17a",
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
    "Built with Claude Code as a personal testbed for AI models: modular architecture, LLM/voice fallback with circuit breakers, agent loop with local RAG, real-time voice.",
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

const featuredProjects = [
  {
    title: "LEO – Local-First AI Assistant",
    img: "images/leo.svg",
    description:
      "A local-first AI personal assistant built as a testbed for evaluating and comparing AI models. It combines LLM chat against local models via Ollama, persistent memory, provider health monitoring, and a real-time voice pipeline with Whisper speech-to-text, dual text-to-speech engines, and barge-in interruption. A bounded tool-calling agent loop with local markdown RAG lets it work over my own notes, and an LLM/voice fallback chain protected by circuit breakers keeps it responsive when a provider fails. Structured as a modular, hexagonal-style architecture across a 4-package monorepo. Directed with Claude Code from my own design and requirements. MCP integration is on the roadmap.",
    focus: "Local-first AI architecture, model evaluation, resilience, and voice interaction.",
    stacks: ["Electron", "TypeScript", "Node.js", "Ollama", "Whisper STT", "RAG", "Tool Calling", "Claude Code"],
    links: [],
  },
  {
    title: "Crownify – E-Commerce Platform",
    img: "images/crownify.webp",
    description:
      "A full-stack e-commerce platform for headwear. I built the original as a server-rendered EJS/MVC app covering the whole shopping flow: OTP and Google login, Razorpay, wallet and Cash on Delivery payments, automated wallet refunds on cancellation, downloadable invoices, and an admin dashboard with role-based access, product/category/order management, and sales analytics. It was later rebuilt with Claude Code as a React SPA on a REST API (SSR on public storefront routes), alongside a layered backend, CSRF/Helmet/rate-limiting hardening, and a Jest, Vitest and Playwright test suite run in GitHub Actions. Deployed first on AWS EC2 behind Nginx, then on Render.",
    focus: "Complete e-commerce workflow, secure payments, and maintainable architecture.",
    stacks: ["React", "EJS", "Node.js", "Express", "MongoDB", "Razorpay", "Jest", "Vitest", "Playwright", "GitHub Actions", "AWS EC2", "Nginx", "Render"],
    links: [{ label: "Code", href: "https://github.com/CodeWith-vivek/crownify2024" }],
  },
  {
    title: "User Management – Admin Dashboard",
    img: "images/Adminpanel.webp",
    description:
      "A full-stack user management system with separate user and admin flows. Users can sign up, log in, and manage their profile, with file uploads handled through Multer. Admins get a dashboard to add, edit, and search users with server-side pagination. Authentication uses JWTs stored in httpOnly, sameSite-strict cookies with bcrypt-hashed passwords, and route guards keep user and admin areas separate and stop logged-in users from reaching the login pages again. Search and pagination run on the server with MongoDB skip/limit, and forms are validated with Formik and Yup.",
    focus: "Secure authentication, role-based access, and clean admin workflows.",
    stacks: ["React", "Redux Toolkit", "Formik", "Yup", "Node.js", "Express", "MongoDB", "JWT", "Multer", "bcrypt"],
    links: [{ label: "Code", href: "https://github.com/CodeWith-vivek/react-userMangement" }],
  },
];

const moreProjects = [
  {
    title: "Netflix Clone",
    img: "images/netflix.webp",
    description:
      "A Netflix-style streaming interface built with React and Firebase. Users can sign up and log in through Firebase Authentication with client-side form validation and toast feedback, then browse categorized title rows under a hero banner and open a player page to watch. Built as a learning project to practice component structure and authentication flow.",
    focus: "Authentication flow and component-based UI.",
    stacks: ["React", "Vite", "Firebase Authentication", "React Toastify"],
    links: [
      { label: "Code", href: "https://github.com/CodeWith-vivek/React-netflix-clone" },
      { label: "Live Demo", href: "https://react-netflix-clone-chi-ten.vercel.app/login" },
    ],
  },
  {
    title: "OLX Clone",
    img: "images/olx.webp",
    description:
      "A marketplace app inspired by OLX, built with React and Firebase. Users can sign in with Google or email, post items for sale through a Sell form with image upload, browse listings stored in Firestore, open a details page for each item, and save favourites to a wishlist. The UI uses Tailwind CSS with Flowbite React components, and app state is shared through React Context.",
    focus: "Firebase authentication, listing creation, and a marketplace browsing flow.",
    stacks: ["React", "Vite", "Firebase Auth", "Firestore", "Tailwind CSS", "Flowbite React", "Context API"],
    links: [
      { label: "Code", href: "https://github.com/CodeWith-vivek/react-olx-clone" },
      { label: "Live Demo", href: "https://react-olx-clone-three.vercel.app/" },
    ],
  },
  {
    title: "Jaguar Website",
    img: "images/jaguar.webp",
    description:
      "A static homepage recreation of the Jaguar website, built with HTML, CSS, and Bootstrap. A layout and styling exercise focused on reproducing the brand's premium look and page structure.",
    focus: "Static page layout and styling with HTML, CSS, and Bootstrap.",
    stacks: ["HTML", "CSS", "Bootstrap"],
    links: [{ label: "Code", href: "https://github.com/CodeWith-vivek/Jaguar" }],
  },
  {
    title: "Sony Pictures Website",
    img: "images/sony.webp",
    description:
      "A static homepage recreation of the Sony Pictures website, built with HTML and CSS. A layout and styling exercise focused on reproducing the site's structure and entertainment-focused visual design.",
    focus: "Static page layout and CSS styling.",
    stacks: ["HTML", "CSS"],
    links: [{ label: "Code", href: "https://github.com/CodeWith-vivek/sony-pictures" }],
  },
];

const footerIconsList = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/__v_i_v_e_k_._a_n_a_n_d?igsh=MWhkMmluaHM0dHduMQ==",
    icon: "images/insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-anand-453bba17a",
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
      "Owned backend architecture across client and admin domains for a production AI platform built by a 3-developer team, using Next.js, TypeScript, and PostgreSQL/pgvector on Neon.",
      "Architected the RAG retrieval pipeline – hybrid vector/keyword search and embedding-based reranking – backed by a 3-layer LLM guardrail system spanning prompt-injection defense, jailbreak detection, and hallucination checks.",
      "Built admin control-plane APIs for lead management, knowledge-base curation, and authentication rate-limiting.",
      "Identified and patched an unauthenticated PII-enumeration vulnerability; hardened rate-limiting and session-token handling against auth-bypass vectors.",
    ],
  },
  {
    title: "Freelance Full Stack Developer (part-time)",
    job: "Ernest Wells Ltd · UK (Remote)",
    date: "Jun 2026",
    contents: [
      "Independently built and deployed a UK accountancy firm's lead-generation site on Astro 6 (hybrid SSR/static, Vercel), TypeScript, and Tailwind CSS 4, with 20+ reusable components and 9 statically generated service pages from dynamic routes.",
      "Modeled all content as 18 Zod-validated Astro Content Collections integrated with CloudCannon CMS, letting non-technical staff manage copy, pricing, FAQs, and testimonials independently.",
      "Built a serverless contact API – honeypot filtering, server-side validation, HTML-escaped output – persisting leads to Google Sheets with Resend notifications, backed by an Alpine.js interactive form.",
      "Shipped core conversion tools – a 4-step service-recommendation quiz, tax estimator, and pre-filled WhatsApp handoffs – alongside technical SEO via JSON-LD (AccountingService, FAQPage) and Open Graph.",
      "Managed Vercel deployment, custom domain configuration, launch, and full client handover.",
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
  featuredProjects,
  moreProjects,
  footerIconsList,
  SkillsInfo,
  experiences,
  educationData
};
