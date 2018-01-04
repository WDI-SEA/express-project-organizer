var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

router.post("/", function(req, res){
 console.log('find', req.body);
 var category = [];
 if(req.body.categories && req.body.categories.length > 0){
  categories = req.body.categories.split(',');
 }
   db.project.findOrCreate({
     where: {
       name: req.body.name,
       githubLink: req.body.githubLink,
       deployedLink: req.body.deployedLink,
       description: req.body.description
     }
   }).spread(function(project, created) {
      if(categories.length > 0){
        async.forEach(categories, function(c, callback){
          // add the tag to the tag table
          db.category.findOrCreate({
            where: {name: c.trim()}
          }).spread(function(category, wasCreated){
            if(category){
          //this part is what adds the relationship in the join table
              project.addCategory(category);
            }
            // calling this function is like saying this is all done
            callback();
          })
        }, function(){
          // happens when all calls are resolved
          res.redirect('/projects/' + project.id);

        });
      }
      else{
        res.redirect('/projects/' + project.id);
      }
   }); //end spread
});

router.delete('/:id', function(req, res){
  console.log('delete route. ID= ', req.params.id);
  db.project.destroy({
    where: {id: req.params.id}
  }).then(function(deleted){
    console.log('deleted = ', deleted);
    res.send('sucesss');
  }).catch(function(err){
    console.log('An error happened', err);
    res.send('fail');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res){
  db.category.findAll().then(function(category){
    res.render('projects/new', {category: category});
  });
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id }
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});




module.exports = router;
