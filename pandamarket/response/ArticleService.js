const url = new URL('https://sprint-mission-api.vercel.app/articles')

// export const getArticleList = async (params = { page: 1, pageSize: 100, key: '' }) => {
//     try {
//         const res = await instance.get(`/`, {params})
//         return res.data
//     } catch(e) {
//         if(e.response) {
//             console.log(e.response.status)
//             console.log(e.response.data)
//         } else {
//             console.log('request failed')
//         }
//     }
// }
export const getArticleList = (params = { page: 1, pageSize: 100, key: '' }) => {
    Object.keys(params).forEach(key=>url.searchParams.append(key, params[key]))
    return fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error('HTTP error!')
                }
                return response.json()
            })
            // .then(data => data)
            .catch(error => {
                console.error('request failed', error)
            })

}

// const articles = await getArticleList({
//     keyword: '겨울'
// })
// console.log(articles)
const baseURL = 'https://sprint-mission-api.vercel.app/articles'

export const getArticle = async id => {
    
    return fetch(baseURL + `/${id}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('HTTP error!')
                }
                return response.json()
            })
            // .then(data => data)
            .catch(error => {
                console.error('request failed', error)
                // console.log(error)
            })
}

// const articles = await getArticle(144)
// console.log(articles)
// export const getArticle = async id => {
//     try {
//         const res = await instance.get(`/${id}`)
//         return res.data
//     } catch (e) {
//         if(e.response) {
//             console.log(e.response.status)
//             console.log(e.response.data)
//         } else {
//             console.log('request failed')
//         }
//     }
// }

export const createArticle = async data => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('HTTP error!')
        }
        return response.json()
    })
    // .then(data => data)
    .catch(error => {
        console.error('request failed', error)
        // console.log(error)
    })
}


const article_data = {"title":"테스트 게시글JW","content":"테스트 게시글 내용JW"}
const carticle = await createArticle(article_data)
console.log(carticle)

// export const createArticle = async data => {
//     try {
//         const res = await instance.post('/', data)
//         return res.data
//     } catch(e){
//         if(e.response) {
//             console.log(e.response.status)
//             console.log(e.response.data)
//         } else {
//             console.log('request failed')
//         }
//     }
// }
export const patchArticle = async (id, data) => {
    return fetch(baseURL + `/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('HTTP error!')
        }
        return response.json()
    })
    // .then(data => data)
    .catch(error => {
        console.error('request failed', error)
        // console.log(error)
    })
}

// export const patchArticle = async (id, data) => {
//     try {
//         const res = await instance.patch(`/${id}`, data)
//         return res.data
//     } catch (e) {
//         if(e.response) {
//             console.log(e.response.status)
//             console.log(e.response.data)
//         } else {
//             console.log('request failed')
//         }
//     }
// }



// export const deleteArticle = async id => {
//     try {
//         const res = await instance.delete(`/${id}`)
//         return res.data
//     } catch (e) {
//         if(e.response) {
//             console.log(e.response.status)
//             console.log(e.response.data)
//         } else {
//             console.log('request failed')
//         }
//     }
// }

export const deleteArticle = async id => {
    return fetch(baseURL + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('HTTP error!')
        }
        return response.json()
    })
    // .then(data => data)
    .catch(error => {
        console.error('request failed', error)
        // console.log(error)
    })
}