import { getUserAction } from "../actions/user";

export const userService = {
  getMe: async () => {
    return await getUserAction();
  },
};
