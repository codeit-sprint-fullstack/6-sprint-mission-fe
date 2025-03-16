import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import productRoutes from "./routes/productRoutes.js";
import handleError from "./middlewares/handleErrorMiddleware.js";

// 1. 서버 객체 생성
const app = express();

// 2. 데이터 베이스 연결
mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected"));

// 3. 미들웨어 등록
app.use(express.json()); // json 데이터를 parsing.
app.use(cors()); // CORS를 허용.

// 3-1. routes 등록
app.use("/products", productRoutes);

// 3-2. 에러 미들웨어 등록
app.use(handleError);

// 5. 서버 연결
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});
