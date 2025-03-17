import express from "express";
import { Product } from "../model/productSchema.js";

const productRoutes = express.Router();

// 상품 목록조회
productRoutes.get("/", async (req, res, next) => {
  try {
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

    const filter = { $or: [{ name: regex }, { description: regex }] };

    const products = await Product.find(filter, selectFields)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await Product.countDocuments(filter);

    res.send({ list: products, totalCount });
  } catch (e) {
    next(e);
  }
});

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
productRoutes.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).send(product);
  } catch (e) {
    next(e);
  }
});

// 상품 수정
productRoutes.patch("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();

    res.status(200).send(product);
  } catch (e) {
    next(e);
  }
});

// 상품 삭제
productRoutes.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    res.status(204).send(product);
  } catch (e) {
    next(e);
  }
});

export default productRoutes;
