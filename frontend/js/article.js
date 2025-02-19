import axios from "axios";

// https://panda-market-api-crud.vercel.app/docs 명세표

const getArticleListURL = 'https://panda-market-api-crud.vercel.app/products?page=1&pageSize=10&orderBy=recent';
const getArticleList = async () => {
  const res = await axios.get(getArticleListURL);
  return res.data;
};
const list = await getArticleList();
console.log(list);
