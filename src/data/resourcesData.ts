import { ResourceItem } from '../types';

export const RESOURCES_DATA: ResourceItem[] = [
  // ATS Resume Templates
  {
    id: 'res-ats-fresher-classic',
    title: 'ATS Fresher Single-Column Classic Resume',
    category: 'Resume Templates',
    subject: 'B.Tech / BCA / MCA Freshers',
    fileSize: '1.2 MB',
    fileType: 'DOCX & PDF',
    downloadsCount: 34200,
    rating: 4.9,
    description: 'Minimalist 1-page ATS template tuned for campus placements (TCS, Infosys, Wipro, Accenture). 100% parser compatible with standard headers.',
    tags: ['ATS 95+', 'Single Column', 'Campus Placement', 'Word & LaTeX'],
    features: [
      'Strict ATS section ordering (Education, Skills, Projects, Experience)',
      'Action-verb bullet points with quantifiable impact metrics',
      'Tested with Workday, Taleo, and Greenhouse parsers',
      'Includes LaTeX source code and editable Microsoft Word file'
    ]
  },
  {
    id: 'res-ats-sde-modern',
    title: 'Modern Software Engineer (SDE-1) Resume Template',
    category: 'Resume Templates',
    subject: 'Software Engineering',
    fileSize: '1.5 MB',
    fileType: 'DOCX & PDF',
    downloadsCount: 28900,
    rating: 4.8,
    description: 'Designed specifically for tech roles featuring tech stack badges, GitHub link placement, LeetCode ratings section, and project highlights.',
    tags: ['SDE-1', 'GitHub Links', 'LeetCode Stats', 'Product Companies'],
    features: [
      'Dedicated section for System Design, DSA, and Frameworks',
      'Includes live project links and tech stack callouts',
      'Tailored for Product Companies (Amazon, Flipkart, Swiggy)',
      'Clean typography with high contrast print styling'
    ]
  },
  {
    id: 'res-ats-frontend-ui',
    title: 'Frontend & Full Stack Developer Resume',
    category: 'Resume Templates',
    subject: 'Web Development',
    fileSize: '1.1 MB',
    fileType: 'DOCX & PDF',
    downloadsCount: 19400,
    rating: 4.9,
    description: 'Clean visual hierarchy highlighting React, TypeScript, Node.js, live portfolio links, and UI engineering accomplishments.',
    tags: ['Frontend', 'Full Stack', 'Portfolio Link', 'ATS Safe'],
    features: [
      'High impact project showcase grid format',
      'Optimized for remote developer roles and startup applications',
      'Includes sample accomplishment bullets for React & Node projects',
      'Free Figma design source + PDF export'
    ]
  },
  {
    id: 'res-ats-data-analyst',
    title: 'Data Analyst & ML Engineer Resume Template',
    category: 'Resume Templates',
    subject: 'Data Science & AI',
    fileSize: '1.4 MB',
    fileType: 'DOCX & PDF',
    downloadsCount: 22100,
    rating: 4.7,
    description: 'Tailored for Python, SQL, Tableau, PowerBI, and Machine Learning roles with dedicated metrics and datasets section.',
    tags: ['Data Science', 'Python & SQL', 'Machine Learning', 'ATS Tested'],
    features: [
      'Focus on model accuracy metrics, data pipeline scale, and insights generated',
      'Clean layout for Kaggle ranks and certification badges',
      'Word and Google Docs templates included',
      'Customized bullet points for pandas, SQL queries, and Scikit-Learn'
    ]
  },

  // Project Templates & Starter Code
  {
    id: 'res-proj-mern-placement',
    title: 'Full Stack MERN Placement Management Portal',
    category: 'Project Templates',
    subject: 'Final Year Capstone Project',
    fileSize: '12.4 MB',
    fileType: 'ZIP & Source',
    downloadsCount: 18200,
    rating: 4.9,
    description: 'Complete production-ready final year project with React, Node.js Express, MongoDB, JWT auth, and admin dashboard.',
    tags: ['MERN Stack', 'Capstone Project', 'JWT Auth', 'Complete Source'],
    features: [
      'Student placement application tracking & admin panel',
      'Comprehensive documentation & SRS report included',
      'Database ER diagram, flowcharts, and setup guide',
      'Vite + Express starter setup ready for deployment'
    ]
  },
  {
    id: 'res-proj-python-ai-notes',
    title: 'AI Smart Study Summarizer & Quiz Generator',
    category: 'Project Templates',
    subject: 'AI & Machine Learning',
    fileSize: '8.7 MB',
    fileType: 'ZIP & Source',
    downloadsCount: 24500,
    rating: 4.9,
    description: 'Python FastAPI backend + React frontend using Gemini API for automatic lecture note summarization and flashcard generation.',
    tags: ['Gemini API', 'Python FastAPI', 'React SPA', 'AI Project'],
    features: [
      'PDF text extraction & auto-generated MCQ quizzes',
      'Clean modern dashboard UI with dark/light mode',
      'Step-by-step setup video tutorial and architecture diagram',
      'Ready to present for college major projects'
    ]
  },
  {
    id: 'res-proj-java-springboot',
    title: 'Java Spring Boot & Microservices E-Learning API',
    category: 'Project Templates',
    subject: 'Java & Enterprise',
    fileSize: '15.1 MB',
    fileType: 'ZIP & Source',
    downloadsCount: 14300,
    rating: 4.8,
    description: 'RESTful Backend API architecture with Spring Boot 3, Spring Security, PostgreSQL/H2 database, Docker, and Swagger UI.',
    tags: ['Spring Boot 3', 'Microservices', 'REST API', 'Docker'],
    features: [
      'Role-Based Access Control (Admin, Instructor, Student)',
      'Swagger OpenAPI documentation generated out-of-the-box',
      'Unit testing setup with JUnit 5 & Mockito',
      'Ideal project for Java backend & MNC placement interviews'
    ]
  },

  // Notes, Cheat Sheets & Question Banks
  {
    id: 'res-python-cheatsheet',
    title: 'Python Quick Revision & Syntax Cheat Sheet',
    category: 'Cheat Sheets',
    subject: 'Python',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    downloadsCount: 14200,
    description: 'Comprehensive 4-page quick reference guide covering list methods, string slicing, dict operations, lambda functions, and common exception handling.'
  },
  {
    id: 'res-sql-notes-handwritten',
    title: 'Complete SQL & DBMS Handwritten Notes for Interviews',
    category: 'Notes',
    subject: 'SQL & DBMS',
    fileSize: '5.1 MB',
    fileType: 'PDF',
    downloadsCount: 18900,
    description: 'Neat handwritten notes on ER diagrams, 1NF to BCNF normalization, SQL queries with joins, subqueries, indexing, and ACID properties.'
  },
  {
    id: 'res-dsa-formulas-sheet',
    title: 'Data Structures & Algorithms Formula & Pattern Sheet',
    category: 'Cheat Sheets',
    subject: 'DSA',
    fileSize: '3.8 MB',
    fileType: 'PDF',
    downloadsCount: 22100,
    description: 'Time & space complexity chart for all major data structures and sorting algorithms + top 15 code templates in Java and C++.'
  },
  {
    id: 'res-os-cn-interview-pdf',
    title: 'Top 100 OS & Computer Networks Interview Q&A',
    category: 'Interview Questions',
    subject: 'Core CS',
    fileSize: '4.2 MB',
    fileType: 'PDF',
    downloadsCount: 16500,
    description: 'Curated 100 most asked questions in technical interview rounds for TCS Prime, Cognizant GenC Next, and Accenture.'
  },
  {
    id: 'res-company-aptitude-pdf',
    title: 'Previous 5 Years TCS & Infosys Aptitude Question Bank',
    category: 'Placement PDFs',
    subject: 'Aptitude & Reasoning',
    fileSize: '8.5 MB',
    fileType: 'PDF',
    downloadsCount: 27400,
    description: 'Collection of 300+ real quantitative aptitude, logical reasoning, and verbal questions with step-by-step solutions.'
  }
];

