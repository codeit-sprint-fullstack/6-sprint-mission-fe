const base_URL = "https://panda-market-api.vercel.app/products";

export const getItem = async (productId) => {
  try {
    const res = await fetch(`${base_URL}/${productId}`);

    if (!res.ok) {
      throw new Error("데이터를 가져오지 못 했습니다");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export const patchItem = async ({ productId, data }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(`${base_URL}/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        images: [data.selectedImg],
        tags: data.itemTags,
        price: data.itemPrice,
        description: data.itemIntro,
        name: data.itemName,
      }),
    });
    const resText = await res.text();
    console.log("서버 응답:", resText);

    if (!res.ok) {
      throw new Error("수정에 실패했습니다.");
    }

    const result = await res.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getItems = async () => {
  try {
    const res = await fetch(`${base_URL}?page=28&pageSize=10`);

    if (!res.ok) {
      throw new Error("데이터를 가져오는 실패했습니다");
    }

    const result = res.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};
