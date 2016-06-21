var db = require('./models');

db.category.create({
  name: 'whiskey'
}).then(function(catagory){
  console.log(catagory.get());
});

db.categoriesProjects.create({
  projectId: 2,
  categoryId: 1
}).then(function(test) {
  console.log(test.get());
});
