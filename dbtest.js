const db = require('./models')

db.project.findOne({
  where: { name: 'express'},
  include: [db.category]
}).then(project => {
  // by using eager loading, the project model should have a categories key
  console.log(categories)

//   // createCategory function should be available to this model - it will create the category then add it to the project
//   project.createCategory({ name: 'express' }).then(category => {
//     console.log(category.id)
//   })
})