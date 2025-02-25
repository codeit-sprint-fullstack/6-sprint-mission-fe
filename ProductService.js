import axios from "axios"

//const baseURL = new URL(`https://sprint-mission-api.vercel.app/products`)

export const instance = axios.create({
    baseURL: 'https://sprint-mission-api.vercel.app/products' //문자열로 넣어줌
})

// getProductList() : GET 메서드를 사용해 주세요.
// [ ] page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.
export const getProductList = async (page, pageSize, keyword) => {
    try {
       const response = await instance.get(`/`, {
            params: {
                page,
                pageSize,
                keyword
            },
        })
        console.log(response.data)
    } catch(e){
        console.error(e)
    }
}

// createProduct() : POST 메서드를 사용해 주세요.
// [ ] request body에 name, description, price, tags, images 를 포함해 주세요.
export const createProduct = async (name, description, price, tags, images) => {
    try {
       const response = await instance.post(`/`, {
                name,
                description,
                price,
                tags,
                images
        })
        console.log(response.data)
    } catch(e){
        console.error(e)
    }
}

// [ ] patchProduct() : PATCH 메서드를 사용해 주세요.
export const patchProduct = async (id) => {
    try {
       const response = await instance.patch(`/${id}`, {
                name: "hsj",
                description: "hsj",
                price: 10000,
                tags: ["hsj"],
                images: ["hsj"]
        })
        console.log(response.data)
    } catch(e){
        console.error(e)
    }
}

// [ ] deleteProduct() : DELETE 메서드를 사용해 주세요.
export const deleteProduct = async (id) => {
    try {
       const response = await instance.delete(`/${id}`)
        console.log(response.data)
    } catch(e){
        console.error(e)
    }
}
