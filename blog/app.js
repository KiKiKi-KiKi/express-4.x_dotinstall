var express = require('express'),
    path    = require('path'),
    logger  = require('morgan'),
    bodyParser = require('body-parser'),
    app     = express(),
    post    = require('./routes/post');

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
app.get('/', post.index);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id', post.show);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

app.listen(3000);
