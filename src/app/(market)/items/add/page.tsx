"use client";

import React, { useState } from "react";
import ItemForm from "../_components/ItemForm";

function AddItemPage() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    images: [],
  });

  return <ItemForm values={values} setValues={setValues} />;
}

export default AddItemPage;
