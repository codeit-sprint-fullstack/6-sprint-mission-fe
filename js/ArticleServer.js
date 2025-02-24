// [ ]import, export를 활용해 주세요.
// [ ]  이외의 코드들은 모두 main.js 파일에 작성해 주세요.
import axios from "axios";
const instance = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/",
});
export const getArticleList = async (params) => {
try {
  const res = await instance.get("/articles", { params }); // Assuming "/articles" as the endpoint
  return res.data;
} catch (error) {
  console.error("Error fetching data:");
}};
export const getArticle=async(id)=>{
  try{
    const res=await instance.get(`/articles/${id}`);
    return res.data;
  }catch (error){
      console.log("Error fetching data:");
  }};
export const createArticle=async(data)=>{
  try{
    const res=await instance.post("/articles",data);
    return res.data;
  }catch (error) {
    console.error("Error fetching data:");
  }};

export const patchArticle=async(id, data)=>{
  try{
    const res=await instance.patch(`/articles/${id}`,data,{
      headers:{"Content-Type":"application/json"},
    });
    if(res.status===200){
      return res.data;
    }else{
      return res.status
    }
  }catch(error){
    console.log("Error updating product:",id);
  }
}
export const deleteArticle=async(id)=>{
  try{
    const article=await getArticle(id);
    if(!article){
      console.warn(`Article with ID ${id} not found. Cannot delete`);
      return;
    }
    const res= await instance.delete(`/articles/${id}`)
    if(res.status===200){
      return res.data;
    }else{
      return res.status;
    }
  }catch(error){
    console.error("Error fetching data:")
  }
}
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
