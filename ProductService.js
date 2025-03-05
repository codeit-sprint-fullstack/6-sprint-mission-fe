


//Get 메서드를 이용하여 제품 목록을 가져오는 함수
async function getProductList(page = 1, pageSize = 10, keyword = '?') {
    const url = `https://panda-market-api-crud.vercel.app/products/?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
    } catch (e) {
        console.error(e)
    }
}

//테스트
//getProductList(1, 10, '삼성')




//get 메서드를 이용하여 제품 하나를 가져오는 함수
async function getProduct(id) {
    const url = `https://panda-market-api-crud.vercel.app/products/${id}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
    } catch(e) {
        console.error(e)
    }
}

//테스트
//getProduct(496)




//post 메서드를 이용하여 제품 목록을 만드는 함수
async function createProduct(name, description, price, tags, image) {
    const url =  'https://panda-market-api-crud.vercel.app/products'
    try {
        const requestBody = {
            name: name,
            description: description,
            price: price,
            tags: [tags],
            images:[image]
        }
    
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        const data = await res.json()
        console.log(data)

    } catch(e) {
        console.error(e)
    }
}

//테스트
//createProduct('새로운 상품이름', '이건 새로운 상품입니다.', 100, '새제품', 'http://examle.com/..')




//patch 메소드를 사용하여 제품목록을 수정하는 함수
async function patchProduct(id, name, description, price, tags, images) {
    const url = `https://panda-market-api-crud.vercel.app/products/${id}`

    try {
        const requestBody = {
            name: name,
            description: description,
            price: price,
            tags: [tags],
            images: [images]
        }

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        const data = await res.json()
        console.log(data)
    } catch(e) {
        console.error(e)
    }
}

//테스트
//patchProduct(497, '새로운 상품dlwlfhd', '이건 새로운 상품입니다.', 100, '새제품', 'http://examle.com/..')




//delete 함수를 이용하여 제품 목록을 삭제하는 함수
async function deleteProduct(id) {
    const url = `https://panda-market-api-crud.vercel.app/products/${id}`

    try {
        const res = await fetch(url, {
            method: 'DELETE',
        })
        const data = await res.json()
        console.log(data)
    } catch {
        console.error(e)
    }
}
//테스트
//deleteProduct(497)

export{getProductList, getProduct, createProduct, patchProduct, deleteProduct}