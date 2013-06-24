// GET home page
exports.index = function(req, res){
  res.render('story');
};

// POST home page
exports.apply = function(req, res){
  console.log('Application Received');
  res.render('story');
};