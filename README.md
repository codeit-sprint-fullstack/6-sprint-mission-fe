# 판다마켓

판다마켓은 중고 거래 플랫폼입니다. 사용자는 상품을 등록하고, 검색하고, 구매할 수 있습니다.

## 프로젝트 구조

- `index.html`: 메인 페이지
- `login.html`: 로그인 페이지
- `signup.html`: 회원가입 페이지
- `items.html`: 상품 목록 페이지
- `privacy.html`: 개인정보 처리방침 페이지
- `faq.html`: 자주 묻는 질문 페이지
- `main.js`: 메인 JavaScript 파일
- `signup.js`: 회원가입 JavaScript 파일
- `ArticleService.js`: 게시글 관련 서비스 파일
- `ProductService.js`: 상품 관련 서비스 파일
- `DataBase.js`: 사용자 데이터베이스 파일
- `style.css`: 메인 스타일시트
- `login_style.css`: 로그인 페이지 스타일시트
- `reset.css`: 기본 스타일 초기화 파일

## 주요 기능

- **로그인**: 사용자는 이메일과 비밀번호를 입력하여 로그인할 수 있습니다.
- **회원가입**: 사용자는 이메일과 비밀번호를 입력하여 회원가입할 수 있습니다.
- **상품 등록**: 사용자는 새로운 상품을 등록할 수 있습니다.
- **상품 검색**: 사용자는 원하는 상품을 검색할 수 있습니다.
- **게시글 작성**: 사용자는 새로운 게시글을 작성할 수 있습니다.
- **게시글 수정**: 사용자는 기존 게시글을 수정할 수 있습니다.
- **게시글 삭제**: 사용자는 게시글을 삭제할 수 있습니다.

## API

### ArticleService

- `getArticleList(page, pageSize, keyword)`: 게시글 목록을 가져옵니다.
- `getArticle(articleId)`: 특정 게시글을 가져옵니다.
- `createArticle(title, content, image)`: 새로운 게시글을 생성합니다.
- `patchArticle(articleId, updatedData)`: 기존 게시글을 수정합니다.
- `deleteArticle(articleId)`: 게시글을 삭제합니다.

### ProductService

- `getProductList(page, pageSize, keyword)`: 상품 목록을 가져옵니다.
- `getProduct(productId)`: 특정 상품을 가져옵니다.
- `createProduct(productData)`: 새로운 상품을 생성합니다.
- `patchProduct(productId, updatedData)`: 기존 상품을 수정합니다.
- `deleteProduct(productId)`: 상품을 삭제합니다.

