const express = require("express");
const prisma = require("../db/client.prisma");

const productsRouter = express.Router();

/**
 * 게시글 목록 조회
 */
productsRouter.get("/", async (req, res, next) => {
    try {
        let skip = Number(req.query.offset);
        let take = Number(req.query.limit) || 10; // 기본 10개씩 가져오기
        const search = req.query.search;
        const orderBy = req.query.orderBy === "createdAt" ? "createdAt" : "likes"; 
        
        // NaN 방지 처리
        if (isNaN(skip) || skip < 0) skip = 0;
        if (isNaN(take) || take < 1) take = 10;

        const options = {
            skip,
            take,
            orderBy: orderBy === "likes"
                ? { likes: { _count: "desc" } }  // ProductLike 개수 기준으로 정렬
                : { createdAt: "asc" },         // createdAt 기준 정렬
               include: {
    user: {
        select: {
            username: true
        }
    },
    _count: {
        select: {
            likes: true,
            comments: true
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

        const products = await prisma.product.findMany(options);

        res.json(products);
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



/**
 * 댓글 목록 조회 (Product에 달린 댓글들)
 */
productsRouter.get("/:productId/comments", async (req, res, next) => {
    try {
        const productId = Number(req.params.productId);

        const comments = await prisma.productComment.findMany({
            where: { productId: productId },
            select: {
                id: true,
                userId: true,
                content: true,
                productId: true,
                createdAt: true,
            },
        });

        res.json(comments);
    } catch (error) {
        next(error);
    }
});


/**
 * 댓글 조회
 */
productsRouter.get("/:productId/comments/:commentId", async (req, res, next) => {
    try {
        const commentId = Number(req.params.commentId);

        const comment = await prisma.productComment.findUnique({
            where: { id: Number(commentId) },
            select: {
                id: true,
                userId: true,
                content: true,
                productId: true,
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
 * 댓글 등록 (Product에 대한 댓글)
 */
productsRouter.post("/:productId/comments", async (req, res, next) => {
    try {
        const productId = Number(req.params.productId);
        const { content } = req.body;

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
productsRouter.patch("/:productId/comments/:commentId", async (req, res, next) => {
    try {
        const commentId = Number(req.params.commentId);
        const { content } = req.body;

        const comment = await prisma.productComment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const updatedComment = await prisma.productComment.update({
            where: { id: commentId },
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
productsRouter.delete("/:productId/comments/:commentId", async (req, res, next) => {
    try {
        const commentId = Number(req.params.commentId);

        const comment = await prisma.productComment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await prisma.productComment.delete({
            where: { id: commentId },
        });

        res.status(204).send(); // 삭제 후 응답 본문 없음
    } catch (error) {
        next(error);
    }
});


module.exports = productsRouter;
