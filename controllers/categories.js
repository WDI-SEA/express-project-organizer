var express = require('express');
var db = require('../models');
var router = express.Router();

// router.get('/', function(req, res) {
// db.project.find({
//   where: { id: 1 },
//   include: [db.category, db.project]
// }).then(function(project) {
//   // by using eager loading, the project model should have a categories key
//   if (!project) throw Error();
//     res.render('projects/show', {
//       project: project
//     }).catch(function(error) {
//       console.log(project.categories);
//       res.status(400).render('main/404');
//     });
//   // a createCategory function should be available to this model
//     project.createCategory({ name: 'node' }).then(function(category) {
//     console.log(category.get());
//   });
// });
// })

//DISPLAY ALL CATEGORIES AT /projects/categories
router.get('/categories', function(req, res) {
  db.category.findAll()
    .then(function(categories){
    res.render('categories/category', { categories: categories });
    console.log(category.name);
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});




// router.get('category', function(req, res) { //LEADS TO: category.ejs view
//   db.category.findOne({ //grab this one tag name
//     where: {name: req.params.category} //where is equals this
//   }).then(function(category) { //and then...
//     category.getCategory().then(function(project) { //we are getting posts back
//       console.log("____________________________________ GET in Controllers/Posts" + posts);
//       res.render('categories/category', {project: project}) // send "posts" variable into the posts/tag.ejs
//     })
//   })
// })





module.exports = router;
