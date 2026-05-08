export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  category: 'ruqyah' | 'hijama' | 'counseling' | 'consultancy';
}

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Ruqyah Session (60 Min)',
    duration: '60 Min',
    price: 1500,
    category: 'ruqyah',
    description: 'A dedicated one-on-one sessions with our senior practitioners (Raqis) following the Sunnah.'
  },
  {
    id: 's2',
    name: 'Full Body Hijama',
    duration: '90 Min',
    price: 2500,
    category: 'hijama',
    description: 'Combined therapeutic and spiritual cupping to remove toxins and strengthen the body.'
  },
  {
    id: 's3',
    name: 'Islamic Counseling',
    duration: '45 Min',
    price: 1200,
    category: 'counseling',
    description: 'Mental and spiritual guidance based on the Quran and Sunnah to find peace (Sukun).'
  },
  {
    id: 's4',
    name: 'Home Visit Ruqyah',
    duration: 'Flexible',
    price: 5000,
    category: 'ruqyah',
    description: 'Emergency or planned visit to your home for patients with mobility issues or severe cases.'
  }
];
