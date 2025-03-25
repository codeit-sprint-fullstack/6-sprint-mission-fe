const express = require("express");
const prisma = require("../db/client.prisma");

const articlesRouter = express.Router();

/**
 * 게시글 등록
 */
articlesRouter.post("/", async (req, res, next)=>{
    try {
        const data = req.body;
        const { title, content } = data;

        const article = await prisma.article.create({ data: { title, content } });


        //res.send(JSON.stringify(article))
        res.status(201).json(article);
    } catch (error) {
        next(error);
    }
})

/**
 * 게시글 조회
 */

articlesRouter.get("/:articleId", async (req, res, next) => {
    try {
        const articleId = Number(req.params.articleId);
        if (articleId === NaN) throw new Error("ArticleId must be number");


        const article = await prisma.article.findUnique({
            where: { id: articleId },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
            },
        });

        if (!article) throw new Error("No article found");

        res.json(article);

    } catch (error) {
        next(error);
    }
})


/**
 * 게시글 목록 조회
 */
articlesRouter.get("/", async (req, res, next) => {
    try {
        let skip = Number(req.query.offset);
        let take = Number(req.query.limit) || 10; // 기본 10개씩 가져오기
        const search = req.query.search;
        const orderBy = req.query.orderBy === "asc" ? "asc" : "desc"; // asc 또는 desc만 허용

        // NaN 방지 처리
        if (isNaN(skip) || skip < 0) skip = 0;
        if (isNaN(take) || take < 1) take = 10;

        const options = {
            orderBy: { createdAt: orderBy }, // 쿼리로 받은 정렬 적용
            skip,
            take,
        };

        // 검색 조건 추가
        if (search) {
            options.where = {
                OR: [
                    { title: { contains: search } },
                    { content: { contains: search } },
                ],
            };
        }

        const articles = await prisma.article.findMany(options);

        res.json(articles);
    } catch (error) {
        next(error);
    }
});

/**
 * 게시글 수정
 */
articlesRouter.patch("/:articleId", async (req, res, next) => {
    try {
        const articleId = Number(req.params.articleId);
        const { title, content } = req.body;

        if (isNaN(articleId)) return res.status(400).json({ error: "ArticleId must be a number" });

        // 게시글이 존재하는지 확인
        const article = await prisma.article.findUnique({
            where: { id: articleId },
        });

        if (!article) {
            return res.status(404).json({ error: "No article found to update" });
        }

        // 게시글 수정
        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: { title, content },
        });

        res.json(updatedArticle);
    } catch (error) {
        next(error);
    }
});

/**
 * 게시글 삭제
 */
articlesRouter.delete("/:articleId", async (req, res, next) => {
    try {
        const articleId = Number(req.params.articleId);

        if (isNaN(articleId)) return res.status(400).json({ error: "ArticleId must be a number" });

        // 게시글이 존재하는지 확인
        const article = await prisma.article.findUnique({
            where: { id: articleId },
        });

        if (!article) {
            return res.status(404).json({ error: "No article found to delete" });
        }

        // 게시글 삭제
        await prisma.article.delete({
            where: { id: articleId },
        });

        res.status(204).send(); // 삭제된 후 응답은 빈 상태로 204 No Content 상태 코드 반환
    } catch (error) {
        next(error);
    }
});


module.exports = articlesRouter;