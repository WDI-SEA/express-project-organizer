const express = require('express');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const rowdy = require('rowdy-logger');
const app = express();

rowdy.begin(app);

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', (req, res) => {
  db.project.findAll().then((projects) => {
          res.render('main/index', {projects});
        }).catch((error) => {
          res.status(400).render('main/404');
        });
});

app.use('/projects', require('./controllers/projects'));
app.use('/categories', require('./controllers/categories'));

var server = app.listen(process.env.PORT || 3000, function() {
  rowdy.print();
});

module.exports = server;
