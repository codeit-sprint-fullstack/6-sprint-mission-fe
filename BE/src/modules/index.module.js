const express = require("express");
const articlesRouter = require("./articles.module");
const productsRouter = require("./products.module");
const articleCommentsRouter = require("./articleComments.module");
const productCommentsRouter = require("./productComments.module");

const router = express.Router();

router.use("/articles", articlesRouter);
router.use("/products", productsRouter);
router.use("/articleComments", articleCommentsRouter);
router.use("/productComments", productCommentsRouter);

module.exports = router;