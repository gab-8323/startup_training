import { CompanyPrep } from '../types';

export const COMPANY_PREP_DATA: CompanyPrep[] = [
  {
    id: 'tcs',
    companyName: 'TCS (Tata Consultancy Services)',
    logoText: 'TCS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    accentColor: 'from-blue-600 to-indigo-700',
    overview: 'TCS hires freshers primarily through TCS NQT (National Qualifier Test) for Ninja, Digital, and Prime roles with CTC ranging from 3.36 LPA to 9.0 LPA.',
    selectionProcess: [
      { stage: 1, name: 'TCS NQT Online Cognitive Test', description: 'Tests Numerical Ability, Verbal Ability, and Reasoning Ability.' },
      { stage: 2, name: 'Advanced Cognitive & Coding Round', description: 'For Digital and Prime role upgrades. 2 coding problems in 60 mins.' },
      { stage: 3, name: 'Technical Interview', description: 'Focuses on your final year project, basic DSA, Python/Java, DBMS, and OS.' },
      { stage: 4, name: 'HR & Managerial Interview', description: 'Evaluates communication skills, willingness to relocate, and shift flexibilities.' }
    ],
    codingPattern: [
      { topic: 'Arrays & Strings', frequency: 'High (85%)', sampleQuestion: 'Find maximum sum subarray or rotate matrix 90 degrees in-place.' },
      { topic: 'Math & Number Theory', frequency: 'Medium (60%)', sampleQuestion: 'Check prime factors or generate Fibonnaci variations with conditions.' },
      { topic: 'Strings & Hashes', frequency: 'High (75%)', sampleQuestion: 'Check for anagrams or longest non-repeating character substring.' }
    ],
    aptitudePattern: [
      { section: 'Numerical Ability', numQuestions: '20 Questions', duration: '25 Minutes' },
      { section: 'Reasoning Ability', numQuestions: '20 Questions', duration: '25 Minutes' },
      { section: 'Verbal Ability', numQuestions: '25 Questions', duration: '25 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'Explain the difference between primary key, unique key, and candidate key in DBMS.', round: 'Technical Round', answerSummary: 'Primary key cannot be NULL and is unique per table. Unique key permits one NULL. Candidate keys are all minimal sets of attributes capable of uniquely identifying tuples.' },
      { question: 'What is Kadane’s Algorithm and what is its time complexity?', round: 'Technical Round', answerSummary: 'Kadane algorithm finds the maximum contiguous subarray sum in O(N) time complexity by maintaining current running max and overall max.' }
    ],
    resources: ['TCS NQT PDF Question Bank', 'TCS Coding Cheat Sheet', 'TCS Mock Test']
  },
  {
    id: 'infosys',
    companyName: 'Infosys',
    logoText: 'INFOSYS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    accentColor: 'from-sky-600 to-cyan-700',
    overview: 'Infosys conducts drives for System Engineer (SE), Specialist Programmer (SP), and Digital Specialist Engineer (DSE) roles.',
    selectionProcess: [
      { stage: 1, name: 'Online Test (Reasoning, Mathematical, Verbal, Pseudo-code, Puzzle Solving)', description: 'Adaptive or timed section test.' },
      { stage: 2, name: 'HackWithInfy / Hackathon (For SP/DSE)', description: '3 competitive programming problems of medium to hard difficulty.' },
      { stage: 3, name: 'Technical + HR Interview', description: 'Comprehensive single or dual interview evaluating projects and core CS.' }
    ],
    codingPattern: [
      { topic: 'Dynamic Programming', frequency: 'High (70%)', sampleQuestion: '0/1 Knapsack or Coin Change variations.' },
      { topic: 'Graph Traversals (BFS/DFS)', frequency: 'Medium (55%)', sampleQuestion: 'Shortest path or connected components count.' }
    ],
    aptitudePattern: [
      { section: 'Mathematical Ability', numQuestions: '10 Questions', duration: '35 Minutes' },
      { section: 'Reasoning Ability', numQuestions: '15 Questions', duration: '25 Minutes' },
      { section: 'Verbal Ability', numQuestions: '20 Questions', duration: '20 Minutes' },
      { section: 'Pseudo-code & Puzzles', numQuestions: '9 Questions', duration: '20 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'Explain OOPs 4 pillars with real-world examples.', round: 'Technical Interview', answerSummary: 'Encapsulation (capsule data+methods), Abstraction (hiding implementation like car dashboard), Inheritance (parent-child features), Polymorphism (method overriding/overloading).' }
    ],
    resources: ['Infosys Pseudo-code Guide', 'Infosys HackWithInfy Questions', 'Infosys Mock Exam']
  },
  {
    id: 'accenture',
    companyName: 'Accenture',
    logoText: 'ACCENTURE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    accentColor: 'from-purple-600 to-indigo-800',
    overview: 'Accenture recruits for Associate Software Engineer (ASE) and Advanced ASE roles through cognitive, technical, coding, and communication rounds.',
    selectionProcess: [
      { stage: 1, name: 'Cognitive & Technical Assessment', description: 'English Ability, Critical Reasoning, Abstract Reasoning, Common Applications, MS Office, Pseudo Code.' },
      { stage: 2, name: 'Coding Assessment', description: 'Mandatory round right after clearing Cognitive. 2 coding problems in 45 mins.' },
      { stage: 3, name: 'Communication Assessment', description: 'Automated AI voice round checking fluency, pronunciation, and listening.' },
      { stage: 4, name: 'Technical & HR Interview', description: 'Project overview and situational behavioral questions.' }
    ],
    codingPattern: [
      { topic: 'Array Manipulations', frequency: 'High (90%)', sampleQuestion: 'Count pairs with given sum or replace elements with next greatest.' },
      { topic: 'String Conversions', frequency: 'High (80%)', sampleQuestion: 'Bitwise operations on string binary representation.' }
    ],
    aptitudePattern: [
      { section: 'Cognitive & Critical Reasoning', numQuestions: '50 Questions', duration: '50 Minutes' },
      { section: 'Technical & Pseudo-code', numQuestions: '40 Questions', duration: '40 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'Tell me about a challenge you faced during your team project and how you solved it.', round: 'HR Round', answerSummary: 'Use STAR method (Situation, Task, Action, Result) showcasing leadership, problem solving, and conflict resolution.' }
    ],
    resources: ['Accenture Pseudo Code PDF', 'Accenture Communication Test Tips']
  },
  {
    id: 'capgemini',
    companyName: 'Capgemini',
    logoText: 'CAPGEMINI',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg',
    accentColor: 'from-blue-500 to-teal-600',
    overview: 'Capgemini hires for Analyst and Senior Analyst roles with gamified aptitude tests and domain-specific coding.',
    selectionProcess: [
      { stage: 1, name: 'Technical Test & Pseudocode', description: 'Data structures, C/C++/Java/Python fundamentals.' },
      { stage: 2, name: 'Gamified Aptitude Test', description: '4-5 mini games testing spatial memory, grid challenge, and deductive logic.' },
      { stage: 3, name: 'Behavioral Competency (Essay Writing)', description: 'Evaluating written communication skills.' },
      { stage: 4, name: 'Technical + HR Interview', description: 'Technical questions on core subjects and final year projects.' }
    ],
    codingPattern: [
      { topic: 'Basic String & Loop Logic', frequency: 'High (85%)', sampleQuestion: 'Palindrome check, Fibonacci series, Prime in range.' }
    ],
    aptitudePattern: [
      { section: 'Pseudocode Assessment', numQuestions: '30 Questions', duration: '30 Minutes' },
      { section: 'Gamified Logic Games', numQuestions: '4 Games', duration: '24 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'What is the difference between process and thread in OS?', round: 'Technical Interview', answerSummary: 'A process is an independent program execution with its own memory space. A thread is a lightweight unit of execution within a process sharing memory.' }
    ],
    resources: ['Capgemini Gamified Prep Guide', 'Capgemini Pseudocode Set']
  },
  {
    id: 'cognizant',
    companyName: 'Cognizant (CTS)',
    logoText: 'CTS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg',
    accentColor: 'from-blue-700 to-slate-900',
    overview: 'Cognizant offers GenC, GenC Elevate, and GenC Next roles depending on coding proficiency in their campus assessments.',
    selectionProcess: [
      { stage: 1, name: 'GenC Communication & Aptitude', description: 'Verbal, Quantitative, and Analytical reasoning.' },
      { stage: 2, name: 'GenC Elevate / Next Coding Assessment', description: '2-3 Medium complexity algorithmic problems.' },
      { stage: 3, name: 'Technical & HR Discussion', description: 'Database queries, OOPs concepts, project demo.' }
    ],
    codingPattern: [
      { topic: 'Recursion & Sorting', frequency: 'High (75%)', sampleQuestion: 'Merge Sort implementation or Recursive string reverse.' }
    ],
    aptitudePattern: [
      { section: 'Quantitative & Analytical', numQuestions: '25 Questions', duration: '30 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'Write a SQL query to find the 2nd highest salary from an Employee table.', round: 'Technical Round', answerSummary: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);' }
    ],
    resources: ['Cognizant GenC Elevate Kit', 'Cognizant SQL Question Bank']
  },
  {
    id: 'deloitte',
    companyName: 'Deloitte',
    logoText: 'DELOITTE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg',
    accentColor: 'from-emerald-600 to-teal-800',
    overview: 'Deloitte conducts recruitment for Analyst / Technology Consultant roles focusing on logical analytical skills, business acumen, and tech fundamentals.',
    selectionProcess: [
      { stage: 1, name: 'Online Aptitude & Logical Test', description: 'Quant, Verbal, Logical, and Data Interpretation.' },
      { stage: 2, name: 'Group Discussion (GD) or Case Study', description: 'Analyzes communication, articulation, and problem solving.' },
      { stage: 3, name: 'Technical & Managerial Interview', description: 'System design basics, database queries, and situational questions.' }
    ],
    codingPattern: [
      { topic: 'SQL & Data Wrangling', frequency: 'High (90%)', sampleQuestion: 'Multi-table join queries and data aggregation.' }
    ],
    aptitudePattern: [
      { section: 'Quant & DI', numQuestions: '20 Questions', duration: '25 Minutes' },
      { section: 'Logical & Caselet', numQuestions: '15 Questions', duration: '20 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'How would you design a database for an Online Food Delivery platform like Swiggy/Zomato?', round: 'Technical Managerial', answerSummary: 'Detail entities: Users, Restaurants, MenuItems, Orders, OrderItems, DeliveryPartners, Payments with primary/foreign keys.' }
    ],
    resources: ['Deloitte Case Study Preparation Guide', 'Deloitte SQL Mastery']
  },
  {
    id: 'amazon',
    companyName: 'Amazon',
    logoText: 'AMAZON',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    accentColor: 'from-amber-500 to-orange-600',
    overview: 'Amazon recruits SDE-1 through campus hiring drives, Amazon WOW, and HackOn contests emphasizing Leadership Principles and Data Structures.',
    selectionProcess: [
      { stage: 1, name: 'Online Assessment (OA)', description: '2 Coding questions (60 mins) + Work Simulation & Behavioral Survey.' },
      { stage: 2, name: 'Technical Interview Round 1', description: 'DSA, Trees, Graphs, Dynamic Programming & Leadership Principles.' },
      { stage: 3, name: 'Technical Interview Round 2', description: 'System Design basics, Object Oriented Design & Leadership Principles.' },
      { stage: 4, name: 'Bar Raiser Round', description: 'Deep dive into projects, problem solving under pressure, and LP values.' }
    ],
    codingPattern: [
      { topic: 'Trees & Graphs', frequency: 'High (95%)', sampleQuestion: 'Lowest Common Ancestor or Course Schedule topological sort.' },
      { topic: 'Sliding Window & Hashmaps', frequency: 'High (90%)', sampleQuestion: 'Longest Substring without repeating characters.' }
    ],
    aptitudePattern: [
      { section: 'Work Simulation & Logic', numQuestions: 'Scenario Based', duration: '60 Minutes' }
    ],
    recentInterviewQuestions: [
      { question: 'Give an example of a time when you showed Customer Obsession or Bias for Action in a team project.', round: 'Bar Raiser', answerSummary: 'Use STAR format detailing how you prioritized user feedback or took initiative to fix a critical bug fast.' }
    ],
    resources: ['Amazon SDE-1 Master Guide', 'Amazon Leadership Principles PDF']
  },
  {
    id: 'google',
    companyName: 'Google',
    logoText: 'GOOGLE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    accentColor: 'from-blue-500 via-red-500 to-yellow-500',
    overview: 'Google hires University Graduates and Interns (STEP & Software Engineering) focused on core algorithmic problem solving.',
    selectionProcess: [
      { stage: 1, name: 'Online Challenge (Google Kickstart / Girl Hackathon / OA)', description: '2-3 Hard algorithmic problems.' },
      { stage: 2, name: 'Technical Phone Screen', description: '45-minute live coding with Google engineer in Google Docs/CoderPad.' },
      { stage: 3, name: 'Onsite / Final Coding Rounds', description: '3-4 algorithmic coding rounds + 1 Googliness & Leadership round.' }
    ],
    codingPattern: [
      { topic: 'Graphs & Dynamic Programming', frequency: 'High (98%)', sampleQuestion: 'Word Ladder, Dijkstra shortest path, matrix DP.' }
    ],
    aptitudePattern: [
      { section: 'Algorithmic Problem Solving', numQuestions: 'Coding', duration: '45 Minutes per round' }
    ],
    recentInterviewQuestions: [
      { question: 'Design an efficient data structure for LRU (Least Recently Used) Cache with O(1) get and put operations.', round: 'Technical Coding', answerSummary: 'Combine a HashMap for O(1) key lookup with a Doubly Linked List to track usage order and perform O(1) removals/insertions.' }
    ],
    resources: ['Google Coding Interview Blueprint', 'Googliness Preparation Questions']
  }
];
