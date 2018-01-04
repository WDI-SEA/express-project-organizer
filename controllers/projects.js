var express = require('express');
// var async = require('async');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.findOrCreate({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});



// router.post('/', function(req, res){
//   var tags = [];
//   if(req.body.tags){
//     tags = req.body.tags.split(',');
//   }
//   db.article.create(req.body).then(function(createdArticle){
//     if(tags.length  > 0){
//       async.forEach(tags, function(t, callback){
//         // add the tag to the tag table
//         db.tag.findOrCreate({
//           where: {content: t.trim()}
//         }).spread(function(tag, wasCreated){
//           if(tag){
//         //this part is what adds the relationship in the join table
//             createdArticle.addTag(tag);
//           }
//           // calling this function is like saying this is all done
//           callback();
//         })
//       }, function(){
//         // happens when all calls are resolved
//         res.redirect('/articles/' + createdArticle.id);

//       });
//     }
//     else{
//       res.redirect('/articles/' + createdArticle.id);
//     }
//   }).catch(function(err){
//     res.send('uh oh!', err);
//   });
// });

// GET /projects/new - display form for creating a new project

router.get('/new', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('projects/new', {categories: categories});
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
