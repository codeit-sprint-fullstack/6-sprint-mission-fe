export type TItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[] | File[];
  tags: string[];
  favoriteCount: number;
};

export type TArticle = {
  id: string;
  title: string;
  content: string;
  images: string[];
  favoriteCount: number;
};

export type TComment = {
  id: string;
  content: string;
  userId: TUser["id"];
  user: TUser;
};

export type TUser = {
  id: string;
  nickname: string;
  email: string;
  image: string;
  password: string;
};

export type TSign = {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
};

export type TPassword = {
  password: boolean;
  passwordConfirmation?: boolean;
};

export type Field = {
  name: keyof TSign;
  label: string;
  placeholder: string;
  isPassword: boolean;
};
