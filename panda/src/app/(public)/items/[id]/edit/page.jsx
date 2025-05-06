"use client";

import React, { useState } from "react";
import ItemAEForm from "../_components/ItemAEForm";

function ProductEditPage({ item }) {
  // const [item, setItem] = useState([]);

  return (
    <main className="p-[32px] lg:px-[200px]">
      <ItemAEForm type="edit">상품 수정하기</ItemAEForm>
    </main>
  );
}

export default ProductEditPage;
