exports.index = function(req, res) {
  res.render('index');
};

exports.home = function(req, res) {
  res.render('home');
};

exports.styleguide = function(req, res) {
  res.render('styleguide');
};

exports.testNewsLetter = function(req, res) {
  res.render('newsletter');
};