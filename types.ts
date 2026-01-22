export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  tags: string[];
}

export enum Category {
  MEN = 'Men',
  WOMEN = 'Women',
  ACCESSORIES = 'Accessories',
  KIDS = 'Kids'
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
