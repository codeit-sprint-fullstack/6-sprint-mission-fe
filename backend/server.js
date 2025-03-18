import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Product } from "./models/Product.js";

const asyncHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      switch (e.name) {
        case "ValidationError":
          res.status(400).send({ message: e.message });
          break;
        case "CaseError":
          res.status(404).send({ message: "Cannot find given id" });
          break;
        default:
          res.status(500).send({ message: e.message });
          break;
      }
      console.log(e.name);
      console.error(e.message);
    }
  };
};

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

/**
 * GET
 */
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const order = req.query.order;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.keyword;

    const orderOption = {};
    if (order === "recent") {
      orderOption.createdAt = -1;
    } else if (order === "favoriteCount") {
      orderOption.favoriteCount = -1;
    } else {
      orderOption.createdAt = 1;
    }

    const searchQuery = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(searchQuery)
      .sort(orderOption)
      .limit(limit);

    res.send(products);
  })
);

/**
 * GET /id
 */
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).send({ message: "Cannot find given id" });
    }

    res.send(product);
  })
);

/**
 * POST
 */
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).send(product);
  })
);

/**
 * PATCH
 */
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send({ message: "Cannot find given id" });
    }

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    await product.save();

    res.send(product);
  })
);

/**
 * DELETE
 */
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).send({ message: "Cannot find given id" });
    }

    res.sendStatus(204);
  })
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
