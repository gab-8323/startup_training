import { Workshop } from '../types';

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'ws-tcs-prime-bootcamp',
    title: '3-Day TCS NQT & Prime Live Coding Bootcamp',
    description: 'Intensive live hands-on coding workshop covering advanced array manipulation, matrix algorithms, and speed aptitude solving tactics.',
    date: 'August 15 - 17, 2026',
    time: '6:00 PM - 8:30 PM IST',
    mode: 'Live Online',
    speaker: {
      name: 'Vikramaditya Roy',
      designation: 'Ex-TCS Lead Consultant & Coding Mentor',
      company: 'Campus2Career Academy',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    topicsCovered: [
      'TCS NQT Advanced Coding Patterns',
      'Cognitive Section Elimination Tricks',
      'Live Mock Coding Test Evaluation',
      'Q&A & Resume Feedback'
    ],
    isUpcoming: true,
    registrationOpen: true
  },
  {
    id: 'ws-ai-tools-for-developers',
    title: 'Generative AI & Copilot Tools for Engineering Students',
    description: 'Learn how to leverage AI tools (GitHub Copilot, Gemini CLI, Claude) ethically for faster coding, debugging, and building impressive final year projects.',
    date: 'August 22, 2026',
    time: '10:00 AM - 1:00 PM IST',
    mode: 'Live Online',
    speaker: {
      name: 'Rohan Deshmukh',
      designation: 'Senior AI Solutions Architect',
      company: 'Tech Innovations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    topicsCovered: [
      'Prompt Engineering for Code Generation',
      'Debugging & Refactoring with Gemini',
      'Building an AI-powered Web App in 2 hours',
      'AI Portfolio Best Practices'
    ],
    isUpcoming: true,
    registrationOpen: true
  },
  {
    id: 'ws-resume-linkedin-masterclass',
    title: 'College-to-Corporate: Resume & LinkedIn Masterclass',
    description: 'Transform your LinkedIn profile to land off-campus interview calls and build an ATS 90+ score resume.',
    date: 'July 10, 2026',
    time: '5:00 PM - 7:00 PM IST',
    mode: 'College Campus',
    speaker: {
      name: 'Priya Sundaram',
      designation: 'Career Coach',
      company: 'Campus2Career',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    topicsCovered: [
      'ATS Parsing Secrets',
      'Cold Emailing HRs on LinkedIn',
      'Off-Campus Referral Strategy'
    ],
    isUpcoming: false,
    registrationOpen: false
  }
];
