var db = require('./models');

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


// // Add a category to a project
//   db.project.find({
//     where: { id: 2 }
//   })
//   .then(function(project){
//     db.category.findOrCreate({
//       where: { name: "node" }
//     }).spread(function(cat, created) {
//       project.addCategory(cat);
//     });
//   })


