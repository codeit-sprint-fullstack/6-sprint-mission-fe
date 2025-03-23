const express = require("express");
const prisma = require("../db/client.prisma");

const productCommentsRouter = express.Router();

/**
 * 댓글 등록 (Product에 대한 댓글)
 */
productCommentsRouter.post("/", async (req, res, next) => {
    try {
        const { productId, content } = req.body;

        // 댓글을 다는 Product이 존재하는지 확인
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const comment = await prisma.productComment.create({
            data: {
                content,
                productId,
            },
        });

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 수정 (Product의 댓글)
 */
productCommentsRouter.patch("/:commentId", async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await prisma.productComment.findUnique({
            where: { id: Number(commentId) },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const updatedComment = await prisma.productComment.update({
            where: { id: Number(commentId) },
            data: { content },
        });

        res.json(updatedComment);
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 삭제 (Product의 댓글)
 */
productCommentsRouter.delete("/:commentId", async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await prisma.productComment.findUnique({
            where: { id: Number(commentId) },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await prisma.productComment.delete({
            where: { id: Number(commentId) },
        });

        res.status(204).send(); // 삭제 후 응답 본문 없음
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 목록 조회 (Product에 달린 댓글들)
 */
productCommentsRouter.get("/:productId", async (req, res, next) => {
    try {
        const { productId } = req.params;

        const comments = await prisma.productComment.findMany({
            where: { productId: Number(productId) },
            select: {
                id: true,
                content: true,
                createdAt: true,
            },
        });

        res.json(comments);
    } catch (error) {
        next(error);
    }
});

module.exports = productCommentsRouter;
