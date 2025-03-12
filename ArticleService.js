


// GET 메서드를 사용하여 기사 목록을 가져오는 함수
function getArticleList(page = 1, pageSize = 10, keyword = '???') {
    const url = `https://panda-market-api-crud.vercel.app/articles/?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}, ${response.statusText}`);
        }
        return response.json();
      })

      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.error('Failed Your status is not 2XX', e);
      });
}

//테스트
//getArticleList(1,10,'게시글')
  



// GET 메서드를 사용하여 기사 하나를 가져오는 함수
function getArticle(id) {
    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}, ${response.statusText}`);
            }
            return response.json();
            })
        .then(data => {
        console.log(data);
        })
        .catch(e => {
        console.error(`Failed Cannot found ${id}:`, e);
        });
        
}
//테스트
//getArticle(429)
  



// POST 메서드를 사용하여 기사를 생성하는 함수
function createArticle(title, content, image) {
    const url = 'https://panda-market-api-crud.vercel.app/articles';

    const requestBody = {
        title: title,
        content: content,
        image: image
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(requestBody),
    })

    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.statusText}`);
        }
        return response.json();
        })

    .then(data => {
        console.log(data);
        })
    .catch(e => {
        console.error('Failed to create article:', e);
        });
}

//테스트
//createArticle('게시글 제목입니다',  'http://exaple.com/...' )
  



// PATCH 메서드를 사용하여 기사를 수정하는 함수
function patchArticle(id, title, content, image) {
    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

    const requestBody = {
        title: title,
        content: content,
        image: image
    };

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(requestBody),
    })

    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.statusText}`);
        }
        return response.json();
    })

    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.error(`Failed to update article with id ${id}:`, e);
    });
}
  
//테스트
//patchArticle('429', '수정한 게시글 제목입니다', '수정한 게시글입니다', 'http://exaple.com/...' )




// DELETE 메서드를 사용하여 기사를 삭제하는 함수
function deleteArticle(id) {
    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

    fetch(url, {
        method: 'DELETE',
    })

    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}, ${response.statusText}`);
        }
        console.log(`Article with id ${id} was deleted`);
    })
    .catch(e => {
        console.error(`Failed to delete article with id ${id}:`, e);
    });
}

export {getArticleList, getArticle, createArticle, patchArticle, deleteArticle}
  
//테스트
//deleteArticle(428)
