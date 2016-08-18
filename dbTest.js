// var db = require('./models');
// console.log('Starting test....');
// db.project.find({
//   where: { id: 1 },
//   include: [db.category]
// }).then(function(project) {
//   // by using eager loading, the project model should have a categories key
//   if(project) {
//     console.log(project.categories);
//   } else {
//     console.log("No project here!");
//   }

//   // a createCategory function should be available to this model
//   project.createCategory({ name: 'node' }).then(function(category) {
//     console.log(category.get());
//   });
// });