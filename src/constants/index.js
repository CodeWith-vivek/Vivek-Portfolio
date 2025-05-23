
import htmlLogo from "../assets/tech_logo/html.png";
import cssLogo from "../assets/tech_logo/css.png";
import sassLogo from "../assets/tech_logo/sass.png";
import javascriptLogo from "../assets/tech_logo/javascript.png";
import reactjsLogo from "../assets/tech_logo/reactjs.png";
import angularLogo from "../assets/tech_logo/angular.png";
import reduxLogo from "../assets/tech_logo/redux.png";
import nextjsLogo from "../assets/tech_logo/nextjs.png";
import tailwindcssLogo from "../assets/tech_logo/tailwindcss.png";
import gsapLogo from "../assets/tech_logo/gsap.png";
import materialuiLogo from "../assets/tech_logo/materialui.png";
import bootstrapLogo from "../assets/tech_logo/bootstrap.png";
import springbootLogo from "../assets/tech_logo/springboot.png";
import nodejsLogo from "../assets/tech_logo/nodejs.png";
import expressjsLogo from "../assets/tech_logo/express.png";
import mysqlLogo from "../assets/tech_logo/mysql.png";
import mongodbLogo from "../assets/tech_logo/mongodb.png";
import firebaseLogo from "../assets/tech_logo/firebase.png";
import cLogo from "../assets/tech_logo/c.png";
import cppLogo from "../assets/tech_logo/cpp.png";
import javaLogo from "../assets/tech_logo/java.png";
import pythonLogo from "../assets/tech_logo/python.png";
import typescriptLogo from "../assets/tech_logo/typescript.png";
import gitLogo from "../assets/tech_logo/git.png";
import githubLogo from "../assets/tech_logo/github.png";
import vscodeLogo from "../assets/tech_logo/vscode.png";
import postmanLogo from "../assets/tech_logo/postman.png";
import mcLogo from "../assets/tech_logo/mc.png";
import figmaLogo from "../assets/tech_logo/figma.png";
import netlifyLogo from "../assets/tech_logo/netlify.png";
import vercelLogo from "../assets/tech_logo/vercel.png";
import postgreLogo from "../assets/tech_logo/postgre.png";
import csharpLogo from "../assets/tech_logo/csharp.png";

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
    icon: "/images/github.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/__v_i_v_e_k_._a_n_a_n_d?igsh=MWhkMmluaHM0dHduMQ==",
    icon: "/images/insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-anand-453bba17a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: "/images/linkedin.svg",
  },
];

const iconsList = [
  {
    name: "html",
    image: "/images/html.svg",
  },
  {
    name: "css",
    image: "/images/css.svg",
  },
  {
    name: "javascript",
    image: "/images/js.svg",
  },
  {
    name: "react",
    image: "/images/react.svg",
  },
  {
    name: "redux",
    image: "/images/redux.svg",
  },
  {
    name: "typescript",
    image: "/images/ts.svg",
  },
  {
    name: "nodejs",
    image: "/images/nodejs.svg",
  },
  {
    name: "expressjs",
    image: "/images/express.svg",
  },
  {
    name: "mongodb",
    image: "/images/mongodb.svg",
  },
  {
    name: "pgsql",
    image: "/images/postgresql.svg",
  },
  {
    name: "bootstrap",
    image: "/images/bootstrap.svg",
  },
  {
    name: "tailwindcss",
    image: "/images/tailwindcss.svg",
  },
  {
    name: "firebase",
    image: "/images/firebase.svg",
  },
  {
    name: "github",
    image: "/images/github.svg",
  },
  {
    name: "git",
    image: "/images/git.svg",
  },

  {
    name: "figma",
    image: "/images/figma.svg",
  },
  {
    name: "vscode",
    image: "/images/vscode.svg",
  },
  {
    name: "aws",
    image: "/images/aws.svg",
  },
  {
    name: "jwt",
    image: "/images/jwt.svg",
  },
];

const slides = [
  {
    id: 1,
    title: "Sony Pictures",
    img: "/images/sony.webp",
  },
  {
    id: 2,
    title: "Crownify",
    img: "/images/crownify.webp",
    description:
      "A full-stack e-commerce . Features include user authentication, product catalog, shopping cart, and payment processing.",
    stacks: ["EJS", "Node.js", "Express", "MongoDB", "Razor Pay API"],
    github: "https://github.com/CodeWith-vivek/crownify2024",
  },
  {
    id: 3,
    title: "Admin Dashboard",
    github: "https://github.com/yourname/ecommerce-app",
    description:
      "User management system with login/signup for users and admins  built with React and Redux.",
    stacks: ["React", "Redux", "Nodejs", "Express", "MongoDB"],
    img: "/images/Adminpanel.webp",
  },
  {
    id: 4,
    title: "Jaguar",
    img: "/images/jaguar.webp",
    description:
      "A static Jaguar homepage built with HTML and CSS, featuring a sleek layout, and modern UI showcasing luxury and performance.",
    stacks: ["HTML", "CSS"],
    github: "https://github.com/yourname/ecommerce-app",
    preview: "hhjvv",
  },
  {
    id: 5,
    title: "Olx Clone",
    img: "/images/olx.webp",
    description:
      "A simple OLX clone built with React and Firebase, allowing users to list and sell items with authentication, image uploads, and real-time data storage.",
    stacks: ["React", "Firebase"],
    github: "https://github.com/yourname/ecommerce-app",
    preview: "hhjvv",
  },
  {
    id: 6,
    title: "Netflix Clone",
    img: "/images/netflix.webp",
    stacks: ["React", "Firebase"],
    description:
      "A Netflix clone built with React and Firebase, featuring user signup/login, secure authentication, and movie playback with a modern UI.",
    github: "https://github.com/yourname/ecommerce-app",
    preview: "hhjvv",
  },

  {
    id: 7,
    title: "Sony Pictures",
    img: "/images/sony.webp",
    description:
      "A static Sony Pictures homepage built with HTML and CSS, featuring a clean design and modern UI that highlights entertainment and cinematic excellence.",
    stacks: ["HTML", "CSS"],
    github: "https://github.com/yourname/ecommerce-app",
    preview: "hhjvv",
  },
];

const footerIconsList = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/__v_i_v_e_k_._a_n_a_n_d?igsh=MWhkMmluaHM0dHduMQ==",
    icon: "/images/insta.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-anand-453bba17a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: "/images/linkedin.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/CodeWith-vivek",
    icon: "/images/github.svg",
  },
];

const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Redux', logo: reduxLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'Firebase', logo: firebaseLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', logo: cLogo },
      { name: 'Java', logo: javaLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'TypeScript', logo: typescriptLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Compass', logo: mcLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];
const experiences = [
  {
    title: "Business Associate",
    job: "Darsana Marbles",
    date: "2019 – 2023",
    contents: [
      "Oversaw daily operations in a retail environment specializing in granites, marbles, and tiles.",
      "Managed inventory and vendor coordination, ensuring consistent product availability.",
      "Engaged with customers to understand their needs and provide tailored product suggestions.",
      "Maintained a clean and professional display area to enhance customer experience.",
      "Handled billing, invoices, and basic administrative tasks to support business efficiency.",
    ],
  },
  {
    title: "Sales Officer",
    job: "ESAF Small Finance Bank",
    date: "Jun 2023 – Sep 2023",
    contents: [
      "Promoted financial products including savings accounts, loans, and credit cards to potential customers.",
      "Guided clients through onboarding processes, explaining product benefits and eligibility.",
      "Documented daily customer interactions and reported sales activities to the branch team.",
      "Collaborated in outreach campaigns to boost visibility and generate leads.",
      "Strengthened interpersonal and communication skills through daily client interactions.",
    ],
  },
  {
    title: "Software Developer Trainee (MERN Stack)",
    job: "Brototype",
    date: "2024 – Present",
    contents: [
      "Undergoing intensive self-learning in full-stack web development through Brototype’s practical training model.",
      "Building dynamic web applications using MongoDB, Express.js, React.js, and Node.js (MERN stack).",
      "Implementing real-world features including authentication, REST APIs, and CRUD operations.",
      "Practicing modern development workflows using Git, GitHub, and collaborative debugging.",
      "Focusing on performance, clean UI/UX design, and scalable architecture in projects.",
    ],
  },
];

const educationData = [
  {
    institution: "Girideepam Institute of Advanced Learning",
    degree: "Bachelor of Commerce",
    years: "2016 – 2019",
    description:
      "Focused on accounting, business management, and commerce fundamentals. Built a disciplined academic foundation and team collaboration skills.",
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
