import { CodingProblem, CodeSnippet, TestCase } from '../types';

export const POPULAR_LEETCODE_SLUGS = [
  { slug: 'two-sum', name: 'Two Sum', difficulty: 'Easy', tag: 'Array, Hash Table' },
  { slug: 'valid-anagram', name: 'Valid Anagram', difficulty: 'Easy', tag: 'String, Hash Table' },
  { slug: 'container-with-most-water', name: 'Container With Most Water', difficulty: 'Medium', tag: 'Two Pointers' },
  { slug: '3sum', name: '3Sum', difficulty: 'Medium', tag: 'Array, Two Pointers' },
  { slug: 'longest-substring-without-repeating-characters', name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tag: 'Sliding Window' },
  { slug: 'median-of-two-sorted-arrays', name: 'Median of Two Sorted Arrays', difficulty: 'Hard', tag: 'Binary Search' },
  { slug: 'reverse-linked-list', name: 'Reverse Linked List', difficulty: 'Easy', tag: 'Linked List' },
  { slug: 'trapping-rain-water', name: 'Trapping Rain Water', difficulty: 'Hard', tag: 'Stack, Two Pointers' },
  { slug: 'valid-parentheses', name: 'Valid Parentheses', difficulty: 'Easy', tag: 'Stack, String' },
  { slug: 'maximum-subarray', name: 'Maximum Subarray (Kadane)', difficulty: 'Medium', tag: 'Dynamic Programming' },
  { slug: 'climbing-stairs', name: 'Climbing Stairs', difficulty: 'Easy', tag: 'Dynamic Programming' },
  { slug: 'merge-k-sorted-lists', name: 'Merge k Sorted Lists', difficulty: 'Hard', tag: 'Heap / Priority Queue' },
];

export async function fetchLeetCodeProblem(slugOrUrl: string): Promise<CodingProblem> {
  const cleanSlug = slugOrUrl
    .trim()
    .replace(/^https?:\/\/leetcode\.com\/problems\//, '')
    .replace(/\/$/, '')
    .split('/')[0]
    .toLowerCase();

  if (!cleanSlug) {
    throw new Error('Please enter a valid LeetCode problem title or URL slug.');
  }

  const response = await fetch(`/api/leetcode/problem/${encodeURIComponent(cleanSlug)}`);
  const data = await response.json();

  if (!response.ok || !data.success || !data.problem) {
    throw new Error(data.error || `Problem "${cleanSlug}" could not be fetched from LeetCode.`);
  }

  return convertRawLeetCodeToCodingProblem(data.problem);
}

export async function fetchDailyLeetCodeProblem(): Promise<{ title: string; slug: string }> {
  const response = await fetch('/api/leetcode/daily');
  const data = await response.json();
  if (!response.ok || !data.success || !data.daily?.question) {
    throw new Error(data.error || 'Could not fetch LeetCode Daily Challenge.');
  }
  return {
    title: data.daily.question.title,
    slug: data.daily.question.titleSlug,
  };
}

export function convertRawLeetCodeToCodingProblem(raw: any): CodingProblem {
  const snippets: CodeSnippet[] = [
    { language: 'python', code: raw.pythonStarter || raw.snippets?.find((s: any) => s.language === 'python')?.code || '# Write your Python solution here\n' },
    { language: 'java', code: raw.javaStarter || raw.snippets?.find((s: any) => s.language === 'java')?.code || '// Write your Java solution here\n' },
    { language: 'cpp', code: raw.cppStarter || raw.snippets?.find((s: any) => s.language === 'cpp')?.code || '// Write your C++ solution here\n' },
    { language: 'javascript', code: raw.jsStarter || raw.snippets?.find((s: any) => s.language === 'javascript')?.code || '// Write your JavaScript solution here\n' },
  ];

  const companyTagsList = typeof raw.companyTags === 'string'
    ? raw.companyTags.split(',').map((s: string) => s.trim()).filter(Boolean)
    : Array.isArray(raw.companyTags)
    ? raw.companyTags
    : ['LeetCode'];

  let sampleCases: TestCase[] = Array.isArray(raw.testCases) && raw.testCases.length > 0
    ? raw.testCases.map((tc: any) => ({
        input: tc.input || raw.inputSample || 'See problem statement',
        output: tc.expectedOutput || tc.output || raw.outputSample || 'See problem statement',
        explanation: tc.explanation || 'Sample case from LeetCode',
      }))
    : Array.isArray(raw.sampleCases) && raw.sampleCases.length > 0
    ? raw.sampleCases
    : [
        {
          input: raw.inputSample || '[2, 7, 11, 15], 9',
          output: raw.outputSample || '[0, 1]',
          explanation: 'Sample case from description',
        },
      ];

  const constraintsList = typeof raw.constraints === 'string'
    ? [raw.constraints]
    : Array.isArray(raw.constraints)
    ? raw.constraints
    : ['Refer to the problem description for detailed constraints.'];

  const rawTitle = (raw.title || 'LeetCode Problem').replace(/^#\s*/, '').trim();

  return {
    id: raw.id || `lc-${Date.now()}`,
    title: rawTitle,
    category: raw.category || 'Algorithms',
    difficulty: (raw.difficulty as any) || 'Medium',
    companyTags: companyTagsList.length > 0 ? companyTagsList : ['Amazon', 'Google', 'TCS'],
    acceptanceRate: raw.acceptanceRate || '58.4%',
    problemStatement: raw.problemStatement || raw.content || 'No description provided.',
    constraints: constraintsList,
    sampleCases,
    hiddenTestCases: raw.hiddenTestCases || [
      {
        input: 'Hidden Test Input',
        output: 'Hidden Test Output',
        explanation: 'Evaluated on server submit',
      },
    ],
    editorial: raw.editorial || `### Solution Approach\n1. Read the problem statement and identify input constraints.\n2. Formulate an optimal algorithm using Hash Table, Two Pointers, or Dynamic Programming.\n3. Verify corner cases before submitting.`,
    snippets,
  };
}
