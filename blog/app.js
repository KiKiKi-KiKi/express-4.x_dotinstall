var express = require('express'),
    path    = require('path'),
    logger  = require('morgan'),
    bodyParser = require('body-parser'),
    app     = express();

// テンプレートファイルのある場所を指定
app.set('views', path.join(__dirname + '/views'));
// use jade Template
app.set('view engine', 'jade');

// middleware
// logを出力
app.use(logger('dev'));

// #10 POSTされたデータを扱うためのミドルウェア
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(app.router); // -> 'app.router' is deprecated!

// Routing

app.listen(3000);
