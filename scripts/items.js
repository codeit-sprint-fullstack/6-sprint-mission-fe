let products;
let favoriteProducts;

async function RequestAPI(URL) {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('네트워크 응답이 실패했습니다.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API 요청에 실패했습니다:', error);
    }
}

async function fetchData() {
    products = await RequestAPI('https://panda-market-api.vercel.app/products?page=1&pageSize=10&orderBy=recent');
    favoriteProducts = await RequestAPI('https://panda-market-api.vercel.app/products?page=1&pageSize=10&orderBy=favorite');

    // 받아온 데이터 처리
    console.log(products)
    console.log(favoriteProducts)
}

fetchData();