export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = process.env.API_URL;

export const BREAKPOINTS = {
  sm: 375,
  md: 744,
  lg: 1200,
};

export const ARTICLE_COUNT = {
  mobile: 1,
  tablet: 2,
  pc: 3,
};

export const BEST_ITEM_COUNT = {
  mobile: 1,
  tablet: 2,
  pc: 4,
};

export const ITEM_COUNT = {
  mobile: 4,
  tablet: 6,
  pc: 10,
};

export const EDIT_OPTIONS = [
  { label: "수정하기", value: "edit" },
  { label: "삭제하기", value: "delete" },
];

export const FEATURE_OPTIONS = [
  {
    src: "/assets/img/img_home_01.svg",
    alt: "인기 상품",
    tag: "Hot item",
    title: ["인기 상품을 ", "확인해 보세요"],
    content: ["가장 HOT한 중고거래 물품을", "판다 마켓에서 확인해 보세요"],
  },
  {
    src: "/assets/img/img_home_02.svg",
    alt: "상품 검색",
    tag: "Search",
    title: ["구매를 원하는 ", "상품을 검색하세요"],
    content: ["구매하고 싶은 물품은 검색해서", "쉽게 찾아보세요"],
  },
  {
    src: "/assets/img/img_home_03.svg",
    alt: "상품 등록",
    tag: "Register",
    title: ["판매를 원하는 ", "상품을 등록하세요"],
    content: ["어떤 물건이든 판매하고 싶은 상품을", "쉽게 등록하세요"],
  },
];

export const INPUT_OPTIONS = {
  login: [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요",
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
    },
  ],
  signup: [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "이메일을 입력해주세요",
    },
    {
      label: "닉네임",
      name: "nickname",
      type: "text",
      placeholder: "닉네임을 입력해주세요",
    },
    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
    },
    {
      label: "비밀번호 확인",
      name: "passwordConfirmation",
      type: "password",
      placeholder: "비밀번호를 다시 입력해주세요",
    },
  ],
};
