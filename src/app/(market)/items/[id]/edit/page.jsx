"use client";

import React, { useEffect, useState } from "react";
import ItemForm from "../../_components/ItemForm";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/getApi";
import { useParams } from "next/navigation";

function EditItemPage() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    tags: [],
    images: [],
  });

  const { data: item } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  useEffect(() => {
    if (item) {
      setValues({ ...item });
    }
  }, [item]);

  return <ItemForm values={values} setValues={setValues} />;
}

export default EditItemPage;
