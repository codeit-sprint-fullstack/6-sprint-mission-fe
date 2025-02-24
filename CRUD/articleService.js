import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/articles",
});

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

// 게시글 목록 조회
const getArticleList = (options) => {
  return instance
    .get("/", { params: options })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      handleError(e);
    });
};

// const a = {
//   page: 1,
//   pageSize: 15,
// };

// console.log(await getArticleList());

// 게시글 등록
const createArticle = (article) => {
  return instance
    .post("/", article)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      handleError(e);
    });
};

// const a = {
//   title: "세상에서 제일 맛있는 빵",
//   content: "맛과 모양이 예쁜 최고의 빵을 소개합니다.",
//   image: "https://example.com/image.jpg",
// };

// console.log(await createArticle(a));

// 게시글 상세 조회
const getArticle = (id) => {
  return instance
    .get(`/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      handleError(e);
    });
};

// console.log(await getArticle(12));

// 게시글 수정
const patchArticle = (id, article) => {
  return instance
    .patch(`/${id}`, article)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      handleError(e);
    });
};

// const a = {
//   title: "세상에서 제일 맛있는 빵",
//   content: "맛과 모양이 예쁜 최고의 빵을 소개합니다.",
//   image: "https://example.com/image.jpg",
// };

// console.log(await patchArticle(12, a));

// 게시글 삭제
const deleteArticle = (id) => {
  return instance
    .delete(`/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      handleError(e);
    });
};

// console.log(await deleteArticle(60));

// 에러
const handleError = (e) => {
  if (e.response) {
    console.log(e.response.status);
    console.log(e.response.data);
  } else {
    console.log("응답 실패");
  }
};
