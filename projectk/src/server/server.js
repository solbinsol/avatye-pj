const { error } = require('console');
const express = require('express');

const app = express();
//기본 포트번호 설정
const port = 3000;

//미들웨어
app.use(express.json());
app.use(express.urlencoded({extends: true}));

const getConn = async () => {
    return await pool.getConnection(async(conn) => conn) ;
}

//데이터베이스 연동
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : '2098',
    database : 'project'
});

//http://localhost:3000/ 접속
app.listen(port, ()=>{
    console.log("페이지 구동 시작");
});


app.get('/monn', async(req, res) => {
    const conn = await getConn();
    const query = 'select webtoon_name from Twebtoondetail where week = "Monday";';
    let [rows] = await conn.query(query, []);
    res.send(rows);
});