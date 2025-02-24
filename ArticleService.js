// getArticleList()
export function getArticleList(page = 1, pagesize = 10, keyword = '') {
    const baseUrl = 'https://sprint-mission-api.vercel.app/articles';
    const url = new URL(baseUrl);
    
    url.searchParams.append('page', page);
    url.searchParams.append('pagesize', pagesize);
    if (keyword) {
        url.searchParams.append('keyword', keyword);
    }
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched articles:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}


// getArticle()
export function getArticle(id) {
    fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched article:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}


// createArticle()
export function createArticle(title, content, image) {
    fetch('https://sprint-mission-api.vercel.app/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, image })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Article created:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });
}


// patchArticle()
export function patchArticle(id, updatedData) {
    fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Article updated:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });
}


// deleteArticle
export function deleteArticle(id) {
    fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        console.log(`Article with id ${id} deleted successfully.`);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });
}
