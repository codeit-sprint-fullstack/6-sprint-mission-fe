import express from "express";
import cors from 'cors';
import router from './modules/index.module.js';
import { PrismaClient } from "@prisma/client";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 7777;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(express.static(path.join(rootPath, 'dist')));

app.get('/favicon.ico', (req, res) => res.status(204).end());

// 리액트 라우팅 대응 (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'dist', 'index.html'));
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 실행 중! 포트 : ${PORT}`);
});

