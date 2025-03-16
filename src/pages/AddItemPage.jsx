import { useState } from "react";
import styles from "./AddProductPage.module.css";
import { addProduct } from "../api";
import { Navigate } from "react-router-dom";

function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [tags, setTags] = useState([]);
  const [productId, setProductId] = useState(null);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const data = await addProduct({ name, description, price, tags });
      setProductId(data.id);
      console.log(data.id, "상품 등록 성공");
    } catch (e) {
      console.log("상품 등록 실패", e.message);
    }

    if (productId) {
      return <Navigate to={`/${productId}`} />;
    }
  };

  return (
    <form>
      <div className={styles.heading}>
        <div className={styles.title}>상품 등록하기</div>
        <button
          type="submit"
          // className={isItemValid ? "" : `${styles.disabled}`}
          onSubmit={handleCreateProduct}
        >
          등록
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <label>상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해주세요"
          />
        </div>
        <div className={styles.wrapper}>
          <label>상품 소개</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해주세요"
          />
        </div>
        <div className={styles.wrapper}>
          <label>판매가격</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해주세요"
          />
        </div>
        <div className={styles.wrapper}>
          <label>태그</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그를 입력해주세요"
          />
        </div>
      </div>
    </form>
  );
}

export default AddProductPage;
