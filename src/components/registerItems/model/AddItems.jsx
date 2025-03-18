import React, { useState } from "react";
import styles from "./AddItems.module.css";

const AddItems = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  // 태그 추가 함수
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && inputTag.trim()) {
      setTags([...tags, inputTag.trim()]);
      setInputTag("");
      e.preventDefault();
    }
  };

  // 태그 삭제 함수
  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 등록 버튼 활성화 조건
  const isSubmitDisabled = !productName || !productDescription || !price;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>상품 등록하기</h2>

      {/* 상품명 */}
      <label className={styles.label}>상품명</label>
      <input
        type="text"
        className={styles.input}
        placeholder="상품명을 입력해주세요"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      {/* 상품 소개 */}
      <label className={styles.label}>상품 소개</label>
      <textarea
        className={styles.textarea}
        placeholder="상품 소개를 입력해주세요"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />

      {/* 판매 가격 */}
      <label className={styles.label}>판매 가격</label>
      <input
        type="number"
        className={styles.input}
        placeholder="판매 가격을 입력해주세요"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* 태그 입력 */}
      <label className={styles.label}>태그</label>
      <input
        type="text"
        className={styles.input}
        placeholder="태그를 입력해주세요"
        value={inputTag}
        onChange={(e) => setInputTag(e.target.value)}
        onKeyPress={handleTagKeyPress}
      />

      {/* 태그 리스트 */}
      <div className={styles.tagContainer}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag} <button onClick={() => handleTagRemove(tag)}>✖</button>
          </span>
        ))}
      </div>

      {/* 등록 버튼 */}
      <button
        className={`${styles.submitButton} ${
          isSubmitDisabled ? styles.disabled : ""
        }`}
        disabled={isSubmitDisabled}
      >
        등록
      </button>
    </div>
  );
};

export default AddItems;
