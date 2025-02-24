const url = new URL('https://sprint-mission-api.vercel.app/products');

/**
 * 상품 목록 조회
 * @param {number} page
 * @param {number} pageSize
 * @param {string} [keyword]
 */
export const getProductList = async (page=1, pageSize=100, keyword) => {
  try {
    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);
    if (keyword) {
      url.searchParams.append('keyword', keyword);
    }
    const response = await fetch(url);
    if (response.ok) {
      console.log(response.status, '성공');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 상품 상세 조회
 */
export const getProduct = async id => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (response.ok) {
      console.log(response.status, '성공');
    } else {
      console.log(response.status, '상품을 찾을 수 없음');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
    
}

/**
 * 상품 등록
 */
export const createProduct =  async () => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'string',
        description: 'string',
        price: 15000,
        manufacturer: 'string',
        tags: [
          'string'
        ],
        images: [
          'string'
        ]
      })
    });
    if (response.ok) {
      console.log(response.status, '성공');
    } else {
      console.log(response.status, '유효성 검사 오류');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 상품 수정
 */
export const patchProduct = async id => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '테스트 상품',
        description: 'API 테스트중',
        price: 20000,
        tags: [
          'string'
        ],
        images: [
          'string'
        ]
      })
    });
    if (response.ok) {
      console.log(response.status, '성공');
    } else {
      console.log(response.status, '상품을 찾을 수 없음')
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * 상품 삭제
 */
export const deleteProduct = async id => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log(response.status, '성공적으로 삭제됨');
    } else {
      console.log(response.status, '상품을 찾을 수 없음');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}