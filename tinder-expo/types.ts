export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

export type ProfileItemT = {
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
  matches: string;
  name: string;
};

export type TabBarIconT = {
  focused: boolean;
  iconName: any;
  text: string;
};

export type ClothingItem = {
  id: string;
  name: string;
  color?: string;
  brand?: string;
  price?: number;
  match: string;
  description: string;
  message: string;
  image: any;
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
};

export class User {
  id: string
  likedItems: ClothingItem[]
  viewedItems: ClothingItem[]
  cartItems: ClothingItem[]

  constructor(id: string) {
    this.id = id
    this.likedItems = []
    this.viewedItems = []
    this.cartItems = []
  }
}

