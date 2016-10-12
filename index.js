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
////////////////////////////////////////////////////////

//show all categories
app.get("/categories", function(req,res){
  db.category.findAll({ order: "name ASC" }).then(function(categories){
	res.render("categories", { categories: categories }); //passing authors i get from the query to the authors view
	});
});

app.get('/categories/:id', function(req, res){
  db.category.find({
    where: { id: req.params.id },
  }).then(function(category){
    category.getProjects().then(function(projects){
      res.render('categoriesDetails', { name: name, projects: projects });
    });
  });//end then
})


app.use('/projects', require('./controllers/projects'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
