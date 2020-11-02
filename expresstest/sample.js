
// Expressのオブジェクトを生成
var express = require('express')
// expressメソッドでアプリケーションとしての役割を担うオブジェクトを生成
var app = express()

// getメソッドでGETリクエストの登録をする
// ここではルートにアクセスされた際の処理のみを登録
app.get('/', function(req, res) {
    res.send('hello express')
})

var server = app.listen(1234, function() {
    console.log('サーバーを起動しました');
})

// このコードではserverが呼び出されていないが node sample.jsを実行すると問題なく起動できる