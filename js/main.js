import { 
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
}from "./ArticleServer.js"
// https://panda-market-api-crud.vercel.app/docs/#/Article/DeleteArticle
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
}from "./ProductServer.js"

(async () => {
  const articles = await getArticleList({
    page: 1,
    pageSize: 100,
    keyword:"푸른",
  });
  console.log(articles);

  const article=await getArticle(420)
  console.log("The article is:",article);

  const articleData={
    title:"푸른빛",
    content:"우리 놀러갈래?",
    image:"https://unsplash.com/photos/blue-ocean-sky",
  };
  const newArticle=await createArticle(articleData);
  console.log("Created Article:",newArticle)

  const deletedArticle= await deleteArticle(549)
  console.log("deletedArticle:",deletedArticle)

  const updatedArticle=await patchArticle(420,{
    title: '방가링',
    content: '푸른바다와 햄토리',
    image: 'https://example.com/...',
    
  })
  console.log("Updated Article:",updatedArticle)
})();

(async()=>{
  const products=await getProductList({
    page:1,
    pageSize:10,
    keyword:"야심작"
  })
  console.log("All products are:",products);


  const product=await getProduct(519)
  console.log("The product is:",product)
  const newProduct=await createProduct({
      images:"https://unsplash.com/photos/pElSkGRA2NU",
      tags:"전자제품",
      price: 10000,
      description: "최신형 티비",
      name: "멋진티비"
  })
  console.log("Created Product:",newProduct)

  const deletedProduct=await deleteProduct(530)
  console.log(deletedProduct)

  const updatedProduct=await patchProduct(545,{
    images: "https://unsplash.com/photos/pElSkGRA2NU",
    tags: "전자제품",
    price: 10000,
    description: "최신형 티비입니다",
    name: "어썸티비",
  });
  console.log("Updated Product:", updatedProduct)

})();