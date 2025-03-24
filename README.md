# 스프린트 미션 - 판다마켓

### [🐼판다마켓](https://been-panda.onrender.com) : https://been-panda.onrender.com

> ### 판다마켓 대표 이미지

![판다마켓 대표 이미지](https://raw.githubusercontent.com/De-cal/6-sprint-mission-fe/refs/heads/basic-%EC%9D%B4%ED%83%9C%EB%B9%88-deploy/image/img_preview.png)

## 🐼 About

> **`일상의 모든 물건을 거래해 보세요`**

누구나 물건을 팔 수 있다! 언제, 어디서나 판다마켓과 함께 하세요!

판다마켓은 누구나 원하는 물건을 팔 수 있도록 도와주는 플랫폼입니다. 어떤 물건이든 올려만 보세요 다른 누군가에겐 그 물건이 필요할 수 있습니다!

깔끔한 UI로 만들어진 서비스를 경험해보세요. 상품을 등록하고 관리할 수 있고, 내가 원하는 물건을 검색도 할 수 있습니다😄

## 🔄️ Update

<details>
<summary>
  
  ### 스프린트 미션 1(홈페이지 구현)
</summary>
<div markdown="1">
  
#### [ 추가 ]
- 메인 홈페이지 구현

#### [ 수정 ]

- Footer 연도
</div>
</details>

---

<details>
<summary>
  
  ### 스프린트 미션 2(로그인, 회원가입 구현)
</summary>
<div markdown="1">
  
####  [ 추가 ]
- 로그인 btn 활성화
- 눈 모양 토글 스위치
- 구글 애널리틱스
- Favicon
- HTML 시맨틱 태그

#### [ 수정 ]

- html 클래스, CSS 변수 이름
- 카카오톡, 구글 아이콘 이름
- 로그인, 회원가입 footer 부분 텍스트 크기 조절해서 위치 조정
- README.md 정보
</div>
</details>

---

<details>
<summary>

### 스프린트 미션 3(유효성 검사, 이벤트 등록, 알림, 모달 구현, 반응형 웹 페이지)

</summary>
<div markdown="1">

#### [ 코드리뷰 반영(스프린트 미션 1, 2) ]

- [x] 파일별 디렉토리 관리
- [x] 파일 이름 통일화 작업
- [x] reset.css 정리
- [ ] 구글 애널리틱스 모듈화
- [x] 아이콘 변수이름 수정 : `eyeIcon -> eyeIcons`
- [x] required 삭제
  - 필요하지 않아져서 수정이 아니라 삭제했습니다.

#### [ 추가 ]

- 데이터 유효성 검사
- input-box 에러 메시지
- location.href(로그인 시 items로 이동)
- 링크 공유시 미리보기 meta 태그, 회원가입 유효성 검사 & 모달
- 트위터 meta 태그
- index.html 반응형
- 로그인, 회원가입 페이지 반응형
- 자바스크립트 반복되는 로직 분리
- 모달 반응형

#### [ 수정 ]

- index 파일에서 grid -> flex로 변경, 전반적인 크기 조절
</div>
</details>

---

<details>
<summary>

### 스프린트 미션 4(API 구현)

</summary>
<div markdown="1">

#### [ 코드리뷰 반영(스프린트 미션 3) ]

- [x] og 태그 오타 수정(og.title -> og:title)
- [x] og 태그 이미지 링크 경로 수정(상대 경로 -> url 절대 경로)
- [x] 비밀번호 20자 이상 입력시 에러 메시지 개선
- [x] module.js의 btn 선택자 이름 구체화
- [x] 이메일 정규표현식 수정(서브 도메인도 가능하도록)

#### [ 추가 ]

- API 구현
- API 함수 모듈화

#### [ 수정 ]

- input-box 이벤트 버블링
</div>
</details>

---

<details>
<summary>

### 스프린트 미션 5(중고마켓 페이지 - React 사용)

</summary>
<div markdown="1">

#### [ 코드리뷰 반영(스프린트 미션 4) ]

- [x] baseURL 변수명 변경

#### [ 추가 ]

- 중고마켓 페이지
- 페이지네이션
- 상품 검색바
- 정렬 버튼
- 반응형 디자인
- 반응형 리퀘스트
- 커스텀 hook

#### [ 수정 ]

- 랜딩 페이지 이미지 모바일 반응형에서 튀어나오는 현상
- 랜딩 페이지 이미지 위치

</div>
</details>

---

<details>
<summary>

### 스프린트 미션 6(중고마켓 연결, 상품등록 페이지 - React Router, Express, MongoDB 사용)

</summary>
<div markdown="1">

#### [ 코드리뷰 반영(스프린트 미션 5) ]

- [x] select를 custom hook으로 만들기

#### [ 추가 ]

- 엔드포인트 생성
- 데이터베이스 생성 & 연결
- 상품 등록 페이지
- API 연결
- 상품 등록 유효성 검사 커스텀 훅

#### [ 수정 ]

- login, signup 공통 데이터 모듈화
- [x] 검색할 때 페이지 갯수가 제품에 따라서 변해야 하는데 변하지 않는 현상
- [ ] 모바일 버전에서 검색하고 디바이스를 pc로 늘리면 페이지 수가 줄어드는데 같이 따라서 제대로 변하지 않는 현상
- [x] 태그, nav에 onHover하면 색상 변하도록 효과 주기
- [x] CORS에 내 웹페이지 주소만 등록

</div>
</details>

---

<details>
<summary>

### 스프린트 미션 7(RDBMS 기반 EndPoint 구축하기 - Express, PostgreSQL, Prisma 사용)

</summary>
<div markdown="1">

#### [ 코드리뷰 반영(스프린트 미션 6) ]

- 없음

#### [ 추가 ]

- MongoDB -> PostgreSQL로 마이그레이션
- 자유게시판, 댓글 엔드포인트

#### [ 수정 ]

- 데이터베이스 변경에 따른 제품 렌더링 map에 unique Key 수정
- useGetDeviceType 커스텀 훅 수정
- throttle 설정하니까 빠르게 입력하면 폼 제출 이벤트가 안막혀서 삭제

#### [ 디버깅 ]

- 상품이 일부만 렌더린 되는 버그
  - [x] 백엔드에서 totalCount 코드 수정해서 해결완료
- 이름이 같은 태그를 삭제할 때 일괄 삭제되는 버그
  - [x] 이름이 같은 태그를 등록할 수 없도록 막아서 해결완료
- 화면 너비가 넓어지면서 반응형 API 보낼 때 페이지 수가 줄어들면 페이지네이션이 제대로 렌더링 되지 않는 버그
  - [x] 첫 페이지로 이동되게 처리해서 해결완료
- community 페이지에 렌더링 오류
  - [x] 현재 당장 사용하지 않기 때문에 일단 temp 디렉토리로 옮겨놓고 Community는 초기화해서 해결완료
- 상품 등록 안되는 버그(path parameter가 undefinde로 나옴)
  - [x] FE - mongoose에서 사용했던 id를 수정, price를 숫자로 형 변환해서 해결완료

</div>
</details>

---
