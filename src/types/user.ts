export interface User {
  id: string;
  email: string;
  nickname?: string;
  name?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
