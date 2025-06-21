"use server";
import { cookies } from "next/headers";
interface loginActionProps {
    email: string;
    password: string;
}
export async function loginAction({ email, password } : loginActionProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),

    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));

    }
    return res.json();
}

export async function clearServerSideTokens() {
    const cookieStore = await cookies();

    // 액세스 토큰 삭제
    cookieStore.delete("accessToken");

    // 리프레시 토큰 삭제
    cookieStore.delete("refreshToken");

    return { success: true };
}
