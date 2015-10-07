# ドットインストール  Express入門
[ドットインストール  Express入門](http://dotinstall.com/lessons/basic_expressjs)
Express 4.x系, jadeテンプレートでトライしたメモ

### note.
Express 4.xでは`app.router`は廃止されているので、Express 3.xで必須だったapp.use(app.router)の記述は必要無い。  
app.use(app.router); があるとエラーになる  
  -> `Error: 'app.router' is deprecated!`  
  

#### アプリの起動

- `node app`
- nodemonを使用する場合  
`nodemon app`

#### POSTを扱うためのミドルウェア
Express 4.x では`express.json()`・`express.urlencoded()`が使えないので、別途ミドルウェアをインストールして設定する必要がある  
```sh
$ npm install body-parser
```

```javascript
// app.js
var bodyParser = require('body-parser');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
```

### #11 Blogアプリを作ってみよう
```sh
$ npm install express jade path morgan nodemon body-parser
$ touch app.js
$ mkdir views/posts
$ mkdir routes
$ touch routes/post.js
```

### #12 ルーティングを確認しよう
PUT, DELETEに対応するためのミドルウェア  
`express.methodOverride()`はExprexx 4.xでは使えないので、別途ミドルウェアをインストールして設定する必要がある  
```sh
$ npm install connect method-override
```

[expressjs/method-override](https://github.com/expressjs/method-override)を参考にすると良い。サンプルと同じようにするのであれば**custom logic**の方法で

> ### [override using a query value](https://github.com/expressjs/method-override#override-using-a-query-value)
> To use a query string value to override the method, specify the query string key as a string argument to the `methodOverride` function. To then make the call, send a `POST` request to a URL with the overridden method as the value of that query string key. This method of using a query value would typically be used in conjunction with plain HTML `<form>`` elements when trying to support legacy browsers but still use newer methods.
> ```javascript
> var connect        = require('connect')
> var methodOverride = require('method-override')
>
> // override with POST having ?_method=DELETE
> app.use(methodOverride('_method'))
> ```
> Example call with query override using HTML `<form>`:
> ```html
> <form method="POST" action="/resource?_method=DELETE">
>  <button type="submit">Delete resource</button>
> </form>
> ```

> ### [custom logic](https://github.com/expressjs/method-override#custom-logic)
> You can implement any kind of custom logic with a function for the `getter`. The following implements the logic for looking in `req.body` that was in `method-override@1`:
> ```javascript
> var bodyParser     = require('body-parser')
> var connect        = require('connect')
> var methodOverride = require('method-override')
> 
> // NOTE: when using req.body, you must fully parse the request body
> //       before you call methodOverride() in your middleware stack,
> //       otherwise req.body will not be populated.
> app.use(bodyParser.urlencoded())
> app.use(methodOverride(function(req, res){
>   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
>     // look in urlencoded POST bodies and delete it
>     var method = req.body._method
>     delete req.body._method
>     return method
>   }
> }))
> ```
> Example call with query override using HTML `<form>`:
> ```html
> <!-- enctype must be set to the type you will parse before methodOverride() -->
> <form method="POST" action="/resource" enctype="application/x-www-form-urlencoded">
>   <input type="hidden" name="_method" value="DELETE">
>   <button type="submit">Delete resource</button>
> </form>
> ```
