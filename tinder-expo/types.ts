export type CardItemT = {
  id?: string;
  description?: string;
  hasActions?: boolean;
  hasVariant?: boolean;
  image: any;
  isOnline?: boolean;
  matches?: string;
  name: string;
  brand?: string;
  price?: number;
};

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
  likedItemIds: string[]
  historyItemIds: string[]
  cartItemIds: string[]

  constructor(id: string) {
    this.id = id
    this.likedItemIds = []
    this.historyItemIds = []
    this.cartItemIds = []
  }
}

