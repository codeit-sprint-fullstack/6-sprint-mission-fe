import React from "react";

export async function login({ email, password }) {
  const response = await fetch(
    "https://panda-market-api.vercel.app/auth/signIn",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
}
