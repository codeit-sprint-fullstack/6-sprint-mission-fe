import style from "./RegistrationPage.module.css";
import {
  GetProductList,
  GetProduct,
  CreateProduct,
  PatchProduct,
  DeleteProduct,
} from "../api/ProductService";
import { useEffect, useState } from "react";

const RegistrationPage = () => {
  const [itemTitle, setItemTitle] = useState("");
  const [itemContent, setItemContent] = useState("");
  const [isContentError, setIsError] = useState(false);
  const [itemPrice, setItemPrice] = useState("");
  const [itemTag, setItemTag] = useState("");

  //item Title의 input border 핸들러
  const handleChangeItemTitle = (e) => {
    const value = e.target.value;
    setItemTitle(value);
    if (value.trim().length > 10) {
      e.target.style.border = "1px solid #f74747";
    } else {
      e.target.style.border = "";
    }
  };

  //item content의 input border 핸들러
  const handleChangeItemContent = (e) => {
    const value = e.target.value;
    setItemContent(value);
    if (value.trim().length < 10) {
      e.target.style.border = "1px solid #f74747";
    } else {
      e.target.style.border = "";
    }
  };
  //item content의 error 메세지 T/F
  useEffect(() => {
    itemContent.trim().length < 10 && itemContent.trim().length > 0
      ? setIsError(true)
      : setIsError(false);
  }, [itemContent]);

  //item Price의 input border 핸들러
  const handleChangeItemPrice = (e) => {
    const value = e.target.value;
    setItemPrice(value);
    if (isNaN(itemPrice)) {
      e.target.style.border = "1px solid #f74747";
    } else {
      e.target.style.border = "";
    }
  };

  //item Tag의 input border 핸들러
  const handleChangeItemTag = (e) => {
    const value = e.target.value;
    setItemTag(value);
    if (value.trim().length > 5) {
      e.target.style.border = "1px solid #f74747";
    } else {
      e.target.style.border = "";
    }
  };

  return (
    <div className={style.registrationMain}>
      <div className={style.header}>
        <h1 className={style.itemRegist}>상품 등록하기</h1>
        <button className={style.regist}>등록</button>
      </div>

      <form>
        <label className={style.itemTitle} htmlFor="input-itemTitle">
          상품명
        </label>
        <input
          className={style.inputItemTitle}
          placeholder="상품명을 입력해주세요"
          value={itemTitle}
          onChange={handleChangeItemTitle}
        />
        {itemTitle.trim().length > 10 && (
          <div className={style.errorMessage}>10자 이내로 입력해주세요</div>
        )}
      </form>

      <form>
        <label className={style.itemContent} htmlFor="inputContent">
          상품 소개
        </label>
        <input
          className={style.inputItemContent}
          placeholder="상품 소개를 입력해주세요"
          value={itemContent}
          onChange={handleChangeItemContent}
        />
        {isContentError && (
          <div className={style.errorMessage}>10자 이상 입력해주세요</div>
        )}
      </form>

      <form>
        <label className={style.itemPrice} htmlFor="input-itemPrice">
          판매가격
        </label>
        <input
          className={style.inputItemPrice}
          placeholder="판매 가격을 입력해주세요"
          value={itemPrice}
          onChange={handleChangeItemPrice}
        />
        {isNaN(itemPrice) && (
          <div className={style.errorMessage}>숫자로 입력해주세요</div>
        )}
      </form>

      <form>
        <label className={style.itemTag} htmlFor="input-itemTag">
          태그
        </label>
        <input
          className={style.inputItemTag}
          placeholder="태그를 입력해주세요"
          value={itemTag}
          onChange={handleChangeItemTag}
        />
        {itemTag.trim().length > 5 && (
          <div className={style.errorMessage}>5글자 이내로 입력해주세요</div>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;
