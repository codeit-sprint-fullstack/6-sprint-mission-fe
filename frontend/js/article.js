import axios from "axios";

const url = new URL("https://sprint-mission-api.vercel.app/articles"); // API

const getArticleList = () => {
  axios.get(url);
};
console.log(getArticleList());

const getArticle = () => {
  axios.get(url);
};
console.log(getArticle());

const patchArticle = () => {
  axios.patch(url);
};
console.log(patchArticle());

const deleteArticle = () => {
  axios.delete(url);
};
console.log(deleteArticle());
