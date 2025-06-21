export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  tags?: string[];
  image: string;
  description: string;
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;

}

export interface User {
  nickname: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  token: string | null;
}