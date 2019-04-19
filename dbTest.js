var db = require('./models');

db.categry.create({
  name: 'node'
}).then(function(category) {
  console.log(category.get())
})


db.project.findOne({
  where: { id: 1 },
  include: [db.category]
}).then(function(project) {
  // a createCategory function should be available to this model
  project.createCategory({ name: 'node' }).then(function(category){
    console.log(category.get());
  })
});

