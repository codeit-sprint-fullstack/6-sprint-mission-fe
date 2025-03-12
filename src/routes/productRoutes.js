import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { Product } from "../model/Product.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected"));

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
app.get(
  "/products",
  handleError(async (req, res) => {
    const { keyword, orderBy } = req.query;
    // find
    const regex = { $regex: keyword ? keyword : "", $options: "i" };
    const selectFields = { id: 1, name: 1, price: 1, createdAt: 1 };

    // sort
    const sort = { createdAt: orderBy === "recent" ? -1 : 1 };

    // skip
    const offset = Number(req.query.offset) || 0;

    // limit
    const limit = Number(req.query.limit) || 10;

    const products = await Product.find(
      { $or: [{ name: regex }, { description: regex }] },
      selectFields
    )
      .sort(sort)
      .skip(offset)
      .limit(limit);

    res.send(products);
  })
);

// 상품 상세조회
app.get(
  "/products/:productId",
  handleError(async (req, res) => {
    const { productId } = req.params;
    const selectFields = "id name description price tags createdAt";
    const product = await Product.findById(productId).select(selectFields);

    res.send(product);
  })
);

// 상품 등록
app.post(
  "/products",
  handleError(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).send(product);
  })
);

// 상품 수정
app.patch(
  "/products/:productId",
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
app.delete(
  "/products/:productId",
  handleError(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    res.status(204).send(product);
  })
);
