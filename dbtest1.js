var db = require('./models')
var async = require('async')
let value =1

db.project.findOne({
  where: { id: 1 },
  include: [db.category]
}).then(function(project) {
  // by using eager loading, the project model should have a categories key
  console.log(project.categories)
  db.category.findOrCreate({
    where: { name: 'JS' }
  })
  .then(([category,wasCreated])=>{
      console.log("category",category)
  })
  
})