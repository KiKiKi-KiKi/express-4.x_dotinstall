var express = require('express'),
    path    = require('path'),
    logger  = require('morgan'),
    bodyParser = require('body-parser'),
    connect        = require('connect'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    expressSession = require('express-session'),
    csrf           = require('csurf'),
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

// #12 PUT, DELETE メソッドに対応するためのミドルウェア
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    console.log('>>> methodOverride');
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// #20 CSRF対策
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());

// app.use(app.router); // -> 'app.router' is deprecated!

// Routing
app.get('/', post.index);
// :id は 0-9でないと post.show にならないように正規表現で判定させる
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

app.listen(3000);
