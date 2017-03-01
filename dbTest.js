var db = require('./models');

// creating a category

// db.category.create({
//   name: 'node'
// }).then(function(category) {
//   console.log(category.get());
// });


// finding a project and getting all related categories

db.project.find({
  where: { id: 1 },
  include: [db.category]
}).then(function(project) {
  // by using eager loading, the project model should have a categories key
  console.log(project.categories);

  // a createCategory function should be available to this model
  project.createCategory({ name: 'node' }).then(function(category) {
    console.log(category.get());
  });
});
