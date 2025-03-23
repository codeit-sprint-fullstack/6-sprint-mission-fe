const express = require("express");
const prisma = require("../db/client.prisma");

const articleCommentsRouter = express.Router();

/**
 * 댓글 등록 (Article에 대한 댓글)
 */
articleCommentsRouter.post("/", async (req, res, next) => {
    try {
        const { articleId, content } = req.body;

        // 댓글을 다는 Article이 존재하는지 확인
        const article = await prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        const comment = await prisma.articleComment.create({
            data: {
                content,
                articleId,
            },
        });

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 수정 (Article의 댓글)
 */
articleCommentsRouter.patch("/:commentId", async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await prisma.articleComment.findUnique({
            where: { id: Number(commentId) },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const updatedComment = await prisma.articleComment.update({
            where: { id: Number(commentId) },
            data: { content },
        });

        res.json(updatedComment);
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 삭제 (Article의 댓글)
 */
articleCommentsRouter.delete("/:commentId", async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await prisma.articleComment.findUnique({
            where: { id: Number(commentId) },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await prisma.articleComment.delete({
            where: { id: Number(commentId) },
        });

        res.status(204).send(); // 삭제 후 응답 본문 없음
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 목록 조회 (Article에 달린 댓글들)
 */
articleCommentsRouter.get("/:articleId", async (req, res, next) => {
    try {
        const { articleId } = req.params;

        const comments = await prisma.articleComment.findMany({
            where: { articleId: Number(articleId) },
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

module.exports = articleCommentsRouter;
