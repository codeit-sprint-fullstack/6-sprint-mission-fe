import express from "express";
import articlesRouter from "./articles.module.js"; // articlesRouter 불러옴, 거기서 정의한 post, get 라우터

const router = express.Router();

router.use("/articles", articlesRouter); // 클라이언트가 /articles로 요청보내면 articlesRouter로 전달된다 -> post 한다면 articles/post 로 전달된다


export default router;