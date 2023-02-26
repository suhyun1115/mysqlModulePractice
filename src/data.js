const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT    = 3001; // 포트번호 설정
const app = express();

app.use(cors(/* {
  origin: "*",                // 출처 허용 옵션
  credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
} */))


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qweqwe11',
  database: 'mydatabase'
});
// bodyParser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.query("SELECT * FROM users ORDER BY id DESC LIMIT 10;", (err, result) => {
    console.log(result);
      res.send(result);
  });
});

app.post("/users_create", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const refs = req.body;
  console.log(refs)
  const sqlQuery = `INSERT INTO users(title, content) VALUES(?,?);`;
  db.query(sqlQuery, [refs.title,refs.content], (err, result) => {
    if(err){
      console.log(err)
      return;
    }
    res.send(result);
  });
});
app.post("/users_delete", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const refs = req.body;
  console.log(refs)
  const sqlQuery = `DELETE FROM users WHERE (id = ${refs.id});`;
  db.query(sqlQuery, [refs.id], (err, result) => {
    if(err){
      console.log(err)
      return;
    }
    res.send(result);
  });
});
app.post("/users_update", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const refs = req.body;
  console.log(refs)
  const sqlQuery = `UPDATE mydatabase.users SET title = ?, content = ? WHERE (id = ${refs.id});;`;
  db.query(sqlQuery, [refs.title,refs.content], (err, result) => {
    if(err){
      console.log(err)
      return;
    }
    res.send(result);
  });
});




app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
