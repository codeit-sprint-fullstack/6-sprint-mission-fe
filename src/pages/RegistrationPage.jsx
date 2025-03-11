import style from "./RegistrationPage.module.css";
import {
  GetProductList,
  GetProduct,
  CreateProduct,
  PatchProduct,
  DeleteProduct,
} from "../api/ProductService";

const RegistrationPage = () => {
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
          placeholder="상품을 입력해주세요"
        />
        <div id="itemTitle-error-message"></div>
      </form>

      <form>
        <label className={style.itemContent} htmlFor="inputContent">
          상품 소개
        </label>
        <input
          className={style.inputItemContent}
          placeholder="상품 소개를 입력해주세요"
        />
        <div id="itemContent-error-message"></div>
      </form>

      <form>
        <label className={style.itemPrice} htmlFor="input-itemPrice">
          판매가격
        </label>
        <input
          className={style.inputItemPrice}
          placeholder="판매 가격을 입력해주세요"
        />
        <div id="itemPricd-error-message"></div>
      </form>

      <form>
        <label className={style.itemTag} htmlFor="input-itemTag">
          태그
        </label>
        <input
          className={style.inputItemTag}
          placeholder="태그를를 입력해주세요"
        />
        <div id="itemTitle-error-message"></div>
      </form>
    </div>
  );
};

export default RegistrationPage;
