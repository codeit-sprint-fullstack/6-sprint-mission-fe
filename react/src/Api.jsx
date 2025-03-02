import { useEffect, useState } from "react";

export async function productData() {
  try {
    const response = await fetch(
      "https://panda-market-api.vercel.app/docs/products",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error; // Optionally rethrow the error to propagate it further
  }
}

// React 컴포넌트 정의
function Api() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await productData();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Api;
