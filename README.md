# Sprint Mission - 이준영
# 🐼 판다마켓 (Panda Market)

![판다마켓 로고](https://symphonious-bavarois-c9705b.netlify.app/img/logo.png)

**판다마켓(Panda Market)**은 사용자가 간편하게 로그인 및 회원가입을 할 수 있도록 기본적인 페이지 레이아웃을 제공하는 웹 애플리케이션입니다.  
또한, **상품 및 게시글 데이터를 API와 연동하여 조회, 생성, 수정, 삭제(CRUD)할 수 있도록 구현**하였습니다.

🚀 **[배포된 페이지 바로가기](https://67bbb8ac9fca58adfbceee04--delightful-tartufo-173abd.netlify.app/)**

---

## 📌 프로젝트 개요
이 프로젝트는 **중고 거래 플랫폼 "판다마켓"의 기본 프론트엔드 구조를 구현한 것**으로, 현재까지 다음과 같은 기능을 구현하였습니다.

### ✅ **구현된 페이지 및 기능**
1. **홈페이지**
   - 판다마켓의 메인 화면 레이아웃 구성
   - 반응형 디자인 적용 (PC, 태블릿, 모바일)

2. **로그인 페이지**
   - 이메일과 비밀번호 입력 폼
   - "간편 로그인" (Google, 카카오톡) 버튼 UI
   - **입력값 유효성 검사** (이메일 형식 검증, 비밀번호 8자 이상 여부 체크)
   - 로그인 시 API 요청을 보내고 응답을 처리 (실제 로그인 API 연동 가능)

3. **회원가입 페이지**
   - 이메일, 닉네임, 비밀번호 입력 폼
   - 비밀번호 확인 입력란 추가
   - **입력값 유효성 검사** (이메일 중복 확인, 비밀번호 일치 여부 체크)
   - 회원가입 시 API 요청을 보내고 응답을 처리

4. **상품 및 게시글 데이터 연동 (API 호출)**
   - **상품(Product) API**
     - 여러 개의 상품 목록 조회 (`getProductList`)
     - 특정 상품 상세 조회 (`getProduct`)
     - 새로운 상품 추가 (`createProduct`)
     - 특정 상품 수정 (`patchProduct`)
     - 특정 상품 삭제 (`deleteProduct`)
   - **게시글(Article) API**
     - 여러 개의 게시글 목록 조회 (`getArticleList`)
     - 특정 게시글 상세 조회 (`getArticle`)
     - 새로운 게시글 추가 (`createArticle`)
     - 특정 게시글 수정 (`patchArticle`)
     - 특정 게시글 삭제 (`deleteArticle`)

---

## 🛠 사용한 기술 스택
### 📌 **Frontend**
- **HTML5**: 웹 페이지 구조 작성
- **CSS3**: 스타일링 및 레이아웃 구성
- **JavaScript (ES6+)**: API 호출 및 데이터 처리
- **Axios**: HTTP 요청을 위한 라이브러리
- **Netlify**: 프로젝트 배포  

### 📌 **API 활용**
- `https://sprint-mission-api.vercel.app/articles`
- `https://sprint-mission-api.vercel.app/products`
- CRUD 기능을 구현하여 상품 및 게시글 데이터를 연동

### 📌 **디자인 원칙**
- `display: flex`를 적극 활용하여 레이아웃 구성
- 반응형 디자인 적용 (PC, 태블릿, 모바일)
- 사용자 경험(UX) 향상을 위한 **입력값 유효성 검사 및 에러 처리**

---

## 📂 프로젝트 구조
```bash
6-sprint-mission/
│── index.html          # 메인 페이지 (랜딩 페이지)
│── login.html          # 로그인 페이지
│── signup.html         # 회원가입 페이지
│── styles.css          # 전체 스타일링
│── main.js             # 메인 기능 실행 (API 호출 포함)
│
├── services/
│   ├── ProductService.js   # Product API 관련 함수
│   ├── ArticleService.js   # Article API 관련 함수
│
└── assets/
    ├── images/             # 프로젝트에서 사용하는 이미지
    ├── icons/              # SNS 로그인 아이콘 등
