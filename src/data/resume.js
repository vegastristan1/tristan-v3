// V2 — updated positioning for AI-era job hunting.
export const profile = {
  name: "Tristan Vegas",
  role: "Web Developer",
  heroLine: "Web Developer · Full-Stack · AI Integration",
  tagline:
    "Detail-oriented and self-motivated Web Developer with a Bachelor’s degree in Information Technology. Experienced in technical support, infrastructure management, and full-stack development. Proficient in Next.js, TypeScript, React, Laravel, Vue.js, JavaScript and Node.js.",
  summary:
    "A quality-driven professional with a strong work ethic and a passion for building efficient, user-friendly applications. Skilled in providing in-person and remote assistance, ensuring seamless user experiences. Recently built and deployed an AI-powered full-stack application (Next.js + OpenAI), expanding into LLM API integration and AI workflow design.",
};

export const contact = {
  email: "vegastristan1@gmail.com",
  phone: "+63 934 765 1692",
  phoneHref: "+639347651692",
  location: "Pamukid, San Fernando, Camarines Sur, Philippines",
  github: "https://github.com/vegastristan1",
  githubLabel: "vegastristan1",
  linkedin: "https://www.linkedin.com/in/tristan-vegas",
  linkedinLabel: "linkedin.com/in/tristan-vegas",
  website: "https://tristan-vegas.vercel.app",
  websiteLabel: "tristan-vegas.vercel.app",
  resume: "/Tristan-Vegas-Resume.pdf",
};

export const sectionNum = {
  about: "01",
  skills: "02",
  ai: "03",
  experience: "04",
  projects: "05",
  education: "06",
  contact: "07",
};

export const experience = [
  {
    period: "June 2025 — August 2026",
    title: "IT System & Data Analyst - IT User Champion",
    company: "Milaor Trading Corporation",
    place: "Brgy. San Jose, Milaor, Camarines Sur — Nestlé Warehouse",
    type: "Full-time",
    bullets: [
      "Supervised warehouse encoders for accurate sales and inventory data",
      "Built sales and inventory reports with Excel and SQL",
      "Flagged stock discrepancies to support management decisions",
    ],
  },
  {
    period: "May 2022 — March 2024",
    title: "Web Developer (Full-Stack & Mobile)",
    company: "Foxhole QA",
    place: "Austin, Texas, United States",
    type: "On-Site Branch",
    stack: [
      "PHP",
      "Laravel",
      "Vue.js",
      "MySQL",
      "Node.js",
      "Swift (iOS)",
      "Firebase",
      "Kotlin (Android)",
      "CMS",
    ],
    bullets: [
      "Built the company website with an admin dashboard for blogs, works and testimonials",
      "Developed web, iOS and Android apps (PHP, Laravel, Vue, Swift, Firebase)",
      "Manual QA testing and ongoing maintenance",
      "UI fixes with CSS on client projects, including CommonSpirit Health",
    ],
  },
  {
    period: "2021 - Present",
    title: "Mobile Developer / Web Developer",
    company: "Freelance",
    place: "Remote",
    type: "Freelance",
    bullets: [
      "Delivered mobile and web projects for various clients, from concept through deployment.",
      "Handled full-stack development, maintenance, and support across different technologies.",
    ],
  },
  {
    period: "April 2018 — July 2018",
    title: "On the Job Training",
    company: "Tokyo System Solutions",
    place: "Unit 205, Citrine Building, Magsaysay Ave, Naga City",
    type: "Internship",
    bullets: [
      "Created a Human Resource and Web Application that can be used for other companies.",
      "Learned the Angular framework for the web application.",
    ],
  },
];

export const projects = [
  {
    name: "AI Developer Task Manager",
    period: "Personal Project",
    description:
      "Turns requirements into tasks, sprints and subtasks with AI help and approval at every step. Kanban, dependencies, command palette, dark/light mode.",
    bullets: [
      "Full-stack Next.js + TypeScript app on PostgreSQL (Neon) with Prisma ORM, Auth.js sessions and Zod-validated route handlers and server actions.",
      "AI actions — task breakdown, implementation plans, acceptance criteria, complexity estimates and technical review — go through an explicit approve/reject workflow.",
      "Kanban drag-and-drop, sprints, task dependencies with blocked-task detection, developer dashboard, command palette, dark and light mode.",
    ],
    tools: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "OpenAI"],
    featured: true,
    url: "https://ai-developer-task-manager.vercel.app",
    shots: [
      { label: "AI Chat", src: "/projects/ai-task-manager/ai-chat.webp" },
      { label: "Board", src: "/projects/ai-task-manager/board.webp" },
      { label: "Dashboard", src: "/projects/ai-task-manager/dashboard.webp" },
      { label: "Projects", src: "/projects/ai-task-manager/projects.webp" },
    ],
  },
  {
    name: "Dev Hub",
    period: "Personal Project",
    description:
      "A local-first developer hub that shows, runs and guides every project in one place — auto-detects apps, displays your stack, blueprints and setup guides.",
    bullets: [
      "Auto-detects projects from package.json, artisan or docker-compose.yml and groups them by stack.",
      "Stack, Blueprints and Setup Guide views generated from your resume and config files.",
      "Run/stop controls and live tool checks via a local Express server.",
    ],
    tools: ["Node.js", "Express", "React", "Full-Stack"],
    featured: true,
    url: "https://dev-hub-beta-tan.vercel.app",
    shots: "soon",
  },
  {
    name: "Foxhole QA Website",
    period: "Professional",
    description:
      "Company website with a custom admin dashboard for managing blogs, featured work and testimonials. Built and maintained during my time at Foxhole QA.",
    bullets: [],
    tools: ["PHP", "Laravel", "Vue.js", "MySQL"],
    url: "https://foxholeqa.com/",
    urlLabel: "Live site",
  },
  {
    name: "CommonSpirit Health (client project)",
    period: "Client work via Foxhole QA",
    description:
      "Fixed UI issues with CSS on the public CommonSpirit Health website, which uses a CMS for adding new pages and event posts. Delivered as part of a Foxhole QA client engagement.",
    bullets: [],
    tools: ["CSS", "UI fixes", "CMS"],
    url: "https://www.commonspirit.org/",
    urlLabel: "Visit site",
  },
  {
    name: "Warehouse Inventory System",
    period: "Professional",
    description:
      "A web-based warehouse inventory management system to monitor and maintain accurate inventory counts and item records, integrated directly with the company SQL Server database.",
    bullets: [
      "Real-time inventory monitoring with alerts for critically low stock levels.",
      "Client-side and server-side components for data processing.",
      "Centralized data management via SQL Server Management Studio (SSMS).",
      "User-friendly interface built with React.js for efficient inventory tracking.",
    ],
    tools: ["React.js", "SQL Server", "SSMS", "Full-Stack"],
    featured: true,
    shots: [
      { label: "AI Chat", src: "/projects/mtc/dashboard.png" },
      { label: "Board", src: "/projects/mtc/pending-sales-order.png" },
      { label: "Dashboard", src: "/projects/mtc/sales-order-details.png" },
      { label: "Projects", src: "/projects/mtc/inventory.png" },
    ],
  },
  {
    name: "Tour & Travel Management System",
    period: "Professional",
    description:
      "A full tour & travel platform with a client-facing booking website and a mobile app for tour company administrators.",
    bullets: [
      "Client-facing website for browsing and booking pre-made tour packages with detailed itineraries.",
      "Itinerary and tour management for creating schedules and activities.",
      "Mobile app for administrators to receive notifications and manage pending requests.",
      "Booking and payment approval workflows with full administrative controls.",
    ],
    tools: ["Laravel", "MySQL", "Web", "Mobile"],
    featured: true,
  },
  {
    name: "Mobile Management System (Prototype)",
    period: "Prototype",
    description:
      "Prototype mobile app for iOS and Android covering attendance, bookings and inventory management. Not released on the App Store or Google Play.",
    bullets: [],
    tools: ["iOS", "Android"],
  },
  {
    name: "Student Enrollment System",
    period: "January 2025 — March 2025",
    description:
      "A web application backend for student enrollment, covering authentication, registration, and course assignments.",
    bullets: [
      "Relational database structure for secure and efficient data management.",
      "RESTful APIs for seamless integration with the front-end application.",
      "Role-based access control for students, teachers, and admins.",
    ],
    tools: ["PHP (Laravel)", "MySQL", "REST API"],
    featured: true,
    shots: "soon",
  },
  {
    name: "Lending Management System",
    period: "March 2024 — February 2025",
    description:
      "A standalone Windows desktop lending management system with loan tracking, payment scheduling, and interest calculation.",
    bullets: [
      "Loan tracking, payment scheduling, and interest calculation features.",
      "User-friendly interface for customer and loan data management.",
      "MySQL integration for secure data storage and retrieval.",
    ],
    tools: ["C#", ".NET Framework", "MySQL"],
  },
  {
    name: "Desktop POS System — Pizza Restaurant",
    period: "College Project",
    description:
      "A desktop Point-of-Sales system inspired by a pizza restaurant environment, built independently for learning and experimentation.",
    bullets: [
      "Features for managing orders, products, inventory, and sales transactions.",
      "Database-driven functionality for products, inventory, and transaction records.",
      "Independent educational project — not affiliated with any existing brand.",
    ],
    tools: ["C#", "Visual Studio", "SQL Server", "SSMS"],
  },
  {
    name: "Educational Multiplayer Math Game",
    period: "April 2021 — June 2022",
    description:
      "A prototype for a multiplayer math-learning mobile game with a real-time backend server.",
    bullets: [
      "Backend server built with Node.js and Socket.IO for real-time interactions.",
      "Core gameplay features developed and tested before project discontinuation.",
    ],
    tools: ["Java", "Node.js", "Socket.IO", "Visual Studio"],
  },
  {
    name: "Laundry Shop Web & Mobile Application",
    period: "April 2021 — July 2021",
    description:
      "A full-stack web and mobile application for a laundry shop with customer management and payment integration.",
    bullets: [
      "Customer management and payment integration.",
      "Responsive and intuitive user interface for both web and mobile platforms.",
    ],
    tools: ["Full-Stack", "Web", "Mobile"],
  },
];

export const skillGroups = [
  {
    title: "Frontend Development",
    skills: [
      "HTML5",
      "CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Vue.js",
      "Angular",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "Laravel", "REST APIs"],
  },
  {
    title: "Mobile Development",
    skills: ["Swift (iOS)", "Xcode", "Android", "Firebase"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQL", "SQL Server", "Prisma"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "AWS", "Vercel"],
  },
  {
    title: "Architecture & Development",
    skills: [
      "MVC",
      "API Development",
      "Authentication & Authorization",
      "Zod (Validation)",
    ],
  },
  {
    title: "Testing & Quality",
    skills: ["Vitest", "Playwright", "ESLint", "Prettier", "Manual QA Testing"],
  },
  {
    title: "Tools & Version Control",
    skills: ["Git", "GitHub", "npm", "VS Code"],
  },
];

export const ai = {
  statement:
    "I have moved from learning AI integration into shipping it — I built and deployed an AI-powered full-stack application that calls the OpenAI API, returns structured AI responses, and keeps a human in the loop with an explicit approve/reject workflow before any AI suggestion is applied.",
  items: [
    { name: "Python (fundamentals)", status: "Learning" },
    { name: "LLM API Integration (OpenAI)", status: "Shipped in a real app" },
    { name: "Prompt Engineering", status: "Practicing" },
    {
      name: "AI Workflows (human-in-the-loop approval)",
      status: "Built in production",
    },
  ],
};

export const softSkills = [
  "Strong communication and collaboration",
  "Problem-solving and analytical thinking",
  "Documentation and reporting",
  "Adaptability and quick learning",
];

export const education = [
  {
    period: "June 2015 — September 2020",
    degree: "Bachelor of Science in Information Technology",
    school: "University of Nueva Caceres",
    place: "J. Hernandez Ave, Naga, Camarines Sur",
  },
];

export const languages = ["English", "Filipino"];
