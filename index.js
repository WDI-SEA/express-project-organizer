var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var rowdy = require('rowdy-logger');
var app = express();

rowdy.begin(app);

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

app.use('/projects', require('./controllers/projects'));
app.use('/categories', require('./controllers/categories'));

var server = app.listen(process.env.PORT || 3000, function() {
  rowdy.print();
});

module.exports = server;
