import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./services/ArticleService.js";

//ArticleService.js 검증 함수.
getArticleList(1,2).then(data => console.log("getArticleList: ", data));
getArticle(7).then(data => console.log("getArticle: ", data));
const settingBody = {
  "title": "string",
  "content": "string",
  "image": "string"
};
createArticle(settingBody).then(console.log);
patchArticle(7, settingBody).then(console.log);
deleteArticle(6).then(console.log);