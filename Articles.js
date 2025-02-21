const BASE_URL = 'https://sprint-mission-api.vercel.app/articles';

// 게시글 목록 서치
function getArticleList(page, pageSize, keyword) {
    const url = new URL(BASE_URL);
    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);
    url.searchParams.append('keyword', keyword);

    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        return response.json();
    })
    .then(articles => {
        console.log(articles);
    })
    .catch(error => {
        console.error('게시글 목록을 가져오지 못했습니다.', error);
    });
}

// 게시글 서치
function getArticle(articleId) {
    const url = new URL(`${BASE_URL}/${articleId}`);

    fetch(url, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        return response.json();
    })
    .then(article => {
        console.log(article);
    })
    .catch(error => {
        console.error('게시글을 가져오지 못했습니다.', error);
    });
}

// 게시글 생성
function createArticle(title, content, image) {
    const url = new URL(BASE_URL);

    const articleData = {
        title: title,
        content: content,
        image: image
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        return response.json();
    })
    .then(newArticle => {
        console.log(newArticle);
    })
    .catch(error => {
        console.error('게시글을 생성하지 못했습니다.', error);
    });
}

// 게시글을 업데이트
function patchArticle(articleId, updatedData) {
    const url = new URL(`${BASE_URL}/${articleId}`);

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        return response.json();
    })
    .then(updatedArticle => {
        console.log(updatedArticle);
    })
    .catch(error => {
        console.error('게시글을 업데이트하지 못했습니다.', error);
    });
}

// 게시글 삭제
function deleteArticle(articleId) {
    const url = new URL(`${BASE_URL}/${articleId}`);

    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답 오류');
        }
        console.log(`ID: ${articleId} 게시글이 삭제되었습니다!`);
    })
    .catch(error => {
        console.error('게시글을 삭제하지 못했습니다.', error);
    });
}

