// lib/authService.js
import { defaultPandaFetch, authUtils } from "@/lib/fetchClient";

export const authPandaService = {
  signUp: (nickname, email, password, passwordConfirmation) =>
    defaultPandaFetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
    }),

  signIn: async (email, password) => {
    try {
      const response = await defaultPandaFetch("/auth/signIn", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response && response.accessToken && response.refreshToken) {
        authUtils.setAuthTokens(response.accessToken, response.refreshToken);
      } else {
        console.warn(
          "Login response did not contain expected tokens:",
          response
        );
      }

      return response;
    } catch (error) {
      console.error("Sign in failed:", error);
      authUtils.clearAuthTokens();
      throw error;
    }
  },

  signOut: () => {
    authUtils.clearAuthTokens();

    return Promise.resolve();
  },
};
