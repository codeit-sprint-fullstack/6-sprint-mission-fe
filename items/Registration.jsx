import Tags from "./Tags/Tags";
import style from "./Registration.module.scss";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { postProduct } from "../../api/productsApi";
import { useEffect, useState } from "react";
import useValidation from "../../hooks/useValidation";

// 유효성 검증
const errMsg = {
  name: "10글자 이내로 입력해주세요.",
  description: "10 ~ 100글자 이내로 입력해주세요.",
  price: "숫자만 입력해주세요.",
  tags: "5글자 이내로 입력해주세요.",
};

const INITIAL_BODY = { name: "", description: "", price: "", tags: [] };

const Registration = () => {
  const [body, setBody] = useState(INITIAL_BODY);
  const [tag, setTag] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [registrationBtnOn, setRegistrationBtnOn] = useState(false);
  const [errVisible, checkValidation] = useValidation();
  const navigate = useNavigate();

  // body 업데이트
  const changeValue = (e) => {
    const { id, value } = e.target;

    if (id === "tags") {
      setTag(value);
    } else if (id === "price") {
      setBody((prevBody) => ({
        ...prevBody,
        price: Number(value) ? Number(value) : value,
      }));
    } else {
      setBody((prevBody) => ({ ...prevBody, [id]: value }));
    }

    // 유효성 검사 Custom Hook
    checkValidation(e);
  };

  // 등록 버튼 활성화
  useEffect(() => {
    const { name, description, price, tags } = body;
    const {
      name: errName,
      description: errDescription,
      price: errPrice,
      tags: errTags,
    } = errVisible;

    const validation =
      name &&
      description &&
      Number(price) &&
      tags.length &&
      !errName &&
      !errDescription &&
      !errPrice &&
      !errTags;

    if (validation) {
      setRegistrationBtnOn(true);
      setDisabled(false);
    } else {
      setRegistrationBtnOn(false);
      setDisabled(true);
    }
  }, [body, errVisible]);

  // 상품 등록
  const createProduct = async (e) => {
    e.preventDefault();

    const product = await postProduct(body);
    setBody(INITIAL_BODY);
    navigate(`/items/${product.id}`);
  };

  // 태그 등록
  const createTag = (e) => {
    const { value } = e.target;

    if (e.key === "Enter") {
      e.preventDefault();
      if (value === "" || 5 < value.length || body.tags.includes(value)) return;
      setBody((prevBody) => ({ ...prevBody, tags: [...prevBody.tags, value] }));
      setTag("");
    }
  };

  // 태그 삭제
  const deleteTag = (value) => {
    const newTagArray = body.tags.filter((tag) => tag !== value);

    setBody((prevBody) => ({ ...prevBody, tags: [...newTagArray] }));
  };

  return (
    <>
      <Helmet>
        <title>판다마켓 | 상품 등록</title>
      </Helmet>
      <form onSubmit={createProduct} className={style.registrationForm}>
        <div className={style.registrationHeaderContainer}>
          <div className={style.registrationHeader}>
            <h1 className={style.registrationTxt}>상품 등록하기</h1>
            <button
              type="submit"
              className={`${style.registrationBtn} ${
                registrationBtnOn ? style.on : null
              }`}
              disabled={disabled}
            >
              등록
            </button>
          </div>
        </div>
        <main className={style.registrationInputContainer}>
          <section className={style.inputBox}>
            <p className={style.inputTitle}>상품명</p>
            <input
              onChange={changeValue}
              value={body.name}
              className={`${style.registrationInput} ${
                errVisible.name ? style.errorInput : null
              }`}
              type="text"
              name="name"
              id="name"
              placeholder="상품명을 입력해주세요"
            />
            <p className={style.errorMsg}>
              {errVisible.name ? errMsg.name : null}
            </p>
          </section>
          <section className={style.inputBox}>
            <p className={style.inputTitle}>상품 소개</p>
            <textarea
              onChange={changeValue}
              value={body.description}
              className={`${style.registrationInput} ${style.descriptionBox} ${
                errVisible.description ? style.errorInput : null
              }`}
              name="description"
              id="description"
              placeholder="상품 소개를 입력해주세요"
            />
            <p className={style.errorMsg}>
              {errVisible.description ? errMsg.description : null}
            </p>
          </section>
          <section className={style.inputBox}>
            <p className={style.inputTitle}>판매 가격</p>
            <input
              onChange={changeValue}
              value={body.price}
              className={`${style.registrationInput} ${
                errVisible.price ? style.errorInput : null
              }`}
              type="text"
              name="price"
              id="price"
              placeholder="판매 가격을 입력해주세요"
            />
            <p className={style.errorMsg}>
              {errVisible.price ? errMsg.price : null}
            </p>
          </section>
          <section className={style.inputBox}>
            <p className={style.inputTitle}>태그</p>
            <input
              onChange={changeValue}
              onKeyDown={createTag}
              value={tag}
              className={`${style.registrationInput} ${
                errVisible.tags ? style.errorInput : null
              }`}
              type="text"
              name="tags"
              id="tags"
              placeholder="태그를 입력해주세요"
            />
            <p className={style.errorMsg}>
              {errVisible.tags ? errMsg.tags : null}
            </p>
          </section>
          <Tags tags={body.tags} deleteTag={deleteTag} />
        </main>
      </form>
    </>
  );
};

export default Registration;
