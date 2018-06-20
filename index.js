var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var rowdy = require('rowdy-logger');
var app = express();

rowdy.begin(app);

// ejs is extension for my file
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

  //////////////////////////
 // GET ROOT (MAIN PAGE) //
//////////////////////////
app.get('/', function(req, res) {
  db.project.findAll()
        .then(function(projects) {
          // what file is ('/') rendering:? views folder--> setting up my views engine
          res.render('main/index', { projects: projects });
        })
        .catch(function(error) {
          res.status(400).render('main/404');
        });
});

app.use('/projects', require('./controllers/projects'));

var server = app.listen(process.env.PORT || 3000, function() {
  rowdy.print();
});

module.exports = server;

// we are using bootstrap
// class="well" - style preset

// express lets you write routes
//bodyParser - server gets a request, w/ bodyParser (ex. forms, route colon id..allows you to grab it really easily)
//ejsLayouts - everything goes in the body, side note ejs= uses <%'s
//db = database ->> models files see line4 >>columns table = models

// controllers anouther word for router = router folder
