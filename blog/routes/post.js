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
