import { Roadmap } from '../types';

export const ROADMAPS_DATA: Roadmap[] = [
  {
    id: 'python-developer',
    title: 'Python Developer Roadmap',
    description: 'A step-by-step learning guide to transition from Python basics to full backend web APIs, data manipulation, and automated testing.',
    category: 'Development',
    estimatedTime: '3 - 4 Months',
    targetRole: 'Junior Python Developer / Backend Intern',
    iconName: 'Code',
    steps: [
      {
        stepNumber: 1,
        title: 'Python Core Fundamentals',
        duration: '3 Weeks',
        description: 'Understand core syntax, data types, control flow, functions, and list/dictionary comprehensions.',
        keyTopics: ['Variables & Types', 'Loops & Conditionals', 'Functions & Lambda', 'Modules & Packages'],
        recommendedResources: ['Python Mastery Course', 'Python Official Documentation'],
        projectIdea: 'Command-line Expense Tracker CLI'
      },
      {
        stepNumber: 2,
        title: 'Object-Oriented Programming & Data Structures',
        duration: '3 Weeks',
        description: 'Learn classes, inheritance, encapsulation, magic methods, and basic data structures (Stacks, Queues, Hash Tables).',
        keyTopics: ['Classes & Instances', 'Inheritance & Polymorphism', 'Dunder Methods', 'Custom Stack & Queue'],
        recommendedResources: ['DSA in Python Guide', 'OOP Exercises'],
        projectIdea: 'Bank Account Management System'
      },
      {
        stepNumber: 3,
        title: 'Relational Databases & SQL',
        duration: '2 Weeks',
        description: 'Learn PostgreSQL or MySQL basics, write SQL queries, joins, and connect Python via ORM (SQLAlchemy).',
        keyTopics: ['SELECT, WHERE, JOINs', 'Database Normalization', 'SQLAlchemy / Peewee', 'CRUD Operations'],
        recommendedResources: ['SQL & DBMS Mastery', 'LeetCode Database Questions'],
        projectIdea: 'Student Management DB with Python GUI/CLI'
      },
      {
        stepNumber: 4,
        title: 'Web Frameworks (Flask or FastAPI)',
        duration: '4 Weeks',
        description: 'Build backend REST APIs, handle requests/responses, authentication with JWT, and API documentation.',
        keyTopics: ['REST Principles', 'Flask / FastAPI Routes', 'JSON Requests & Validation', 'JWT Authentication'],
        recommendedResources: ['Flask API Guide', 'Postman Documentation'],
        projectIdea: 'Restful E-commerce Backend API'
      },
      {
        stepNumber: 5,
        title: 'Version Control & Deployment',
        duration: '2 Weeks',
        description: 'Git branching strategy, GitHub workflows, environment variables, Docker basics, and Cloud deployment.',
        keyTopics: ['Git Commit, Push, Branch, Merge', 'Docker Containerization', 'Cloud Run / Render Deployment'],
        recommendedResources: ['Git Cheat Sheet', 'Docker Basics for Beginners'],
        projectIdea: 'Live Deployed API with Swagger Docs'
      }
    ]
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Web Developer Roadmap',
    description: 'Complete path from HTML/CSS layouts to modern React frontend and Node/Express/Flask backends with databases.',
    category: 'Web Development',
    estimatedTime: '5 - 6 Months',
    targetRole: 'Full Stack Web Engineer / Software Developer',
    iconName: 'Globe',
    steps: [
      {
        stepNumber: 1,
        title: 'HTML5, Modern CSS & Tailwind',
        duration: '3 Weeks',
        description: 'Semantic markup, Flexbox, Grid layouts, responsive typography, and Tailwind CSS utility classes.',
        keyTopics: ['Semantic HTML', 'CSS Flexbox & Grid', 'Responsive Breakpoints', 'Tailwind Utility Directives'],
        recommendedResources: ['Fullstack Web Course', 'Tailwind Docs'],
        projectIdea: 'Responsive Portfolio Website'
      },
      {
        stepNumber: 2,
        title: 'JavaScript ES6+ & DOM Manipulation',
        duration: '4 Weeks',
        description: 'Variables, Promises, Async/Await, DOM manipulation, Event listeners, LocalStorage, and Fetch API.',
        keyTopics: ['Arrow Functions & Destructuring', 'DOM Queries & Events', 'Promises & Fetch API', 'Array Methods (map, filter, reduce)'],
        recommendedResources: ['Modern JS Guide', 'JavaScript.info'],
        projectIdea: 'Interactive Task & Habit Tracker'
      },
      {
        stepNumber: 3,
        title: 'Frontend Framework: React.js',
        duration: '5 Weeks',
        description: 'JSX, Functional Components, State (useState), Effects (useEffect), Context API, and Routing.',
        keyTopics: ['React Component Lifecycle', 'Hooks', 'React Router DOM', 'State Management'],
        recommendedResources: ['React Documentation', 'React Component Guide'],
        projectIdea: 'Movie Database & Review Application'
      },
      {
        stepNumber: 4,
        title: 'Backend API Development & DBs',
        duration: '4 Weeks',
        description: 'Server creation using Node/Express or Express/Python, REST endpoint creation, MongoDB / SQL integration.',
        keyTopics: ['Express Server Routes', 'MongoDB / Mongoose / SQL', 'Middleware & Error Handling', 'Authentication & CORS'],
        recommendedResources: ['Fullstack Course Backend Module', 'REST API Best Practices'],
        projectIdea: 'Full Stack Collaborative Notes App'
      }
    ]
  },
  {
    id: 'software-engineer-placement',
    title: 'Software Engineer Placement Roadmap',
    description: 'Tailored 90-day fast-track path designed for 3rd and 4th year college students preparing for campus drives.',
    category: 'Placement',
    estimatedTime: '3 Months (90 Days)',
    targetRole: 'SDE-1 / Graduate Engineer Trainee (GET)',
    iconName: 'Target',
    steps: [
      {
        stepNumber: 1,
        title: 'Month 1: Aptitude & Language Mastery',
        duration: '30 Days',
        description: 'Master Quantitative Aptitude, Logical Reasoning, Speed Math, and solidify one coding language (C++, Java, or Python).',
        keyTopics: ['Percentages & Time-Work', 'Logical Puzzles & Syllogisms', 'Language Fundamentals', 'Arrays & Strings'],
        recommendedResources: ['Aptitude Masterclass', 'Company Prep Hub'],
        projectIdea: 'Daily 10 Aptitude + 2 Coding Problems Routine'
      },
      {
        stepNumber: 2,
        title: 'Month 2: Core DSA & CS Fundamentals',
        duration: '30 Days',
        description: 'Solve top 75 DSA questions (LinkedList, Trees, Searching, Sorting) and revise DBMS, OS, Networks concepts.',
        keyTopics: ['Linked List, Stack, Queue', 'Binary Trees & Traversals', 'SQL Joins & Normalization', 'OS Scheduling & Deadlocks'],
        recommendedResources: ['DSA Course', 'OS/CN Revision Notes'],
        projectIdea: 'Complete 30 Mock Technical MCQs'
      },
      {
        stepNumber: 3,
        title: 'Month 3: Company Patterns, Resume & Mock Tests',
        duration: '30 Days',
        description: 'Target specific company drives (TCS NQT, Infosys DSE, Accenture), build an ATS resume, and take timed mock tests.',
        keyTopics: ['TCS/Infosys Previous Papers', 'ATS Resume Format', 'HR Interview Preparation', 'Timed Mock Exams'],
        recommendedResources: ['Mock Tests Section', 'Resume & HR Course'],
        projectIdea: 'Build 1 Full Stack/Python Project for Resume'
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst Roadmap',
    description: 'Learn SQL querying, Python for data analysis (Pandas, NumPy), Excel shortcuts, and Data Visualization tools.',
    category: 'Data Science',
    estimatedTime: '3 - 4 Months',
    targetRole: 'Data Analyst / Business Intelligence Trainee',
    iconName: 'BarChart3',
    steps: [
      {
        stepNumber: 1,
        title: 'Advanced Excel & SQL Fundamentals',
        duration: '3 Weeks',
        description: 'Master VLOOKUP, INDEX/MATCH, Pivot Tables, and SQL SELECT, GROUP BY, HAVING, and Aggregations.',
        keyTopics: ['Pivot Tables & Charts', 'SQL SELECT & Aggregations', 'Joins & Subqueries', 'Data Cleaning'],
        recommendedResources: ['SQL Course', 'Excel Cheat Sheet'],
        projectIdea: 'Sales Performance Dashboard in Excel'
      },
      {
        stepNumber: 2,
        title: 'Python for Data Analysis (NumPy & Pandas)',
        duration: '4 Weeks',
        description: 'Learn NumPy arrays, Pandas DataFrames, handling missing values, filtering, grouping, and merging datasets.',
        keyTopics: ['NumPy Arrays & Math', 'Pandas DataFrame Operations', 'Data Wrangling & Cleaning', 'Handling Outliers'],
        recommendedResources: ['Python Mastery Module', 'Kaggle Datasets'],
        projectIdea: 'Exploratory Data Analysis (EDA) on IPL/COVID Dataset'
      },
      {
        stepNumber: 3,
        title: 'Data Visualization & Storytelling',
        duration: '3 Weeks',
        description: 'Build charts using Matplotlib, Seaborn, or PowerBI/Tableau to communicate business insights.',
        keyTopics: ['Bar, Line, Scatter, Heatmap', 'Dashboard Layout', 'PowerBI/Tableau Basics', 'Presenting Insights'],
        recommendedResources: ['Data Viz Cheatsheet', 'PowerBI Official Tutorials'],
        projectIdea: 'Interactive BI Dashboard Project'
      }
    ]
  }
];
