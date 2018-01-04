var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

// router.post('/', function(req, res){
//   var categories = [];
//   if(req.body.categories){
//     categories = req.body.categories.split(',');
//   }
//   db.project.create(req.body).then(function(createdProject){
//     if(categories.length  > 0){
//       async.forEach(categories, function(c, callback){
//         // add the tag to the tag table
//         db.category.findOrCreate({
//           where: {content: c.trim()}
//         }).spread(function(category, wasCreated){
//           if(category){
//         //this part is what adds the relationship in the join table
//             createdProject.addCategory(category);
//           }
//           // calling this function is like saying this is all done
//           callback();
//         })
//       }, function(){
//         // happens when all calls are resolved
//         res.redirect('/projects/' + createdProject.id);

//       });
//     }
//     else{
//       res.redirect('/projects/' + createdProjects.id);
//     }
//   }).catch(function(err){
//     res.send('uh oh!', err);
//   });
// });

router.post("/", function(req, res){
 console.log('find', req.body);
   db.project.findOrCreate({
     where: {
       name: req.body.name,
       githubLink: req.body.githubLink,
       deployedLink: req.body.deployedLink,
       description: req.body.description
     }
   }).spread(function(project, created) {
     console.log("found it");
     db.category.findOrCreate({
       where:{name: req.body.category}
     }).spread(function(category, created) {
       project.addCategory(category).then(function(category) {
         console.log(category,"added to",project)
         res.redirect('/');
       });
     });
    })
    .catch(function(error) {
     console.log(error);
      res.status(400).render('main/404');
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
