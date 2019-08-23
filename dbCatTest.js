var db = require('./models')

db.category.create({
  name: 'node'
}).then(function(category) {
  console.log(category.get())
})
