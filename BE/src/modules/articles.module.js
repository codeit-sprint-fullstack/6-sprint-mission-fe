const express = require("express");
const prisma = require("../db/client.prisma");

const articlesRouter = express.Router();


/**
 * 게시글 목록 조회
 */
articlesRouter.get("/", async (req, res, next) => {
    try {
        let skip = Number(req.query.offset);
        let take = Number(req.query.pageSize) || 10; // 기본 10개씩 가져오기
        const search = req.query.search;
        const orderBy = req.query.orderBy === "createdAt" ? "createdAt" : "likes"; 

        // NaN 방지 처리
        if (isNaN(skip) || skip < 0) skip = 0;
        if (isNaN(take) || take < 1) take = 10;

        const options = {
            skip,
            take,
            orderBy: orderBy === "likes"
                ? { likes: { _count: "desc" } }  // ArticleLike 개수 기준으로 정렬
                : { createdAt: "asc" },         // createdAt 기준 정렬
            include: {
                user: {                          // 유저네임 포함
                    select: {
                        username: true
                    }
                },
                _count: {
                    select: {
                        likes: true,   // ArticleLike 개수만 카운트
                        comments: true // ArticleComment 개수 카운트
                    }
                }
            }
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
 * 게시글 조회
 */

articlesRouter.get("/:articleId", async (req, res, next) => {
    try {
        const articleId = Number(req.params.articleId);
        if (articleId === NaN) throw new Error("ArticleId must be number");


        const article = await prisma.article.findUnique({
            where: { id: articleId },
            include: {
                user: {                          // 유저네임 포함
                    select: {
                        username: true
                    }
                },
                _count: {
                    select: {
                        likes: true,   // ArticleLike 개수만 카운트
                        comments: true // ArticleComment 개수 카운트
                    }
                }
            }
        });

        if (!article) throw new Error("No article found");

        res.json(article);

    } catch (error) {
        next(error);
    }
})

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


/**
 * 댓글 목록 조회 (Article에 달린 댓글들)
 */
articlesRouter.get("/:articleId/comments", async (req, res, next) => {
    try {
        const articleId = Number(req.params.articleId);

        const comments = await prisma.articleComment.findMany({
            where: { articleId: articleId },
            select: {
                id: true,
                userId: true,
                content: true,
                articleId: true,
                createdAt: true,
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        res.json(comments);
    } catch (error) {
        next(error);
    }
});

/**
 * 댓글 하나 조회
 */
articlesRouter.get("/:articleId/comments/:commentId", async (req, res, next) => {
    try {
        const commentId = Number(req.params.commentId);

        const comment = await prisma.articleComment.findUnique({
            where: { id: Number(commentId) },
            select: {
                id: true,
                userId: true,
                content: true,
                articleId: true,
                createdAt: true,
            },
        });

        if (!comment) {
            return res.status(404).json({ error: "comment not found" });
        }

        res.json(comment);
    } catch (error) {
        next(error);
    }
});


/**
 * 댓글 등록 (Article에 대한 댓글)
 */
articlesRouter.post("/:articleId/comments", async (req, res, next) => {
    try {
        const articleId = Number(req.params.articleId);
        const { content } = req.body;

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
articlesRouter.patch("/:articleId/comments/:commentId", async (req, res, next) => {
    try {
        const commentId = Number(req.params.commentId);
        const { content } = req.body;

        const comment = await prisma.articleComment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const updatedComment = await prisma.articleComment.update({
            where: { id: commentId },
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
articlesRouter.delete("/:articleId/comments/:commentId", async (req, res, next) => {
    try {
        const commentId = Number(req.params.commentId);

        const comment = await prisma.articleComment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await prisma.articleComment.delete({
            where: { id: commentId },
        });

        res.status(204).send(); // 삭제 후 응답 본문 없음
    } catch (error) {
        next(error);
    }
});


module.exports = articlesRouter;