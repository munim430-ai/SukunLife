export interface Question {
  id: string;
  text: string;
  category: 'evileye' | 'sihr' | 'jinn' | 'mental' | 'general';
  options: { text: string; value: number }[];
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'ee_1',
    text: 'Do you feel sudden extreme laziness or exhaustion despite enough rest?',
    category: 'evileye',
    options: [
      { text: 'Never', value: 0 },
      { text: 'Sometimes', value: 2 },
      { text: 'Very Often', value: 5 }
    ]
  },
  {
    id: 'si_1',
    text: 'Do you experience blockages in your marriage, business, or work for no clear reason?',
    category: 'sihr',
    options: [
      { text: 'No', value: 0 },
      { text: 'Yes, recently', value: 3 },
      { text: 'Yes, for years', value: 6 }
    ]
  },
  {
    id: 'ji_1',
    text: 'Do you have recurring nightmares of being chased by animals (dogs, snakes, black cats)?',
    category: 'jinn',
    options: [
      { text: 'No', value: 0 },
      { text: 'Rarely', value: 2 },
      { text: 'Frequently', value: 5 }
    ]
  },
  {
    id: 'ge_1',
    text: 'Do you feel heavy shouldered or chest tightness during Salah or Quran recitation?',
    category: 'general',
    options: [
      { text: 'No', value: 0 },
      { text: 'Occasional yawning', value: 2 },
      { text: 'Extreme physical pain', value: 6 }
    ]
  }
];
