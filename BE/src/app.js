const express = require("express");
const router = require("./modules/index.module");

const app = express();
const PORT = 5050;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',  // 프론트엔드 주소 설정
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // 허용할 HTTP 메소드 설정
    allowedHeaders: ['Content-Type', 'Authorization']  // 허용할 헤더 설정
  }));
  

app.use(express.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})