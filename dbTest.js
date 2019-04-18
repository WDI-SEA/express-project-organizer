var db = require('./models')

// Create a category: Category model must exist and be migrated

// db.category.create({
//   name: 'node'
// }).then(function(category) {
//   console.log(category.get())
// })

// Create a project and use the helper function create<ModelName> to create a category
// Requires categoriesProjects to exist, be migrated, and properly associated

db.project.findOne({
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
