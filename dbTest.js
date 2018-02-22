var db = require('./models');

db.categoriesProjects.create({
  projectId: 1,
  categoryId: 1
}).then(function(data) {
  console.log(data.get());
});