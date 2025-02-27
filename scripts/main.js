import * as articleService from "./ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

// product

const fetchProdcutList = async (options) => {
  const productList = await getProductList(options);
  console.log(productList);
  return productList;
};

const fetchProduct = async (id) => {
  const product = await getProduct(id);
  console.log(product);
  return product;
};

const fetchCreatProduct = async (product) => {
  const create = await createProduct(product);
  console.log(create);
  return create;
};

const fetchPatchProduct = async (id, product) => {
  const patch = await patchProduct(id, product);
  console.log(patch);
  return patch;
};

const fetchDeleteProduct = async (id) => {
  const remove = await deleteProduct(id);
  console.log(remove);
  return remove;
};

// article

const fetchArticleList = async (options) => {
  const articleList = await articleService.getArticleList(options);
  console.log(articleList);
  return articleList;
};

const fetchArticle = async (id) => {
  const article = await articleService.getArticle(id);
  console.log(article);
  return article;
};

const fetchCreateArticle = async (article) => {
  const create = await articleService.createArticle(article);
  console.log(create);
  return create;
};

const fetchPatchArticle = async (id, article) => {
  const patch = await articleService.patchArticle(id, article);
  console.log(patch);
  return patch;
};

const fetchDeleteArticle = async (id) => {
  const remove = await articleService.deleteArticle(id);
  console.log(remove);
  return remove;
};

fetchProdcutList();
fetchProduct();
fetchCreatProduct();
fetchPatchProduct();
fetchDeleteProduct();

fetchArticleList();
fetchArticle();
fetchCreateArticle();
fetchPatchArticle();
fetchDeleteArticle();