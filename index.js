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

///////////////////////////////////////////////////////////////////////////////////////

app.get("/projects/new", function(req,res){
  res.render('projects/new');
});

app.post("/projects", function(req,res){
  console.log(req.body);
  //res.render('home');

  db.project.findOrCreate({  
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description
    },
    include: [db.category]
  }).spread(function(proj, wasCreated){
    if(req.body.category){ 
      db.category.findOrCreate({   
        where: {name: req.body.category}
      }).spread(function(cat, wasCreated){
        if(cat){
          proj.addCategory(cat);
          res.redirect("/");
        }
        else{
          res.render("/", {errorMessage: "There was an error... please retry."});
        }
      });
    }
    else { //Not adding a tag, just redirect
      res.redirect("/");
    }
  })
}); ///////////////////////////////// END OF APP.POST

app.get("/categories", function(req,res){
  db.category.findAll().then(function(cats){
    console.log(cats);
    res.render("categories", {cats: cats});
  });
});

app.get("/categories/:id", function(req,res){
  db.category.findOne({ where: {id: req.params.id}, include: [db.project] }).then(function(cat){
    res.render("catDetails", { cat: cat });
  });
});

app.use('/projects', require('./controllers/projects'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
