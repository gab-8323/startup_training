import { MockTest } from '../types';

export const MOCK_TESTS_DATA: MockTest[] = [
  {
    id: 'tcs-nqt-full-mock',
    title: 'TCS NQT Cognitive & Tech Placement Test',
    category: 'Company Specific',
    subcategory: 'TCS NQT',
    durationMinutes: 30,
    totalQuestions: 10,
    passingScore: 70,
    difficulty: 'Medium',
    instructions: [
      'Total duration is 30 minutes.',
      'Each question carries 1 mark. No negative marking for wrong answers.',
      'Do not switch tabs during the test execution.',
      'Click "Submit Test" when you finish all sections.'
    ],
    questions: [
      {
        id: 'tcs-1',
        question: 'Which data structure is best suited for evaluating postfix mathematical expressions?',
        options: ['Queue', 'Stack', 'Tree', 'Array'],
        correctIndex: 1,
        explanation: 'Stack is ideal for postfix evaluation because operands are pushed onto the stack, and when an operator is encountered, the top two operands are popped and evaluated.',
        topicTag: 'Data Structures'
      },
      {
        id: 'tcs-2',
        question: 'What is the output of the following Python snippet?\n\nprint(type(5 // 2))',
        codeSnippet: `x = 5 // 2\nprint(type(x))`,
        options: ['<class "float">', '<class "int">', '<class "double">', '<class "number">'],
        correctIndex: 1,
        explanation: 'In Python 3, the // operator performs floor division, returning an integer (int). 5 // 2 gives 2.',
        topicTag: 'Python'
      },
      {
        id: 'tcs-3',
        question: 'A pipe can fill a tank in 6 hours and another pipe can empty it in 12 hours. If both pipes are opened together, how long will it take to fill the tank?',
        options: ['12 hours', '8 hours', '10 hours', '15 hours'],
        correctIndex: 0,
        explanation: 'Net filling rate per hour = (1/6 - 1/12) = 1/12. Therefore, the tank takes 12 hours to fill.',
        topicTag: 'Aptitude'
      },
      {
        id: 'tcs-4',
        question: 'In SQL, which clause is used to filter aggregated records after a GROUP BY statement?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
        correctIndex: 1,
        explanation: 'The HAVING clause is used to filter records after aggregate functions have been applied with GROUP BY. WHERE filters rows before grouping.',
        topicTag: 'SQL'
      },
      {
        id: 'tcs-5',
        question: 'Which CPU scheduling algorithm gives minimum average waiting time for a given set of processes?',
        options: ['First Come First Served (FCFS)', 'Shortest Job First (SJF)', 'Round Robin', 'Priority Scheduling'],
        correctIndex: 1,
        explanation: 'Shortest Job First (SJF) is mathematically proven to produce the lowest average waiting time for a set of processes.',
        topicTag: 'Operating Systems'
      },
      {
        id: 'tcs-6',
        question: 'What does HTTP status code 404 signify?',
        options: ['Internal Server Error', 'Unauthorized Access', 'Not Found', 'Forbidden'],
        correctIndex: 2,
        explanation: 'HTTP 404 indicates that the requested server resource could not be found.',
        topicTag: 'Computer Networks'
      },
      {
        id: 'tcs-7',
        question: 'Find the odd one out: 3, 5, 11, 14, 17, 19.',
        options: ['14', '11', '17', '19'],
        correctIndex: 0,
        explanation: 'All numbers except 14 are prime numbers. 14 is a composite number.',
        topicTag: 'Logical Reasoning'
      },
      {
        id: 'tcs-8',
        question: 'What will be the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
        options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'],
        correctIndex: 1,
        explanation: 'In a balanced BST of size N, the height is log N, so search time complexity is O(log N).',
        topicTag: 'Algorithms'
      },
      {
        id: 'tcs-9',
        question: 'Select the synonym for the word: "PRUDENT"',
        options: ['Reckless', 'Wise', 'Foolish', 'Careless'],
        correctIndex: 1,
        explanation: 'Prudent means acting with or showing care and thought for the future; wise or cautious.',
        topicTag: 'Verbal Ability'
      },
      {
        id: 'tcs-10',
        question: 'Which key constraint ensures that no two rows have duplicate non-null values in a column?',
        options: ['CHECK', 'FOREIGN KEY', 'UNIQUE', 'DEFAULT'],
        correctIndex: 2,
        explanation: 'The UNIQUE constraint ensures that all values in a column are distinct.',
        topicTag: 'DBMS'
      }
    ]
  },
  {
    id: 'python-technical-mcq',
    title: 'Python Core & Advanced Technical MCQs',
    category: 'Technical MCQs',
    subcategory: 'Python',
    durationMinutes: 15,
    totalQuestions: 5,
    passingScore: 80,
    difficulty: 'Easy',
    instructions: [
      'Duration: 15 minutes.',
      'Test your knowledge of Python list comprehensions, decorators, and memory model.'
    ],
    questions: [
      {
        id: 'py-mcq-1',
        question: 'What is the output of bool([]) in Python?',
        options: ['True', 'False', 'None', 'Error'],
        correctIndex: 1,
        explanation: 'An empty list [] evaluates to False in a boolean context.',
        topicTag: 'Python'
      },
      {
        id: 'py-mcq-2',
        question: 'Which keyword is used to create a generator function in Python?',
        options: ['return', 'yield', 'generate', 'lambda'],
        correctIndex: 1,
        explanation: 'The `yield` statement suspends function execution and yields a value to the caller, turning a function into a generator.',
        topicTag: 'Python'
      },
      {
        id: 'py-mcq-3',
        question: 'What is the correct way to merge two dictionaries dict1 and dict2 in Python 3.9+?',
        options: ['dict1 + dict2', 'dict1 | dict2', 'dict1.merge(dict2)', 'dict1 && dict2'],
        correctIndex: 1,
        explanation: 'Python 3.9 introduced the union operator `|` for dictionary merging.',
        topicTag: 'Python'
      },
      {
        id: 'py-mcq-4',
        question: 'What is the time complexity of looking up a key in a Python dictionary?',
        options: ['O(N)', 'O(log N)', 'O(1) average', 'O(N^2)'],
        correctIndex: 2,
        explanation: 'Python dictionaries are implemented using hash tables, offering O(1) average time complexity for key lookup.',
        topicTag: 'Python'
      },
      {
        id: 'py-mcq-5',
        question: 'Which method removes and returns the last item from a list?',
        options: ['remove()', 'pop()', 'delete()', 'discard()'],
        correctIndex: 1,
        explanation: '`list.pop()` removes and returns the element at the specified index (default is the last element).',
        topicTag: 'Python'
      }
    ]
  },
  {
    id: 'sql-dbms-mock-test',
    title: 'SQL & Database Management Placement Exam',
    category: 'Technical MCQs',
    subcategory: 'SQL',
    durationMinutes: 20,
    totalQuestions: 5,
    passingScore: 70,
    difficulty: 'Medium',
    instructions: [
      'Test covers Joins, Indexing, Normalization and ACID transactions.'
    ],
    questions: [
      {
        id: 'sql-1',
        question: 'Which JOIN returns all records when there is a match in either left or right table?',
        options: ['INNER JOIN', 'FULL OUTER JOIN', 'LEFT JOIN', 'CROSS JOIN'],
        correctIndex: 1,
        explanation: 'FULL OUTER JOIN combines the results of both LEFT and RIGHT joins.',
        topicTag: 'SQL'
      },
      {
        id: 'sql-2',
        question: 'A database table is in 2NF if it is in 1NF and:',
        options: ['Contains no transitive dependencies', 'Contains no partial dependencies on candidate key', 'Has no multi-valued attributes', 'Has a primary key'],
        correctIndex: 1,
        explanation: 'Second Normal Form (2NF) requires 1NF + no partial dependencies (every non-prime attribute must be fully functionally dependent on the primary key).',
        topicTag: 'DBMS'
      },
      {
        id: 'sql-3',
        question: 'In ACID properties of transactions, what does "I" stand for?',
        options: ['Integrity', 'Isolation', 'Index', 'Immutable'],
        correctIndex: 1,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
        topicTag: 'DBMS'
      },
      {
        id: 'sql-4',
        question: 'What will the command TRUNCATE TABLE do?',
        options: ['Deletes the table structure', 'Deletes all rows without logging individual row deletions', 'Deletes rows conditionally', 'Rolls back transaction'],
        correctIndex: 1,
        explanation: 'TRUNCATE removes all rows from a table quickly by deallocating the data pages, whereas DROP deletes the table schema.',
        topicTag: 'SQL'
      },
      {
        id: 'sql-5',
        question: 'Which aggregate function ignores NULL values by default?',
        options: ['COUNT(*)', 'COUNT(column_name)', 'Both ignore NULL', 'Neither ignores NULL'],
        correctIndex: 1,
        explanation: 'COUNT(column_name) ignores NULL values in that specific column, whereas COUNT(*) counts all rows regardless of NULLs.',
        topicTag: 'SQL'
      }
    ]
  }
];
