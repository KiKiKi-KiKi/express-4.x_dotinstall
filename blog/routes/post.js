var posts = [
  {title: 'title0', body: 'body0'},
  {title: 'title1', body: 'body1'},
  {title: 'title2', body: 'body2'}
];

exports.index = function(req, res) {
  res.render('posts/index', {posts: posts});
};

// 記事詳細
exports.show = function(req, res) {
  res.render('posts/show', {post: posts[req.params.id]});
};

// 新規作成フォーム
exports.new = function(req, res) {
  res.render('posts/new');
};

// 記事編集フォーム
exports.edit = function(req, res) {
  var id = req.params.id;
  res.render('posts/edit', {post: posts[id], id: id});
};

// 新規記事の作成
exports.create = function(req, res) {
  // フォームで渡ってくるデータは req.body で渡される
  var post = {
    title: req.body.title,
    body: req.body.body
  };
  posts[posts.length] = post;
  res.redirect('/');
};

// 記事の編集
exports.update = function(req, res) {
  var id = req.body.id;
  posts[id] = {
    title: req.body.title,
    body: req.body.body
  };
  res.redirect('/');
};
