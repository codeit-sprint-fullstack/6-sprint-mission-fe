import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../hooks/useProducts";
import "./productregist.css";

export default function Productregist() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (name.length < 1 || name.length > 10) {
      newErrors.name = "1자 이상 10자 이내로 입력해주세요.";
    }
    if (description.length < 10 || description.length > 100) {
      newErrors.description = "10자 이상 100자 이내로 입력해주세요.";
    }
    if (!/^[0-9]+$/.test(price)) {
      newErrors.price = "숫자만 입력해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.length > 0 && tagInput.length <= 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const productData = {
      name,
      description,
      price: Number(price),
      tags: tags.join(","),
    };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        alert("상품이 등록되었습니다.");
        setName("");
        setDescription("");
        setPrice("");
        setTags([]);
        navigate("/items");
      } else {
        const errorData = await response.json();
        alert(`상품 등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("등록 중 오류 발생", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="productregist-container">
      <div className="productregist-header">
        <h2 className="productregist-title">상품 등록하기</h2>
        <button
          onClick={handleSubmit}
          disabled={!name || !description || !price}
          className="productregist-button"
        >
          등록
        </button>
      </div>
      <div>
        <label className="productregist-info">상품명</label>
        <input
          placeholder="상품명을 입력해주세요"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`productregist-input ${errors.name ? "error" : ""}`}
        />
        {errors.name && <p className="productregist-error">{errors.name}</p>}
      </div>
      <div>
        <label className="productregist-info">상품 소개</label>
        <textarea
          placeholder="상품 소개를 입력해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`productregist-textarea ${
            errors.description ? "error" : ""
          }`}
        />
        {errors.description && (
          <p className="productregist-error">{errors.description}</p>
        )}
      </div>
      <div>
        <label className="productregist-info">판매가격</label>
        <input
          placeholder="판매 가격을 입력해주세요"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`productregist-input ${errors.price ? "error" : ""}`}
        />
        {errors.price && <p className="productregist-error">{errors.price}</p>}
      </div>
      <div>
        <label className="productregist-info">태그</label>
        <input
          placeholder="태그를 입력해주세요"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleTagKeyPress}
          className="productregist-input"
        />
      </div>
      <div className="productregist-tag-container">
        {tags.map((tag, index) => (
          <span key={index} className="productregist-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
