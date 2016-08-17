var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  db.project.findAll()
  .then(function(projects) {
    res.render('main/index', { projects: projects });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});
app.get("/categories", function(req, res){
	  db.catagory.findAll().then(function(catagories){
    res.render("catagories/catagories", {catagories: catagories});
  });
});

app.use('/projects', require('./controllers/projects'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;


// for multipe comments
// var test = function (input){
//   input = input.replace(/,\s+/g, ',');
//   console.log(input);
//   var array = input.split(',');
//   console.log(array);
// }

// test('1, 2, tree, pine,  apple, things to remember');