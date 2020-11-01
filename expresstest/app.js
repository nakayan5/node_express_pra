

var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express()

app.engine('ejs', ejs.renderFile)
// body-parserの初期化
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function(req, res) {
    console.log('--- get request---');
    console.log('name: ' + req.query.name);
    console.log('age: ' + req.query.age);
    res.render('temp.ejs', {})
})

app.post('/', function(req, res) {
    console.log('--- post request---');
    console.log('name: ' + req.body.name);
    console.log('age: ' + req.body.age);
    res.render('temp.ejs', {})
})

var server = app.listen(1234, function() {
    console.log('サーバーを起動しました');
})