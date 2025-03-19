import { useState } from "react";
import { addProduct } from "../../api/index";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./AddItemPage.module.css";
import useCheckValidity from "../../hooks/useCheckValidity";

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const {
    isInputValid,
    isNameValid,
    isDescriptionValid,
    isPriceValid,
    isTagsValid,
  } = useCheckValidity(name, description, price, tags);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const item = await addProduct({
        name,
        description,
        price: Number(price),
        tags: tags.split(",").map((tag) => tag.trim()),
      });
      if (item?._id) {
        navigate(`/items/${item._id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <div className={styles.heading}>
        <div className={styles.title}>상품 등록하기</div>
        <button
          type="submit"
          disabled={!isInputValid}
          className={styles.button}
        >
          등록
        </button>
      </div>
      <div className={styles.container}>
        <div className={isNameValid ? styles.wrapper : styles.error}>
          <label>상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해주세요"
          />
          {!isNameValid && <span>10자 이내로 입력해주세요</span>}
        </div>
        <div className={isDescriptionValid ? styles.wrapper : styles.error}>
          <label>상품 소개</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해주세요"
          />
          {!isDescriptionValid && <span>10자 이상 입력해주세요</span>}
        </div>
        <div className={isPriceValid ? styles.wrapper : styles.error}>
          <label>판매가격</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해주세요"
          />
          {!isPriceValid && <span>숫자로 입력해주세요</span>}
        </div>
        <div className={isTagsValid ? styles.wrapper : styles.error}>
          <label>태그</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그를 입력해주세요"
          />
          {!isTagsValid && <span>5글자 이내로 입력해주세요</span>}
        </div>
      </div>
    </form>
  );
}

export default AddItemPage;
