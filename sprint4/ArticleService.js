export const getArticleList = (page = 1, pageSize = 10, keyword = '') => {
    fetch(`https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        .then(response => {
            if (!response.ok) throw new Error(`${response.status}`);
            return response.json();
        })
        .then(data => console.log("Article List:", data))
        .catch(error => console.error(error));
};

export const getArticle = (id) => {
    fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
        .then(response => {
            if (!response.ok) throw new Error(`${response.status},`);
            return response.json();
        })
        .then(data => console.log("Article:", data))
        .catch(error => console.error(error));
};

export const createArticle = (title, content, image) => {
    fetch(`https://sprint-mission-api.vercel.app/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image }),
    })
        .then(response => {
            if (!response.ok) throw new Error(`${response.status}`);
            return response.json();
        })
        .then(data => console.log("Article Created:", data))
        .catch(error => console.error(error));
};

export const patchArticle = (id, updates) => {
    fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    })
        .then(response => {
            if (!response.ok) throw new Error(`${response.status}`);
            return response.json();
        })
        .then(data => console.log("Article Updated:", data))
        .catch(error => console.error(error));
};

export const deleteArticle = (id) => {
    fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error(`${response.status}`);
            return response.json();
        })
        .then(() => console.log("Article Deleted"))
        .catch(error => console.error(error));
};
