// var createError = require('http-errors');
// var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;



// ■■ URLが固定されたAPI ■■ //
// expressモジュールをロードし、インスタンス化してappに代入
var express = require("express");
var app = express()

//  listen()メソッドを実行して3000番ポートで待ち受け。
// ポートを省略するとすべてのIPアドレスを受け付ける
var server = app.listen(3000, function() {
  console.log('node.js is listening to PORT:' + server.address().port);
})

// 写真のサンプルデータ
var users = [
  {
    id: '001',
    name: '太郎',
    gender: 'man',
    // dataUrl: "http://localhost:3000/data/photo001.jpg"
  },
  {
    id: "002",
    name: "和子",
    type: "woman",
    // dataUrl: "http://localhost:3000/data/photo002.jpg"
  }
]

// 写真リストを取得するAPI
// json()メソッドはデータをJSONフォーマットでクライアントに送信することができる
// resでは他のメソッドも使用できる
app.get("/api/user/list", function(req, res, next) {
  res.json(users)
})
// $ node app.js
// http://localhost:3000/api/user/listで表示できる


// ■■ 動的なAPI ■■ //
// クライアントが任意の写真を指定してその情報を取得することができる
// :photoIdは変数として扱われ、クライアントが指定したphotoIdをサーバー側ではreq.params.photoIdとして参照できる
app.get('/api/user/:userId', function(req, res, next) {
  var user;
  for (i = 0; i < users.length; i++) {
    if (users[i].id === req.params.userId) {
      var user = users[i]
    }
  }
  res.json(user)
})


// ■■ UIを作成する ■■ //
// クライアント側のUIも提供する場合はExpressのView Enjineを使って開発可能。他にはJade
// View EngineにEJSを指定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// "/"へのGETリクエストでindex.ejsを表示する。拡張子（.ejs）は省略されていることに注意。
// render()メソッドは任意のテンプレートを表示するためのメソッド。
app.get("/", function(req, res, next) {
  res.render("index", {});
})