var express = require('express');
var db = require('../models');
var router = express.Router();

// router.get('/', function(req, res) {
// db.category.find({
//   where: { name: req.body.name },
// }).then(function(category) {
//   // by using eager loading, the project model should have a categories key
//   if (!category) throw Error();
//     res.render('projects/show', {
//       project: project
//     }).catch(function(error) {
//       console.log(project.categories);
//       res.status(400).render('main/404');
//     });
// });
// })

//DISPLAY ALL CATEGORIES AT /projects/categories
router.get('/', function(req, res) {
  db.category.findAll()
    .then(function(categories){
    res.render('categories/category', { categories: categories });
    console.log(category.name);
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.post('/', function(req, res) {
  db.category.findOrCreate( {
    where: {name: req.body.name}
  }).spread(function(categories, created) {
    res.render('categories/category', {categories: categories});
  }).catch(function(error) {
    res.status(400).render('main.404');
  });
});

// router.post('/', function(req, res) {
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description
//   }).then(function(project) {
//     db.category.findOrCreate({
//       where: {name: req.body.category}
//     }).spread(function(category, create) {
//       post.addCategory(category).then(function(category) {
//       });
//     });
//     res.redirect('/');
//   }).catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });


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
