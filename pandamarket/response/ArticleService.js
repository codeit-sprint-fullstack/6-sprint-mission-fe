const url = new URL("https://sprint-mission-api.vercel.app/articles");
const baseURL = "https://sprint-mission-api.vercel.app/articles";

export const getArticleList = async (
  params = { page: 1, pageSize: 100, key: "" }
) => {
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}:${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getArticle = async (id) => {
  return fetch(baseURL + `/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}:${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createArticle = async (data) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}:${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const patchArticle = async (id, data) => {
  return fetch(baseURL + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}:${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteArticle = async (id) => {
  return fetch(baseURL + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}:${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};
