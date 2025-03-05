function Product() {
  return (
    <nav>
      <div>판매 중인 상품</div>
      <div>검색할 상품을 입력해주세요</div>
      <button type="button">상품 등록하기</button>
      <select>
        <option>최신순</option>
        <option>좋아요순</option>
      </select>
    </nav>
  );
}

export default Product;
