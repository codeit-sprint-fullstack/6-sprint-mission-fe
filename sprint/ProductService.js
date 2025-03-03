export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  const url = new URL("https://sprint-mission-api.vercel.app/products");
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function createProduct(productData) {
  try {
    const res = await fetch("https://sprint-mission-api.vercel.app/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function patchProduct(id, productData) {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(
      `https://sprint-mission-api.vercel.app/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
