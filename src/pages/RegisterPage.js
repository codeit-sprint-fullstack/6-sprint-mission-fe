import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import Tag from "../components/Tag";
import { useEffect, useState } from "react";
import { useValidation } from "../hooks/useValidation";
import api from "../api/index.api";

function RegisterPage() {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [priceInput, setPriceInput] = useState();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { valids, validate } = useValidation();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nameInput,
      description: descriptionInput,
      price: priceInput,
      tags: tags,
    };

    const item = await api.items.createItem(data);
    if (item) {
      navigate(`/items/${item._id}`);
    }
  };

  const handleChange = (e, name) => {
    if (name === "name") {
      setNameInput(e.target.value);
    } else if (name === "description") {
      setDescriptionInput(e.target.value);
    } else if (name === "price") {
      setPriceInput(e.target.value);
    } else if (name === "tag") {
      setTagInput(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleClickDelete = (t) => {
    setTags(tags.filter((tag) => tag !== t));
  };

  useEffect(() => {
    validate("name", nameInput);
    validate("description", descriptionInput);
    validate("price", priceInput);
    validate("tag", tagInput);
    if ((valids.name == "" && valids.description == "", valids.price == "")) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [nameInput, descriptionInput, priceInput, tags]);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles["input-container"]}>
        <div className={styles.top}>
          <p className={styles.title}>상품 등록하기</p>
          <button
            className={
              isSubmit
                ? styles["register-button"]
                : styles["register-button-disabled"]
            }
            to="/items"
            type="submit"
          >
            등록
          </button>
        </div>
        <div className={styles.name}>
          <label className={styles["sub-title"]}>상품명</label>
          <input
            className={styles["input-name"]}
            placeholder="상품명을 입력해주세요"
            onChange={(e) => handleChange(e, "name")}
          />
          <p className={styles["error-message"]}>{valids.name}</p>
        </div>
        <div className={styles.description}>
          <label className={styles["sub-title"]}>상품 소개</label>
          <textarea
            className={styles["input-description"]}
            placeholder="상품 소개를 입력해주세요"
            onChange={(e) => handleChange(e, "description")}
          />
          <p className={styles["error-message"]}>{valids.description}</p>
        </div>
        <div className={styles.price}>
          <label className={styles["sub-title"]}>판매가격</label>
          <input
            className={styles["input-price"]}
            placeholder="판매가격을 입력해주세요"
            onChange={(e) => handleChange(e, "price")}
          />
          <p className={styles["error-message"]}>{valids.price}</p>
        </div>
        <div className={styles.tag}>
          <label className={styles["sub-title"]}>태그</label>
          <input
            onChange={(e) => handleChange(e, "tag")}
            className={styles["input-tag"]}
            placeholder="태그를 입력해주세요"
            value={tagInput}
            onKeyDown={handleKeyDown}
          />
          <p className={styles["error-message"]}>{valids.tag}</p>
          <div>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                tag={tag}
                handleClickDelete={handleClickDelete}
              ></Tag>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
