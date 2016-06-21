var db = require("./models");

// // Test that a category can be created
// db.category.create({
//   name: 'node'
// }).then(function(category) {
//   console.log(category.get());
// });

// // Test that a category can be creted on a project
// // AND the join table is filled out automatically
// db.project.find({
//   where: {id: 1},
//   include: [db.category]
// }).then(function(project) {
//   project.createCategory({
//     name: "Food"
//   }).then(function(cat) {
//     console.log(cat.get());
//   });
// });

// // Test Find
// db.project.find({
//   where: { id: 1 },
//   include: [db.category]
// }).then(function(query) {
//   console.log(query.get())
// })

// Test findOrCreate and add Category
// router.post('/', function(req, res) {
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description
//   })
//   .then(function(project) {
//     project.findOrCreateCategory({
//       defaults: { category: req.body.categoryInput }
//     })
//     .then(function(cat) {
//       console.log(cat.get());
//     })
//     // res.redirect('/');
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });
