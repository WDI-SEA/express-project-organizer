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
  db.project.findAll( {
  	include: [db.category]
  }).then(function(projects) {
    	res.render('main/index', { projects: projects });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

app.get('/categories', function(req, res) {
	db.category.findAll()
	.then(function(categories) {
		res.render('main/categories', {categories: categories})
	})
});

app.get('/categories/:id', function(req, res) {
	db.category.find( {
		where: { id: req.params.id}
	}).then(function(category) {
		category.getProjects().then(function(projects) {
			res.render('main/projcat', { categoryName: category.name, projects: projects});
		})
	})
});

app.use('/projects', require('./controllers/projects'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
