// V2 — updated positioning for AI-era job hunting. TODO: replace the sample LinkedIn URL with your real profile.
export const profile = {
  name: 'Tristan Vegas',
  role: 'Web Developer',
  heroLine: 'Web Developer · Full-Stack · Learning AI Integration',
  tagline:
    'Detail-oriented and self-motivated Web Developer with a Bachelor’s degree in Information Technology. Experienced in technical support, infrastructure management, and full-stack development. Proficient in Laravel, Vue.js, JavaScript, Node.js and cloud hosting services.',
  summary:
    'A quality-driven professional with a strong work ethic and a passion for building efficient, user-friendly applications. Skilled in providing in-person and remote assistance, ensuring seamless user experiences. Currently expanding into AI — learning Python and LLM API integration to build AI-powered web applications.',
}

export const contact = {
  email: 'vegastristan1@gmail.com',
  phone: '+63 921 208 9062',
  phoneHref: '+639212089062',
  location: 'Pamukid, San Fernando, Camarines Sur, Philippines',
  github: 'https://github.com/vegastristan1',
  githubLabel: 'vegastristan1',
  // TODO: replace with your real LinkedIn URL today
  linkedin: 'https://www.linkedin.com/in/tristan-vegas',
  linkedinLabel: 'linkedin.com/in/tristan-vegas',
  website: 'https://tristan-portfolio-ecru.vercel.app',
  websiteLabel: 'tristan-portfolio-ecru.vercel.app',
  resume: '/resume-v2.pdf',
}

export const sectionNum = {
  about: '01',
  skills: '02',
  ai: '03',
  experience: '04',
  projects: '05',
  education: '06',
  contact: '07',
}

export const experience = [
  {
    period: 'June 2025 — August 2026',
    title: 'IT System & Data Analyst',
    company: 'Milaor Trading Corporation',
    place: 'Brgy. San Jose, Milaor, Camarines Sur — Nestlé Warehouse',
    type: 'Full-time',
    bullets: [
      'Responsible for supervising warehouse encoders, ensuring accurate and timely encoding of sales and inventory data.',
      'Utilize Microsoft Excel to prepare sales reports, monitor inventory, and organize operational data.',
      'Utilize SQL to retrieve, manage, and analyze sales and inventory data.',
      'Perform data analysis to monitor sales performance, stock levels, and product movement.',
      'Monitor inventory records and assist in identifying stock discrepancies and data inconsistencies.',
      'Prepare sales, inventory, and operational reports to support management decision-making.',
    ],
  },
  {
    period: 'July 2022 — March 2024',
    title: 'Full Stack Developer',
    company: 'Foxhole QA',
    place: 'Austin, Texas, United States',
    type: 'Remote',
    stack: ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'Node.js', 'Swift (iOS)', 'Android', 'Firebase', 'VS Code'],
    bullets: [
      'Created and managed the Foxhole QA website with an admin dashboard for updates on blogs, featured works, and testimonials.',
      'Developed full-stack web applications and mobile applications for both iOS and Android.',
      'Specialized in Mobile Development and Data Analytics tasks, ensuring diverse client needs were met effectively.',
      'Performed manual QA testing to identify and report bugs, ensuring reliable releases.',
      'Provided ongoing maintenance and support for website functionality.',
    ],
  },
  {
    period: 'Ongoing',
    title: 'Mobile Developer / Web Developer',
    company: 'Freelance',
    place: 'Remote',
    type: 'Freelance',
    bullets: [
      'Delivered mobile and web projects for various clients, from concept through deployment.',
      'Handled full-stack development, maintenance, and support across different technologies.',
    ],
  },
  {
    period: 'April 2018 — July 2018',
    title: 'On the Job Training',
    company: 'Tokyo System Solutions',
    place: 'Unit 205, Citrine Building, Magsaysay Ave, Naga City',
    type: 'Internship',
    bullets: [
      'Created a Human Resource and Web Application that can be used for other companies.',
      'Learned the Angular framework for the web application.',
    ],
  },
]

export const projects = [
  {
    name: 'Dev Hub',
    period: 'Personal Project',
    description:
      'A local-first developer hub that shows, runs and guides every project in one place — auto-detects apps, displays your stack, blueprints and setup guides.',
    bullets: [
      'Auto-detects projects from package.json, artisan or docker-compose.yml and groups them by stack.',
      'Stack, Blueprints and Setup Guide views generated from your resume and config files.',
      'Run/stop controls and live tool checks via a local Express server.',
    ],
    tools: ['Node.js', 'Express', 'React', 'Full-Stack'],
    featured: true,
    url: 'https://dev-hub-beta-tan.vercel.app',
  },
  {
    name: 'Warehouse Inventory System',
    period: 'Professional',
    description:
      'A web-based warehouse inventory management system to monitor and maintain accurate inventory counts and item records, integrated directly with the company SQL Server database.',
    bullets: [
      'Real-time inventory monitoring with alerts for critically low stock levels.',
      'Client-side and server-side components for data processing.',
      'Centralized data management via SQL Server Management Studio (SSMS).',
      'User-friendly interface built with React.js for efficient inventory tracking.',
    ],
    tools: ['React.js', 'SQL Server', 'SSMS', 'Full-Stack'],
    featured: true,
  },
  {
    name: 'Tour & Travel Management System',
    period: 'Professional',
    description:
      'A full tour & travel platform with a client-facing booking website and a mobile app for tour company administrators.',
    bullets: [
      'Client-facing website for browsing and booking pre-made tour packages with detailed itineraries.',
      'Itinerary and tour management for creating schedules and activities.',
      'Mobile app for administrators to receive notifications and manage pending requests.',
      'Booking and payment approval workflows with full administrative controls.',
    ],
    tools: ['Laravel', 'MySQL', 'Web', 'Mobile'],
    featured: true,
  },
  {
    name: 'Student Enrollment System',
    period: 'January 2025 — March 2025',
    description:
      'A web application backend for student enrollment, covering authentication, registration, and course assignments.',
    bullets: [
      'Relational database structure for secure and efficient data management.',
      'RESTful APIs for seamless integration with the front-end application.',
      'Role-based access control for students, teachers, and admins.',
    ],
    tools: ['PHP (Laravel)', 'MySQL', 'REST API'],
    featured: true,
  },
  {
    name: 'Lending Management System',
    period: 'March 2024 — February 2025',
    description:
      'A standalone Windows desktop lending management system with loan tracking, payment scheduling, and interest calculation.',
    bullets: [
      'Loan tracking, payment scheduling, and interest calculation features.',
      'User-friendly interface for customer and loan data management.',
      'MySQL integration for secure data storage and retrieval.',
    ],
    tools: ['C#', '.NET Framework', 'MySQL'],
  },
  {
    name: 'Desktop POS System — Pizza Restaurant',
    period: 'College Project',
    description:
      'A desktop Point-of-Sales system inspired by a pizza restaurant environment, built independently for learning and experimentation.',
    bullets: [
      'Features for managing orders, products, inventory, and sales transactions.',
      'Database-driven functionality for products, inventory, and transaction records.',
      'Independent educational project — not affiliated with any existing brand.',
    ],
    tools: ['C#', 'Visual Studio', 'SQL Server', 'SSMS'],
  },
  {
    name: 'Educational Multiplayer Math Game',
    period: 'April 2021 — June 2022',
    description:
      'A prototype for a multiplayer math-learning mobile game with a real-time backend server.',
    bullets: [
      'Backend server built with Node.js and Socket.IO for real-time interactions.',
      'Core gameplay features developed and tested before project discontinuation.',
    ],
    tools: ['Java', 'Node.js', 'Socket.IO', 'Visual Studio'],
  },
  {
    name: 'Laundry Shop Web & Mobile Application',
    period: 'April 2021 — July 2021',
    description:
      'A full-stack web and mobile application for a laundry shop with customer management and payment integration.',
    bullets: [
      'Customer management and payment integration.',
      'Responsive and intuitive user interface for both web and mobile platforms.',
    ],
    tools: ['Full-Stack', 'Web', 'Mobile'],
  },
]

export const skillGroups = [
  {
    title: 'Frontend Development',
    skills: ['HTML5', 'CSS', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Vue.js', 'Angular'],
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'Laravel', 'REST APIs'],
  },
  {
    title: 'Mobile Development',
    skills: ['Swift (iOS)', 'Xcode', 'Android', 'Firebase'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'SQL', 'SQL Server'],
  },
  {
    title: 'DevOps & Cloud',
    skills: ['Docker', 'AWS'],
  },
  {
    title: 'Architecture & Development',
    skills: ['MVC', 'API Development', 'Authentication & Authorization', 'Manual QA Testing'],
  },
  {
    title: 'Tools & Version Control',
    skills: ['Git', 'GitHub', 'npm', 'VS Code'],
  },
]

export const ai = {
  statement:
    'I am currently expanding into AI — learning how to integrate LLM APIs and build AI-powered features into full-stack applications.',
  items: [
    { name: 'Python (fundamentals)', status: 'Learning' },
    { name: 'LLM API Integration (OpenAI / Claude)', status: 'Learning' },
    { name: 'Prompt Engineering', status: 'Practicing' },
    { name: 'AI-Assisted Development (Copilot / Claude)', status: 'In daily workflow' },
  ],
}

export const softSkills = [
  'Strong communication and collaboration',
  'Problem-solving and analytical thinking',
  'Documentation and reporting',
  'Adaptability and quick learning',
]

export const education = [
  {
    period: 'June 2015 — September 2020',
    degree: 'Bachelor of Science in Information Technology',
    school: 'University of Nueva Caceres',
    place: 'J. Hernandez Ave, Naga, Camarines Sur',
  },
]

export const languages = ['English', 'Filipino']
