// need to add export at the bottom of functions export {func1, func2, etc }

// getArticleList(): Use the GET method.
// Use query parameters `page`, `pageSize`, `keyword`.
// import axios from axios
async function getArticleList( params = {}) {
  const url = new URL('https://panda-market-api-crud.vercel.app/articles');
  Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
  });
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    // console.log(data);
  } catch (error) {
    console.error('Failed to fetch requested article list:', error);
    return null;
  }
}

// getArticleList({page: 1});
// async function getArticle() {

// }

// getArticle(): Use the GET method.

// createArticle(): Use the POST method.
// Include `title`, `content`, and `image` in the request body.

// patchArticle(): Use the PATCH method.

// deleteArticle(): Use the DELETE method.

// Use fetch or axios for making requests.
// If the response status code is not 2XX, log the error message to the console.

// Use .then() for handling asynchronous processing.

// Use .catch() for error handling.