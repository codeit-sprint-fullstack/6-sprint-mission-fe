import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL,PORT  } from "../..env.js";
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
          case "CastError":
            res.status(404).send({ message: "Cannot find given id" });
            break;
          default:
            res.status(500).send({ message: e.message });
            break;
        }
  
        console.log(e.name);
        console.log(e.message);
      }
    };
};


const app = express();
app.use(express.json());  // -> 미들웨어 middleware
// express.json() : 헤더의 content-type이 application/json이라면 body를 파싱해주는 미들웨어.
// 덕분에 req.body 로 값 가져올수 있다. 안하면 바디에 아무 값도 담기지 않는다.

app.get(
    "/products",
    asyncHandler(async (req, res) => {
      const sort = req.query.sort;
      const count = Number(req.query.count) || 0;
  
      const sortOption = {
        createdAt: sort === "recent" ? "asc" : "desc",
      };
  
      const products = await Product.find().sort(sortOption).limit(count);
  
      res.send(products);
    })
);
  
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
  
app.post(
    "/products",
    asyncHandler(async (req, res) => {
      const product = await Product.create(req.body);
  
      res.status(201).send(product);
    })
);
  
app.patch(
    "/products/:id",
    asyncHandler(async (req, res) => {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        res.status(404).send({ message: "Cannot find given id" });
        return;
      }
  
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
  
      await product.save();
  
      res.send(product);
    })
);
  
app.delete(
    "/products/:id",
    asyncHandler(async (req, res) => {
      const id = req.params.id;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        res.status(404).send({ message: "Cannot find given id" });
        return;
      }
  
      res.sendStatus(204);
      // res.status(204).send()
    })
);
  
mongoose.connect(DATABASE_URL).then(() => console.log("Connected"));
  
app.listen(PORT, () => {
    console.log("Server started");
});
  