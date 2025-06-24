import { tokenFetch } from "../fetchClient";

export interface UpdateMeParams {
  image: string;
}

export interface UpdateMyPasswordParams {
  password: string;
  passwordConfirmation: string;
  currentPassword: string;
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}

// 내 정보 조회
export const getMe = async (): Promise<any> => {
  return await tokenFetch("/users/me");
};

// 내 정보 수정
export const updateMe = async ({ image }: UpdateMeParams): Promise<any> => {
  return await tokenFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ image }),
  });
};

// 비밀번호 변경
export const updateMyPassword = async ({
  password,
  passwordConfirmation,
  currentPassword,
}: UpdateMyPasswordParams): Promise<any> => {
  return await tokenFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      password,
      passwordConfirmation,
      currentPassword,
    }),
  });
};

// 내 상품 조회
export const getMyProduct = async ({
  params,
}: {
  params?: QueryParams;
}): Promise<any> => {
  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return await tokenFetch(`/users/me/products${query}`);
};

// 내 최애(찜 목록) 조회
export const getMyFavorites = async ({
  params,
}: {
  params?: QueryParams;
}): Promise<any> => {
  const query = params
    ? `?${new URLSearchParams(params as any).toString()}`
    : "";
  return await tokenFetch(`/users/me/favorites${query}`);
};
