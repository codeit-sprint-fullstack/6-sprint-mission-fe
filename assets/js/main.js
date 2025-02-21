//  need to import functions from ArticleService.js and ProductService.js
import { createArticle, getArticleList, getArticle, patchArticle, deleteArticle  } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';
// test sample to check CRUD functionality of ArticleService.js
const articleContent1 = {
  'title': 'F1 Ferrari Driver - Lewis Hamilton',
  'content': 'This is part of mission 4',
  'image': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/hamilton'
};

const articleContent2 = {
  'title': 'F1 Red Bull Racing Driver - Max Verstappen',
  'content': 'Box Box',
  'image': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/verstappen'
};

const articleContent3 = {
  'title': 'F1 Williams Driver - Carlos Sainz',
  'content': 'Box Box', // try to patch this content info and below image link 
  'image': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/verstappen' 
};

// sample data for ProductService CRUD functions
const productContent1 = {
  'name': 'Scuderia Ferrari T-Shirt',
  'description': 'Show your support for the Ferrari F1 team with this stylish T-shirt featuring the team\'s logo and colors.',
  'price': 7600,
  'tags': ['F1', 'Formula 1', 'Ferrari', 'Team T-Shirt'],
  'images': ['https://f1store.formula1.com/en/images/scuderia-ferrari-2025-team-t-shirt.jpg']
};

const productContent2 = {
  'name': 'Mercedes-AMG Petronas Cap',
  'description': 'Support the Mercedes-AMG Petronas team with this stylish cap, featuring the team\'s logo.',
  'price': 5500,
  'tags': ['F1', 'Formula 1', 'Mercedes', 'Cap'],
  'images': ['https://f1store.formula1.com/en/images/mercedes-amg-petronas-cap.jpg']
};

const productContent3 = {
  'name': 'Red Bull Racing Hoodie',
  'description': 'Stay warm and show your allegiance to Red Bull Racing with this comfortable hoodie.',
  'price': 8500,
  'tags': ['F1', 'Formula 1', 'Red Bull', 'Hoodie'],
  'images': ['https://f1store.formula1.com/en/images/red-bull-racing-hoodie.jpg']
};

//test code
async function init() {
  try {
  // test ArticleService functions
  // test getArticleList 
  // const list = await getArticleList(undefined, undefined, 'F1');

  // test getArticle 
  // const id = 555;
  // const article = await getArticle(id);
  
  // test createArticle
  // const newArticle = await createArticle(articleContent3);

  // test patchArticle
  // const patchId = 555;
  // const patchContent = articleContent5;
  // const updatedArticle = await patchArticle(patchId, patchContent);

  // test deleteArticle
  // const deleteId = 555;
  // const deletedArticle = await deleteArticle(deleteId);

  // test ProductService functions

  // test getProductLIst
  // const productList = await getProductList(undefined, 1, "F1");

  // test getProduct
  // const product = await getProduct(551);

  // test createProduct
  // const createdProduct = await createProduct(productContent1);

  // test patchProduct - try fixing item id 555 with productContent3
  // const patchedProduct = await patchProduct(555, productContent2);

  // test deleteProduct
  const deletedProduct = await deleteProduct(559);
  } catch (error) {
    console.error('Error found:', error);
  }
}

init();