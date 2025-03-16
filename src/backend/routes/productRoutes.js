import express from "express";
import { Product } from "../model/productSchema.js";

const productRoutes = express.Router();

const handleError = (asyncFun) => {
  return async (req, res) => {
    try {
      await asyncFun(req, res);
    } catch (e) {
      switch (e.name) {
        case "ValidationError":
          res.status(400).send({ message: "유효성 검증 실패하였습니다." });
          return;
        case "CastError":
          res.status(400).send({ message: "잘못된 데이터가 입력되었습니다." });
          break;
        case "ReferenceError":
          res.status(500).send({ message: "참조할 수 없습니다." });
          return;
        default:
          res.status(500).send({ message: "서버에서 오류가 발생했습니다." });
          break;
      }
    }
  };
};

// 상품 목록조회
productRoutes.get(
  "/",
  handleError(async (req, res) => {
    const { keyword, orderBy, offset, limit } = req.query;
    // find
    const regex = { $regex: keyword ? keyword : "", $options: "i" };
    const selectFields = { id: 1, name: 1, price: 1, like: 1, createdAt: 1 };

    // sort
    const sort = { createdAt: orderBy === "recent" ? -1 : 1 };

    // skip
    const skip = (Number(offset) - 1) * Number(limit) || 0;

    // limit
    const pageSize = Number(limit) || 10;

    const products = await Product.find(
      { $or: [{ name: regex }, { description: regex }] },
      selectFields
    )
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await Product.countDocuments(products);

    res.send({ list: products, totalCount });
  })
);

// 상품 상세조회
productRoutes.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const selectFields = "id name description price tags createdAt";
    const product = await Product.findById(productId).select(selectFields);

    res.send(product);
  } catch (e) {
    next(e);
  }
});

// 상품 등록
productRoutes.post(
  "/",
  handleError(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).send(product);
  })
);

// 상품 수정
productRoutes.patch(
  "/:productId",
  handleError(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();

    res.status(200).send(product);
  })
);

// 상품 삭제
productRoutes.delete(
  "/:productId",
  handleError(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    res.status(204).send(product);
  })
);

export default productRoutes;
