var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Route to our homepage

app.get('/', function(req, res) {
  db.project.findAll()
  .then(function(projects) {
    res.render('main/index', { projects: projects });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// Route to our Categories page, listing all Categories

app.get('/categories', function(req, res) {
  db.categorie.findAll()
  .then(function(categories) {
    res.render('categories/categories', { categories: categories });
  })
  .catch(function(error) {
    res.status(404).render('main/404');
  });
});

// Route to a specific Category page, listing all Projects tagged with that Category

app.get('/categories/:name', function(req, res) {
  db.categorie.find({
    where: { id: req.params.name }
  }).then(function(categorie) {
    categorie.getProjects().then(function(projects) {
      res.render('categories/show', {
      projects: projects,
      categorie: categorie
      });
    });
  });
});

app.use('/projects', require('./controllers/projects'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
