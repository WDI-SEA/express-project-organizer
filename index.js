// Requires and Global Variables
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');

var app = express();

// Settings
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Routes

// GET / - home page that lists all projects
app.get('/', function(req, res) {
  db.project.findAll()
  .then(function(projects) {
    res.render('main/index', { projects: projects });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// POST /projects - creates a new project, then redirects back to GET /
app.post('/projects', function(req, res) {
  console.log(req.body);
});

// GET /projects/new - page that has a form for creating a new project
app.get('/projects/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - page that shows a specific project
app.get('/projects/:id', function(req, res) {
  res.send('Route for GET /projects/:id');
});

// Controllers
app.use('/projects', require('./controllers/projects'));
app.use('/categories', require('./controllers/categories'));
      


// Listening to Port 3000
var server = app.listen(process.env.PORT || 3000);

module.exports = server;


