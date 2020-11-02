var http = require('http');
var fs = require('fs')
var url = require('url')　// URLの文字列を解析する
var qs = require('querystring')　// クエリ文字列を扱うために使用する

var indexPage = fs.readFileSync('./index.html', 'utf-8')
var server = http.createServer(function(req, res) {
    if(req.method == 'GET') {
        // parseでリクエストがあったURLの解析。
        // 第二引数をtrueにすることで解析結果オブジェクトのqueryプロパティの値をオブジェクト型で保持できる
        console.log(req.url);
        var urlParts = url.parse(req.url, true)  
        console.log('----get request-----');
        console.log('name' + urlParts.query.name);
        console.log('age' + urlParts.query.age);
    } else {
        var body = ''
        req.on('data', function(data) {
            body += data
        })
        req.on('end', function() {
            console.log('body: ' + body);
            var params = qs.parse(body)
            console.log('params ' + params);
            console.log('-----post request----');
            console.log('name:' + params.name);
            console.log('age:' + params.age);
        })
    }

    res.writeHead(200, {'content-type': 'text/html'})
    res.write(indexPage)
    res.end()
})

server.listen(1234)
console.log('サーバーを起動しました');