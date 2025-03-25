# 판다마켓 스프린트 미션 6


## 파일 구조

```bash

```

## 코드 리뷰 반영

- 컴포넌트 파일 확장자 .js -> .jsx 변경
-

## 변경사항

- 각 페이지별 컴포넌트 추가
- Main.js: 기본 렌더링 파일로 라우트 경로 설정
- 기존 App.js
  - Productlist 컴포넌트 관련 props, state 부분 MarketPage.jsx로 이동
  - Header, Outlet, Footer 컴포넌트로 경로에 해당하는 라우트로 이동 시 Outlet만 변경되도록 수정
- css module 적용
  - 기존 global.css -> App.module.css로 변경
  - color palette 추가
- Pagination
  - useMemo 적용
