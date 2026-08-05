export type ViewState = 
  | 'home'
  | 'about'
  | 'courses'
  | 'course-detail'
  | 'roadmaps'
  | 'coding'
  | 'coding-detail'
  | 'aptitude'
  | 'mock-tests'
  | 'mock-test-runner'
  | 'blogs'
  | 'blog-detail'
  | 'resources'
  | 'workshops'
  | 'company-prep'
  | 'contact'
  | 'admin';

export interface CourseSyllabusModule {
  title: string;
  duration: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  category: string; // e.g. 'Programming', 'Core CS', 'Web Dev', 'Placement', 'Aptitude'
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  rating: number;
  studentsEnrolled: number;
  iconName: string;
  badge?: string;
  prerequisites: string[];
  learningOutcomes: string[];
  syllabus: CourseSyllabusModule[];
  faq: { question: string; answer: string }[];
}

export interface RoadmapStep {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  keyTopics: string[];
  recommendedResources: string[];
  projectIdea?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  targetRole: string;
  iconName: string;
  steps: RoadmapStep[];
}

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodeSnippet {
  language: 'python' | 'cpp' | 'java' | 'javascript';
  code: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  category: string; // e.g., 'Arrays', 'Strings', 'Trees', 'Dynamic Programming'
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTags: string[]; // e.g., 'TCS', 'Infosys', 'Amazon', 'Google'
  acceptanceRate: string;
  problemStatement: string;
  constraints: string[];
  sampleCases: TestCase[];
  hiddenTestCases?: TestCase[];
  editorial: string;
  snippets: CodeSnippet[];
}

export interface AptitudeQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AptitudeTopic {
  id: string;
  title: string;
  category: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability' | 'Data Interpretation';
  iconName: string;
  formulaeSummary?: string[];
  questions: AptitudeQuestion[];
}

export interface TestQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface MockTest {
  id: string;
  title: string;
  category: 'Coding' | 'Aptitude' | 'Technical MCQs' | 'Company Specific';
  subcategory: string; // e.g., 'Python', 'SQL', 'TCS NQT', 'Full Placement'
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
  questions: TestQuestion[];
}

export interface TestResult {
  testId: string;
  testTitle: string;
  score: number;
  totalScore: number;
  accuracy: number;
  timeSpentSeconds: number;
  passed: boolean;
  answers: { [questionId: string]: number }; // user selected option index
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  summary: string;
  coverImage: string;
  content: string; // Markdown or rich text
  tableOfContents: string[];
  tags: string[];
  featured?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Notes' | 'Cheat Sheets' | 'Interview Questions' | 'Resume Templates' | 'Placement PDFs' | 'Practice Sheets' | 'Project Templates';
  subject: string;
  fileSize: string;
  fileType: string; // PDF, ZIP, DOCX
  downloadsCount: number;
  description: string;
  downloadUrl?: string;
  previewUrl?: string;
  tags?: string[];
  features?: string[];
  rating?: number;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  mode: 'Live Online' | 'College Campus' | 'Hybrid';
  speaker: {
    name: string;
    designation: string;
    company: string;
    image: string;
  };
  topicsCovered: string[];
  isUpcoming: boolean;
  registrationOpen: boolean;
}

export interface CompanyPrep {
  id: string;
  companyName: string;
  logoText: string;
  logoUrl?: string;
  accentColor: string;
  overview: string;
  selectionProcess: { stage: number; name: string; description: string }[];
  codingPattern: { topic: string; frequency: string; sampleQuestion: string }[];
  aptitudePattern: { section: string; numQuestions: string; duration: string }[];
  recentInterviewQuestions: { question: string; round: string; answerSummary: string }[];
  resources: string[];
}

export interface SearchResultItem {
  id: string;
  type: 'Course' | 'Coding Problem' | 'Mock Test' | 'Blog' | 'Roadmap' | 'Resource' | 'Company';
  title: string;
  subtitle: string;
  viewTarget: ViewState;
  targetId?: string;
}
