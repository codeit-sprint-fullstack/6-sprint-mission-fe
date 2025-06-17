"use client";

import React, { useEffect, useState } from "react";
import ItemForm from "../../_components/ItemForm";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { productService } from "@/lib/service/productService";
import { Product } from "@/types";

function EditItemPage() {
  const { id } = useParams();
  const [values, setValues] = useState<
    Pick<Product, "name" | "description" | "price" | "tags" | "images">
  >({
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: [],
  });

  const { data: item } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(Number(id)),
  });

  useEffect(() => {
    if (item) {
      setValues({ ...item });
    }
  }, [item]);

  return <ItemForm values={values} setValues={setValues} />;
}

export default EditItemPage;
