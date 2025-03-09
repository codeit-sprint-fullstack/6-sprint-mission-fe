import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './article_service.js'
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './product_service.js'

// article-data
const articleQuery = {
  page: 1,
  pageSize: 10,
  orderBy: 'recent',
  keyword: ''
}

const articlePostBody = {
  title: '삼성 갤럭시 S25 Ultra 구매후기',
  content: '디자인이 너무 깔끔하네요!',
  image: 'https://images.samsung.com/sec/smartphones/galaxy-s25-ultra/images/galaxy-s25-ultra-features-kv.jpg?imbypass=true'
}

const articlePatchBody = {
  title: '(수정)NVIDIA RTX 5090 구매후기',
  content: '비싼 가격 값 하는 것 같아요!',
  image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/rtx-5090/geforce-rtx-5090-learn-more-og-1200x630.jpg'
}

// Article API 함수 테스트
await getArticleList(articleQuery)

await getArticle(500)

await createArticle(articlePostBody)

await patchArticle(500, articlePatchBody)

await deleteArticle(300)


// product-data
const productQuery = {
  page: 1,
  pageSize: 10,
  orderBy: 'recent',
  keyword: ''
}

const productPostBody = {
  name: 'Samsung galaxy S25 Ultra',
  description: '2025년 삼성의 새로운 플래그십 스마트폰 출시',
  price: 1698400,
  tags: [ '스마트폰', '삼성', 'S25' ],
  images: [ 
    'https://images.samsung.com/kdp/goods/2025/01/15/cf939ac6-e80c-4af1-85cc-a0805d345aed.png?$944_550_PNG$',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6j0t0s-siCL2rl7qNpJFY4XT5EEEgn6Fx1Q&s'
  ]
}

const productPatchBody = {
  name: 'NVIDIA RTX 5090',
  description: 'NVIDIA의 새로운 야심작, RTX 5090',
  price: 2900000,
  tags: [ 'Graphic card', 'NVIDIA', '5090' ],
  images: [ 
    'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/rtx-5090/geforce-rtx-5090-learn-more-og-1200x630.jpg',
    'https://imageio.forbes.com/specials-images/imageserve/677edeef69d0ab19fe73be44/Nvidia-s-RTX-5080/960x0.jpg?height=399&width=711&fit=bounds'
  ]
}

// product API 함수 테스트
await getProductList(productQuery)

await getProduct(515)

await createProduct(productPostBody)

await patchProduct(517, productPatchBody)

await deleteProduct(514)