var db = require('./models');

// db.category.create({
//   name: 'Dan'
// }).then(function(category) {
//   console.log(category.get());
// })

db.project.find({
  where: { id: 3 },
  include: [db.category]
}).then(function(project) {
  console.log(project.categories);

  project.createCategory({ name: 'node' }).then(function(category) {
    console.log(category.get());
  });
});
