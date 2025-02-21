//  need to import functions from ArticleService.js and ProductService.js
import { createArticle, getArticleList, getArticle } from "./ArticleService.js";

// test articleContent vars for createArticle
const articleContent = {
  "title": "F1 Ferrari Driver - Lewis Hamilton",
  "content": "This is part of mission 4",
  "image": "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/hamilton"
};

const articleContent2 = {
  "title": "F1 Red Bull Racing Driver - Max Verstappen",
  "content": "Box Box",
  "image": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/verstappen"
};

const articleContent3 = {
  "title": "F1 Williams Driver - Carlos Sainz",
  "content": "Box Box", // try to patch this content info and below image link 
  "image": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/verstappen" 
};

const articleContent4 = {
  "title": "F1 McLaren Driver - Lando Norris", // Different title
  "content": "It's lights out and away we go!", // Different content
  "image": "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/norris" // Different image
};


// * remove try catch here
//test code
async function init() {
  // test getArticleList 
  try {
  const list = await getArticleList("Lewis Hamilton");

  // test getArticle 
  const id = 555;
  const article = await getArticle(id);
  
  // test createArticle
  const newArticle = await createArticle(articleContent4);
  } catch (error) {
    console.error("Error:", error);
  }
}

init();