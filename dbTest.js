var db = require('./models');

// db.category.create({
//   name: 'whiskey'
// }).then(function(catagory){
//   console.log(catagory.get());
// });

// db.categoriesProjects.create({
//   projectId: 2,
//   categoryId: 1
// }).then(function(test) {
//   console.log(test.get());
// });

// db.category.find({
//   where: {
//     id: 1 },
//     include: [db.project]
// }).then(function(foo) {
//   console.log(foo.name);
// });

// db.project.find({
//   where: { id: 2 },
//   include: [db.category]
// }).then(function(project) {
//   // by using eager loading, the project model should have a categories key
//   console.log(project.categories);
// });
