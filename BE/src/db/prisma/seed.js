const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = [];

  await prisma.user.deleteMany();
  await prisma.article.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.articleLike.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.productLike.deleteMany();

  // 1. Create 10 Users
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        encryptedPassword: `hashedpassword${i}`,
      },
    });
    users.push(user);
  }

  const articles = [];

  // 2. Create 10 Articles
  for (let i = 1; i <= 10; i++) {
    const article = await prisma.article.create({
      data: {
        userId: users[i % users.length].id,
        title: `게시글 ${i}`,
        content: `이건 ${i}번째 게시글의 내용입니다.`,
      },
    });
    articles.push(article);
  }

  // 3. Create 3 Comments per Article (30 total)
  for (const article of articles) {
    for (let j = 0; j < 3; j++) {
      await prisma.articleComment.create({
        data: {
          userId: users[(j + 1) % users.length].id,
          articleId: article.id,
          content: `댓글 ${j + 1} on 게시글 ${article.id}`,
        },
      });
    }
  }

  // 4. Create random number of Article Likes (1~10)
  for (let i = 0; i < 10; i++) {
    const userId = users[i % users.length].id;
    const articleId = articles[(i + 2) % articles.length].id;
    const likeCount = Math.floor(Math.random() * 10) + 1; // 랜덤 좋아요 개수 (1~10)

    try {
      for (let j = 0; j < likeCount; j++) {
        await prisma.articleLike.create({
          data: {
            userId: users[(j + 3) % users.length].id, // 각 좋아요를 다른 유저가 누름
            articleId,
          },
        });
      }
    } catch (e) {
      // ignore duplicate constraint
    }
  }

  const products = [];

  // 5. Create 10 Products
  for (let i = 1; i <= 10; i++) {
    const product = await prisma.product.create({
      data: {
        userId: users[i % users.length].id,
        name: `상품 ${i}`,
        description: `이것은 ${i}번째 상품입니다.`,
        price: 1000 + i * 100,
        tags: ['tag1', 'tag2'],
      },
    });
    products.push(product);
  }

  // 6. Create 3 Comments per Product (30 total)
  for (const product of products) {
    for (let j = 0; j < 3; j++) {
      await prisma.productComment.create({
        data: {
          userId: users[(j + 3) % users.length].id,
          productId: product.id,
          content: `댓글 ${j + 1} on 상품 ${product.id}`,
        },
      });
    }
  }

  // 7. Create random number of Product Likes (1~10)
  for (let i = 0; i < 10; i++) {
    const userId = users[i % users.length].id;
    const productId = products[(i + 4) % products.length].id;
    const likeCount = Math.floor(Math.random() * 10) + 1; // 랜덤 좋아요 개수 (1~10)

    try {
      for (let j = 0; j < likeCount; j++) {
        await prisma.productLike.create({
          data: {
            userId: users[(j + 5) % users.length].id, // 각 좋아요를 다른 유저가 누름
            productId,
          },
        });
      }
    } catch (e) {
      // ignore duplicate constraint
    }
  }

  console.log('🌱 Seed 완료!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
