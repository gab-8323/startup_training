import { Blog } from '../types';

export const BLOGS_DATA: Blog[] = [
  {
    id: 'tcs-nqt-2026-preparation-guide',
    title: 'How to Crack TCS NQT & Prime Drive: Complete Preparation Blueprint',
    slug: 'tcs-nqt-2026-preparation-guide',
    category: 'Placement Preparation',
    author: {
      name: 'Dr. Rajesh Sharma',
      role: 'Head of Placement Training',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedDate: 'Aug 02, 2026',
    readTime: '6 min read',
    summary: 'Everything you need to know about the TCS National Qualifier Test pattern, numerical ability shortcuts, advanced coding problems, and technical interview tips.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    tags: ['TCS NQT', 'Placement Prep', 'Aptitude', 'Coding'],
    tableOfContents: [
      'TCS NQT Exam Structure & Cutoffs',
      'Cognitive Section Strategy',
      'Advanced Coding Section Problem Types',
      'Top 5 Python/C++ Tips for TCS Coding',
      'Interview Preparation Checklist'
    ],
    content: `
### TCS NQT Exam Structure & Cutoffs
TCS National Qualifier Test (NQT) is one of India's largest campus recruitment exams. It evaluates candidates across two primary stages: **Foundation Section** and **Advanced Section (for Digital / Prime Roles)**.

- **Numerical Ability**: 20 Questions | 25 Mins
- **Verbal Ability**: 25 Questions | 25 Mins
- **Reasoning Ability**: 20 Questions | 25 Mins
- **Advanced Quantitative & Reasoning**: 15 Questions | 25 Mins
- **Advanced Coding**: 2 Problems (1 Hands-on Easy/Medium + 1 Medium/Hard) | 60 Mins

### Cognitive Section Strategy
1. **Speed Math is Non-Negotiable**: Practice Vedic multiplication, square roots up to 30, and percentage-fraction conversions.
2. **Prioritize Time & Work and Profit & Loss**: At least 4 to 5 questions come directly from these topics.
3. **Accuracy > Speed**: TCS uses negative marking in certain advanced sections. Do not make wild guesses.

### Advanced Coding Section Problem Types
The coding section tests problem-solving using standard arrays, matrix operations, string manipulation, and hash sets:
- **Matrix Rotation / Spiral Traversal**
- **Array Subsegment Sums (Kadane's algorithm)**
- **String Anagrams and Pattern Matching**

### Top 5 Python/C++ Tips for TCS Coding
- In Python, use \`sys.stdin.read\` for fast I/O when handling large inputs.
- Handle edge cases: Empty arrays, negative inputs, and boundary values.
- Clean code formatting is scored alongside test case pass rates.
    `
  },
  {
    id: 'top-dsa-patterns-for-campus-interviews',
    title: 'Top 7 Data Structure Patterns Every College Student Must Master',
    slug: 'top-dsa-patterns-for-campus-interviews',
    category: 'DSA',
    author: {
      name: 'Ananya Verma',
      role: 'Senior Software Engineer @ Amazon',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    publishedDate: 'Jul 28, 2026',
    readTime: '8 min read',
    summary: 'Instead of solving 500+ random LeetCode questions, master these 7 essential DSA patterns that appear in 90% of technical interview coding rounds.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: ['DSA', 'Algorithms', 'Interview Tips', 'LeetCode'],
    tableOfContents: [
      '1. Two Pointers Pattern',
      '2. Sliding Window Pattern',
      '3. Fast & Slow Pointers (Floyds Cycle)',
      '4. Monotonic Stack',
      '5. Breadth-First Search (BFS) vs DFS',
      '6. Binary Search on Answer Space',
      '7. Dynamic Programming: 0/1 Knapsack'
    ],
    content: `
### Why Patterns Beat Memorization
Many students get overwhelmed trying to solve 500+ problems. However, interviewers from companies like Infosys DSE, Deloitte, and Amazon evaluate your pattern recognition ability.

### 1. Two Pointers Pattern
Used primarily when searching for pairs in sorted arrays or reversing sequences.
- *Classic Problems*: Two Sum II, Container With Most Water, 3Sum.

### 2. Sliding Window Pattern
Ideal for sub-array or substring problems involving maximum sum, min length, or distinct character constraints.
- *Classic Problems*: Maximum Subarray of Size K, Longest Substring Without Repeating Characters.

### 3. Fast & Slow Pointers (Floyd's Cycle)
Determines cycles in Linked Lists or Array sequences without using extra memory space.
- *Classic Problems*: Linked List Cycle, Middle of Linked List, Happy Number.
    `
  },
  {
    id: 'ats-resume-guide-for-freshers',
    title: 'How to Build an ATS 90+ Score Resume as a Fresher (Free Templates Included)',
    slug: 'ats-resume-guide-for-freshers',
    category: 'Resume',
    author: {
      name: 'Priya Sundaram',
      role: 'Career Coach & Ex-Recruiter',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    publishedDate: 'Jul 15, 2026',
    readTime: '5 min read',
    summary: 'Learn how Applicant Tracking Systems (ATS) scan college freshers resumes, and how to format your projects, skills, and education for maximum interview calls.',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    tags: ['Resume', 'Career Tips', 'LinkedIn', 'Freshers'],
    tableOfContents: [
      'Understanding ATS Parsing Rules',
      'Single-Column vs Multi-Column Layouts',
      'The XYZ Action Verb Formula for Projects',
      'Essential Keywords for Software Roles',
      'Download ATS Resume Format'
    ],
    content: `
### Understanding ATS Parsing Rules
Over 80% of Fortune 500 companies use ATS tools (like Workday, Greenhouse, Taleo) to filter resumes before a human recruiter even views them.

- **Avoid Graphics and Tables**: Tables and multi-column designs frequently scramble text inside ATS parsers.
- **Use Standard Font**: Sticky to Arial, Calibri, or Inter.
- **Keep File Name Clean**: Use \`Firstname_Lastname_Resume.pdf\`.

### The XYZ Action Verb Formula for Projects
Structure every project bullet point using Google's XYZ formula:
> *"Accomplished [X] as measured by [Y], by doing [Z]"*

Example: *"Developed a full-stack e-commerce API that reduced query latency by 35% through SQL query optimization and indexing."*
    `
  }
];
