var db = require('./models');

db.category.create({
  category: 'node'
}).then(function(category) {
  console.log(category.get());
});
