export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Standard Ruqyah Olive Oil',
    price: 450,
    category: 'Essential',
    description: 'High-quality Moroccan olive oil recited upon by our senior Raqis.'
  },
  {
    id: 'p2',
    name: 'Black Seed Healing Blend',
    price: 850,
    category: 'Blend',
    description: 'A potent mix of Nigella Sativa and Sidr honey for immunity and protection.'
  },
  {
    id: 'p3',
    name: 'Senna Leaf Powder',
    price: 280,
    category: 'Detox',
    description: 'Cleanse the stomach from ingested spiritual blockages.'
  },
  {
    id: 'p4',
    name: 'Protection Bundle (Gold)',
    price: 2400,
    category: 'Bundle',
    description: 'Complete set: Oil, Honey, Water, and a guided 30-day audio plan.'
  }
];
