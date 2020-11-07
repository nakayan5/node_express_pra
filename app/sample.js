const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const dbPath = 'app/db/database.sqlite3'
const db = new sqlite3.Database(dbPath)

app.get('/api/v1/hello', (req, res) => {
    res.json({"message": "Hello World"})
})


// process.envはローカルの環境変数を参照する。
// その環境変数であるポート番号を指定している人がいたらその番号を使ってローカルのサーバーを立ち上げる
// もし指定していなかったら3000番を使う
const port = process.env.PORT || 3000;
app.listen(port)
console.log("listen on port:" + port);