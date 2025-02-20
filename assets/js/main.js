//  need to import functions from ArticleService.js and ProductService.js
import { createArticle, getArticleList, getArticle } from "./ArticleService.js";
const articleData = {
  "name": "article1",
  "description": "string",
  "price": 0,
  "manufacturer": "string",
  "tags": [
    "string"
  ],
  "images": [
    "string"
  ]
};


//test code
async function init() {
  try {
    const list = await getArticleList();
    console.log(list);
  } catch (error) {
    console.error('Error occurred while fetching article list:', error);
  }
  
}

init();