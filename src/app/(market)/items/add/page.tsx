"use client";

import React, { useState } from "react";
import ItemForm from "../_components/ItemForm";
import { Product } from "@/types";

function AddItemPage() {
  const [values, setValues] = useState<
    Pick<Product, "name" | "description" | "price" | "tags" | "images">
  >({
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: [],
  });

  return <ItemForm values={values} setValues={setValues} />;
}

export default AddItemPage;
