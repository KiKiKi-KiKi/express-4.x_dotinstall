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

### #11 Blogアプリを作ってみよう
```sh
$ npm install express jade path morgan nodemon
```
