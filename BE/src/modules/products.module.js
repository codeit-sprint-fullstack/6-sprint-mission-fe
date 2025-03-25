const express = require("express");
const prisma = require("../db/client.prisma");

const productsRouter = express.Router();

/**
 * 상품 등록
 */
productsRouter.post("/", async (req, res, next) => {
    try {
        const { name, description, price } = req.body;

        const product = await prisma.product.create({
            data: { name, description, price },
        });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

/**
 * 상품 조회
 */
productsRouter.get("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await prisma.product.findUnique({
            where: { id: Number(productId) },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                createdAt: true,
            },
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
});

/**
 * 상품 수정
 */
productsRouter.patch("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { name, description, price } = req.body;

        const product = await prisma.product.findUnique({
            where: { id: Number(productId) },
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: Number(productId) },
            data: { name, description, price },
        });

        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

/**
 * 상품 삭제
 */
productsRouter.delete("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await prisma.product.findUnique({
            where: { id: Number(productId) },
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await prisma.product.delete({
            where: { id: Number(productId) },
        });

        res.status(204).send(); // 삭제 후 응답 본문 없음
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter;
