import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/articles",
});

// -------------------------에러 처리-----------------------------
const handleError = (e) => {
  if (e.response) {
    console.log(e.response.status);
    console.log(e.response.data);
  } else {
    console.log("requeset failed");
  }
};

// --------------------------전체 조회-----------------------------
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
//   pageSize: 10,
// };

// console.log(await getArticleList());

// --------------------------상세 조회-----------------------------
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

// console.log(await getArticle(17));

// --------------------------리뷰 생성-----------------------------
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
//   title: "string",
//   content: "string",
//   image: "string",
// };

// console.log(await createArticle(a));

// --------------------------리뷰 수정-----------------------------
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
//   title: "string",
//   content: "string",
//   image: "string",
// };

// console.log(await patchArticle(17, a));

// --------------------------리뷰 삭제-----------------------------
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

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
