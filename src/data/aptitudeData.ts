import { AptitudeTopic } from '../types';

export const APTITUDE_TOPICS_DATA: AptitudeTopic[] = [
  {
    id: 'percentages-profit-loss',
    title: 'Percentages, Profit & Loss',
    category: 'Quantitative',
    iconName: 'Percent',
    formulaeSummary: [
      'Percentage Increase = (Increase / Original Value) × 100',
      'Gain % = (Profit / Cost Price) × 100',
      'Loss % = (Loss / Cost Price) × 100',
      'Selling Price (SP) = CP × (100 + Gain%) / 100',
      'Discount % = (Discount / Marked Price) × 100'
    ],
    questions: [
      {
        id: 'q-percent-1',
        question: 'A shopkeeper marks an item 20% above the cost price and gives a discount of 10%. What is his net profit percentage?',
        options: ['8%', '10%', '12%', '15%'],
        correctOptionIndex: 0,
        explanation: 'Let CP = 100. Marked Price (MP) = 120. Discount = 10% of 120 = 12. SP = 120 - 12 = 108. Net Profit = 108 - 100 = 8, so Profit % = 8%.',
        difficulty: 'Easy'
      },
      {
        id: 'q-percent-2',
        question: 'If A’s salary is 25% more than B’s salary, by what percentage is B’s salary less than A’s salary?',
        options: ['20%', '25%', '15%', '30%'],
        correctOptionIndex: 0,
        explanation: 'Formula: [R / (100 + R)] × 100 = [25 / 125] × 100 = 20%.',
        difficulty: 'Easy'
      },
      {
        id: 'q-percent-3',
        question: 'A trader buys 12 pencils for $10 and sells 10 pencils for $12. What is the profit percentage?',
        options: ['44%', '20%', '35%', '40%'],
        correctOptionIndex: 0,
        explanation: 'CP of 1 pencil = 10/12 = $5/6. SP of 1 pencil = 12/10 = $6/5. Profit = (6/5 - 5/6) = 11/30. Profit % = (11/30 / 5/6) * 100 = (11/30 * 6/5) * 100 = 44%.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'time-work-distance',
    title: 'Time & Work, Speed & Distance',
    category: 'Quantitative',
    iconName: 'Clock',
    formulaeSummary: [
      'Work = Rate × Time',
      'If A can do a work in n days, A’s 1 day work = 1/n',
      'Speed = Distance / Time',
      'Relative Speed (Same Direction) = S1 - S2',
      'Relative Speed (Opposite Direction) = S1 + S2',
      'Convert km/h to m/s: Multiply by 5/18'
    ],
    questions: [
      {
        id: 'q-tw-1',
        question: 'A can complete a task in 10 days and B can complete it in 15 days. Working together, how many days will they take?',
        options: ['6 days', '8 days', '5 days', '7.5 days'],
        correctOptionIndex: 0,
        explanation: 'A’s 1 day work = 1/10. B’s 1 day work = 1/15. Together 1 day work = 1/10 + 1/15 = 5/30 = 1/6. Days required = 6 days.',
        difficulty: 'Easy'
      },
      {
        id: 'q-tw-2',
        question: 'A train running at a speed of 60 km/h crosses a pole in 9 seconds. What is the length of the train?',
        options: ['150 meters', '120 meters', '180 meters', '200 meters'],
        correctOptionIndex: 0,
        explanation: 'Speed in m/s = 60 × (5/18) = 50/3 m/s. Length = Speed × Time = (50/3) × 9 = 150 meters.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'blood-relations-puzzles',
    title: 'Blood Relations & Direction Sense',
    category: 'Logical Reasoning',
    iconName: 'Users',
    formulaeSummary: [
      'Father’s / Mother’s Son = Brother',
      'Father’s / Mother’s Sister = Aunt',
      'Son’s Wife = Daughter-in-law',
      'Pythagoras Theorem for Shortest Distance: d = √(x² + y²)'
    ],
    questions: [
      {
        id: 'q-br-1',
        question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only mother of my brother." How is the boy related to Suresh?',
        options: ['Son', 'Brother', 'Uncle', 'Nephew'],
        correctOptionIndex: 1,
        explanation: 'Suresh’s brother’s mother is Suresh’s mother. Her only mother is Suresh’s mother/grandmother context. Son of Suresh’s brother’s mother is Suresh or his brother.',
        difficulty: 'Easy'
      },
      {
        id: 'q-br-2',
        question: 'A person walks 5 km North, turns right and walks 12 km. How far is he from his starting point?',
        options: ['13 km', '17 km', '7 km', '10 km'],
        correctOptionIndex: 0,
        explanation: 'Distance = √(5² + 12²) = √(25 + 144) = √169 = 13 km.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'syllogisms-coding-decoding',
    title: 'Syllogisms & Coding-Decoding',
    category: 'Logical Reasoning',
    iconName: 'Brain',
    formulaeSummary: [
      'Venn Diagram Method for Syllogisms',
      'All A are B does not mean All B are A',
      'Alphabet Positions: A=1, E=5, J=10, O=15, T=20, Y=25 (EJOTY rule)'
    ],
    questions: [
      {
        id: 'q-syl-1',
        question: 'If "COMPUTER" is coded as "RFUVQNPC", how is "MEDICINE" coded in that language?',
        options: ['EOJDJEFM', 'EOJDEJFM', 'MFEJDJOE', 'EJOJDEFM'],
        correctOptionIndex: 0,
        explanation: 'Reverse the word: R E T U P M O C. Then add +1 to middle letters, keeping ends swapped.',
        difficulty: 'Medium'
      }
    ]
  }
];
