import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'python-mastery',
    title: 'Python Programming Masterclass',
    category: 'Programming',
    description: 'Master Python from absolute basics to advanced OOP, file handling, and real-world project development tailored for college exams and campus placement coding rounds.',
    duration: '6 Weeks',
    level: 'Beginner',
    rating: 4.9,
    studentsEnrolled: 8450,
    iconName: 'Code2',
    badge: 'Bestseller',
    prerequisites: ['No prior programming experience required', 'Basic computer literacy'],
    learningOutcomes: [
      'Write clean, efficient Python scripts for problem-solving',
      'Understand Data Structures in Python (Lists, Sets, Dicts, Tuples)',
      'Apply Object-Oriented Programming (OOP) principles effectively',
      'Solve company-level coding problems in Python',
      'Build a mini Python automation project'
    ],
    syllabus: [
      {
        title: 'Module 1: Language Fundamentals & Control Flow',
        duration: '1 Week',
        topics: ['Variables, Data Types & Operators', 'Conditional Statements (if-else)', 'Loops (for, while, range)', 'Input/Output formatting']
      },
      {
        title: 'Module 2: Data Structures & Built-in Methods',
        duration: '1.5 Weeks',
        topics: ['List Operations & Comprehensions', 'Tuples & Sets', 'Dictionaries & Hash Maps', 'String Manipulation & Slicing']
      },
      {
        title: 'Module 3: Functions, Modules & Exceptions',
        duration: '1 Week',
        topics: ['Function definition & arguments', 'Lambda, Map, Filter, Reduce', 'Modules & Imports', 'Exception Handling (try-except-finally)']
      },
      {
        title: 'Module 4: Object-Oriented Programming (OOP)',
        duration: '1.5 Weeks',
        topics: ['Classes, Objects & Constructors', 'Inheritance & Polymorphism', 'Encapsulation & Abstraction', 'Dunder Methods & Decorators']
      },
      {
        title: 'Module 5: File I/O & Placement Problem Solving',
        duration: '1 Week',
        topics: ['Reading/Writing Files (txt, csv, json)', 'TCS & Infosys Python Coding Pattern', 'Mini Project: Automated Resume Keyword Matcher']
      }
    ],
    faq: [
      { question: 'Is Python accepted in all campus placement coding tests?', answer: 'Yes! TCS, Infosys, Accenture, Cognizant, and product companies allow Python 3 in their coding rounds.' },
      { question: 'Do I get practice problems with this course?', answer: 'Yes, each module contains 15+ curated practice problems with automated test case evaluation.' }
    ]
  },
  {
    id: 'dsa-java-cpp',
    title: 'Data Structures & Algorithms (Java / C++)',
    category: 'Core CS',
    description: 'Comprehensive DSA course covering Array manipulation, LinkedLists, Trees, Graphs, Dynamic Programming, and algorithmic optimization techniques for product and service MNCs.',
    duration: '10 Weeks',
    level: 'Intermediate',
    rating: 4.95,
    studentsEnrolled: 12200,
    iconName: 'Cpu',
    badge: 'Placement Core',
    prerequisites: ['Basic knowledge of C++, Java, or C programming', 'Understanding of loops and functions'],
    learningOutcomes: [
      'Master Time and Space Complexity analysis (Big-O)',
      'Implement Linear and Non-Linear Data Structures from scratch',
      'Solve 150+ LeetCode & GeeksforGeeks placement questions',
      'Crack technical interview rounds at Amazon, TCS Prime, and Cognizant GenC Next',
      'Master Recursion, Backtracking, and Dynamic Programming'
    ],
    syllabus: [
      {
        title: 'Module 1: Analysis of Algorithms & Math Fundamentals',
        duration: '1 Week',
        topics: ['Big-O, Omega, Theta notation', 'Space Complexity', 'Bit Manipulation Basics', 'Euclidean Algorithm & Prime Factorization']
      },
      {
        title: 'Module 2: Arrays, Strings & Two Pointers',
        duration: '2 Weeks',
        topics: ['Kadane Algorithm', 'Sliding Window Technique', 'Two Pointers Pattern', 'Matrix Operations & In-place algorithms']
      },
      {
        title: 'Module 3: Stack, Queue & Linked List',
        duration: '2 Weeks',
        topics: ['Single & Double Linked List Operations', 'Stack using Array & LL', 'Queue & Circular Queue', 'Next Greater Element & LRU Cache concept']
      },
      {
        title: 'Module 4: Trees & Graphs',
        duration: '2.5 Weeks',
        topics: ['Binary Trees & Binary Search Trees (BST)', 'Tree Traversals (Inorder, Preorder, Postorder, BFS)', 'Graph Representations', 'BFS, DFS, Dijkstra, Topo Sort']
      },
      {
        title: 'Module 5: Dynamic Programming & Greedy',
        duration: '2.5 Weeks',
        topics: ['0/1 Knapsack Problem', 'Longest Common Subsequence (LCS)', 'Coin Change Problem', 'Greedy Choice Property']
      }
    ],
    faq: [
      { question: 'Which language should I choose between C++ and Java?', answer: 'Both are industry standards. We provide code implementations and explanations in both C++ and Java side-by-side.' }
    ]
  },
  {
    id: 'sql-dbms-mastery',
    title: 'SQL & DBMS for Campus Interviews',
    category: 'Core CS',
    description: 'Learn Relational Database Design, ER Diagrams, Normalization, Complex SQL Queries, Joins, Subqueries, Indexing, and Transactions for technical interviews.',
    duration: '4 Weeks',
    level: 'Beginner',
    rating: 4.85,
    studentsEnrolled: 9100,
    iconName: 'Database',
    badge: 'High Demand',
    prerequisites: ['No prior database experience required'],
    learningOutcomes: [
      'Write complex SQL queries involving Joins, Aggregations, and Subqueries',
      'Design normalized databases up to 3NF & BCNF',
      'Understand ACID properties, Transactions, and Concurrency',
      'Solve top 50 SQL interview questions asked by Deloitte, Accenture, and IBM'
    ],
    syllabus: [
      {
        title: 'Module 1: Relational Concepts & ER Modeling',
        duration: '1 Week',
        topics: ['DBMS vs File System', 'ER Diagram Components', 'Relational Model & Primary/Foreign Keys']
      },
      {
        title: 'Module 2: SQL Basics to Advanced Queries',
        duration: '1.5 Weeks',
        topics: ['SELECT, WHERE, ORDER BY, GROUP BY, HAVING', 'INNER, LEFT, RIGHT, FULL OUTER JOINs', 'Subqueries & Nested Queries', 'Aggregate Functions & Windows Functions']
      },
      {
        title: 'Module 3: Normalization & Indexing',
        duration: '1 Week',
        topics: ['1NF, 2NF, 3NF, BCNF Normalization', 'Functional Dependencies', 'B-Tree Indexing and Query Performance']
      },
      {
        title: 'Module 4: Transactions & Interview Questions',
        duration: '0.5 Weeks',
        topics: ['ACID Properties', 'Locks & Deadlocks', 'Top 50 Placement SQL Questions Practice']
      }
    ],
    faq: [
      { question: 'Will this prepare me for SQL coding rounds?', answer: 'Yes! Includes 40+ interactive SQL query practice tasks with instant validation.' }
    ]
  },
  {
    id: 'fullstack-web-dev',
    title: 'Full Stack Web Development (MERN / Python)',
    category: 'Web Dev',
    description: 'Build modern, responsive full-stack web applications with HTML, CSS, JavaScript, React, Node/Express/Flask, and MongoDB to boost your resume.',
    duration: '8 Weeks',
    level: 'All Levels',
    rating: 4.9,
    studentsEnrolled: 6800,
    iconName: 'Globe',
    prerequisites: ['Basic computer knowledge'],
    learningOutcomes: [
      'Construct beautiful responsive UI with modern CSS & Tailwind',
      'Master JavaScript ES6+ asynchronous programming',
      'Build dynamic React frontend single-page apps',
      'Create RESTful API backends with Express/Flask',
      'Deploy full-stack projects to GitHub and Cloud Run/Vercel'
    ],
    syllabus: [
      {
        title: 'Module 1: Responsive Frontend Foundations',
        duration: '2 Weeks',
        topics: ['HTML5 Semantic Elements', 'CSS Flexbox & Grid', 'Tailwind CSS Utility Styling', 'Responsive Design Best Practices']
      },
      {
        title: 'Module 2: Modern JavaScript (ES6+)',
        duration: '2 Weeks',
        topics: ['DOM Manipulation', 'Arrow Functions, Promises & Async/Await', 'Fetch API & LocalStorage', 'JS Event Loop']
      },
      {
        title: 'Module 3: React.js Component Architecture',
        duration: '2 Weeks',
        topics: ['JSX & Components', 'Props & State Management', 'Hooks (useState, useEffect)', 'Routing & Context API']
      },
      {
        title: 'Module 4: Backend APIs & Project Deployment',
        duration: '2 Weeks',
        topics: ['REST API Principles', 'Node.js/Express or Flask Setup', 'Database Connection & CRUD Operations', 'Deploying live resume project']
      }
    ],
    faq: [
      { question: 'Will I get project ideas for my college final year?', answer: 'Yes! You will build 3 complete industry-grade projects suitable for college submissions.' }
    ]
  },
  {
    id: 'os-cn-core-cs',
    title: 'Operating Systems & Computer Networks',
    category: 'Core CS',
    description: 'Crack core CS interview rounds with in-depth knowledge of Process Scheduling, Memory Management, TCP/IP Suite, OSI Model, Routing, and Security.',
    duration: '4 Weeks',
    level: 'Intermediate',
    rating: 4.88,
    studentsEnrolled: 7400,
    iconName: 'Network',
    prerequisites: ['Basic understanding of computer architecture'],
    learningOutcomes: [
      'Master Process Scheduling algorithms (CPU Scheduling)',
      'Understand Deadlocks, Synchronization & Mutex/Semaphores',
      'Explain OSI 7-Layer & TCP/IP 4-Layer Architecture effortlessly',
      'Answer core CS viva & technical interview questions confidently'
    ],
    syllabus: [
      {
        title: 'Module 1: Operating System Fundamentals',
        duration: '1 Week',
        topics: ['Processes vs Threads', 'Process State Diagram', 'CPU Scheduling (FCFS, SJF, Round Robin, Priority)']
      },
      {
        title: 'Module 2: Synchronization & Memory Management',
        duration: '1 Week',
        topics: ['Critical Section Problem', 'Semaphores & Mutex', 'Deadlock Detection & Prevention (Banker Algorithm)', 'Paging, Segmentation & Virtual Memory']
      },
      {
        title: 'Module 3: Computer Networks OSI & TCP/IP',
        duration: '1 Week',
        topics: ['OSI vs TCP/IP Layers', 'IP Addressing & Subnetting', 'TCP 3-Way Handshake vs UDP', 'HTTP vs HTTPS, DNS, DHCP']
      },
      {
        title: 'Module 4: Network Security & Interview Prep',
        duration: '1 Week',
        topics: ['Symmetric & Asymmetric Encryption', 'Firewalls & VPNs', 'Top 100 Core CS Interview MCQs']
      }
    ],
    faq: [
      { question: 'Is this course useful for GATE and MNC placements?', answer: 'Absolutely! It covers the common syllabus for both GATE CS and MNC technical interviews.' }
    ]
  },
  {
    id: 'aptitude-reasoning-placement',
    title: 'Quantitative Aptitude & Logical Reasoning',
    category: 'Aptitude',
    description: 'Comprehensive aptitude shortcut techniques, speed math, logical puzzles, and verbal reasoning designed for TCS NQT, Infosys, Accenture, and Deloitte tests.',
    duration: '5 Weeks',
    level: 'All Levels',
    rating: 4.92,
    studentsEnrolled: 15400,
    iconName: 'Calculator',
    badge: 'Must Have',
    prerequisites: ['High school basic math'],
    learningOutcomes: [
      'Solve math problems 3x faster using shortcut mental math tricks',
      'Master Time & Work, Speed Distance, Profit & Loss, Percentages',
      'Crack tricky logical puzzles, Syllogisms, and Blood Relations',
      'Clear initial elimination rounds of all top campus recruitment drives'
    ],
    syllabus: [
      {
        title: 'Module 1: Speed Math & Quantitative Aptitude I',
        duration: '1.5 Weeks',
        topics: ['Vedic Math & Calculation Speed', 'Number System & Divisibility Rules', 'Percentages, Profit & Loss, Simple & Compound Interest']
      },
      {
        title: 'Module 2: Quantitative Aptitude II',
        duration: '1.5 Weeks',
        topics: ['Time & Work, Pipes & Cisterns', 'Time, Speed & Distance, Trains, Boats', 'Permutations, Combinations & Probability']
      },
      {
        title: 'Module 3: Logical Reasoning',
        duration: '1 Week',
        topics: ['Coding-Decoding, Series', 'Blood Relations, Direction Sense', 'Seating Arrangements & Puzzles', 'Syllogisms & Clocks/Calendars']
      },
      {
        title: 'Module 4: Verbal Ability & Data Interpretation',
        duration: '1 Week',
        topics: ['Reading Comprehension Tricks', 'Sentence Correction & Grammar Rules', 'Bar Graphs, Pie Charts, Table Interpretation']
      }
    ],
    faq: [
      { question: 'Does this course cover company specific patterns?', answer: 'Yes! TCS NQT, Infosys, Accenture, Cognizant, and Capgemini aptitude patterns are specifically mapped.' }
    ]
  },
  {
    id: 'resume-linkedin-interview-prep',
    title: 'Resume Building, LinkedIn & HR Interview Prep',
    category: 'Placement',
    description: 'Transform your career profile with ATS-friendly resume templates, recruiter-grabbing LinkedIn strategies, mock HR interviews, and soft skills training.',
    duration: '2 Weeks',
    level: 'All Levels',
    rating: 4.97,
    studentsEnrolled: 11300,
    iconName: 'FileCheck',
    badge: 'Career Boost',
    prerequisites: ['College student or recent graduate'],
    learningOutcomes: [
      'Create an ATS 90+ score single-page software engineer resume',
      'Optimize LinkedIn profile to get inbound recruiter messages',
      'Master the STAR method for behavioral & HR interview questions',
      'Answer "Tell me about yourself", "Strengths/Weaknesses", and "5 Year Goal"'
    ],
    syllabus: [
      {
        title: 'Module 1: ATS Resume Blueprint',
        duration: '0.5 Weeks',
        topics: ['ATS Parsing Logic', 'Project Description Formulas', 'Action Verbs & Impact Metrics', 'Resume Formatting Dos & Donts']
      },
      {
        title: 'Module 2: LinkedIn Optimization & Networking',
        duration: '0.5 Weeks',
        topics: ['Headline & About Section Strategy', 'Featured Projects & Certifications', 'Reaching out to HRs & Alumni for Referrals']
      },
      {
        title: 'Module 3: Technical & Behavioral HR Interviews',
        duration: '1 Week',
        topics: ['STAR Method Framework', 'Managing Stress & Gap Explanation', 'Salary Negotiation for Freshers', 'Mock Interview Recordings']
      }
    ],
    faq: [
      { question: 'Do I get resume review feedback?', answer: 'Yes, we provide downloadable ATS resume templates and self-review checklists.' }
    ]
  }
];
