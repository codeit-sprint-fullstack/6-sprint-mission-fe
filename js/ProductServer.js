import axios from "axios"
const instance=axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/",
})

export const getProductList=async(params)=>{
  try{
      const res=await instance.get("/products",{params});
      return res.data;
  }catch(error){
    console.error("Error fetching data",error);
  }};

  export const getProduct = async (id) => {
    try {
      const res = await instance.get(`/products/${id}`);
      if (res.status === 200) {
        return res.data;
      } else {
        console.warn(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.error(id);
    }
  };
  export const createProduct=async(data)=>{
    try{
      const res=await instance.post("/products",data)
      return res.data;
    }catch(error){
      console.error(("Error fetching data:",error))
    }}

    export const patchProduct = async (id, data) => {
      try {
        const res = await instance.patch(`/products/${id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          return res.data;
        } else {
          return res.status
        }
      } catch (error) {
        console.log("Error updating product:", id);
      }
    };
    
export const deleteProduct= async(id)=>{
  try{
    const product = await getProduct(id); // 삭제 전 확인
    if (!product) {
      console.warn(`Product with ID ${id} not found. Cannot delete.`);
      return;
    }
      const res=await instance.delete(`/products/${id}`)
      if(res.status===200){
          return res.data;
      } else{        
        console.warn(`Unexpected response status: ${res.status}`);}


  }catch(error){
    console.error("Error fetching data:",error)
  }
};

