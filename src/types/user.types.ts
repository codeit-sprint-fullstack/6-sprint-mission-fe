export type User = {
  id: string;
  email: string;
  nickname: string;
  password?: string | null;
  image?: string | null;
  provider?: "local" | "google" | "kakao";
  providerId?: string | null;
};
