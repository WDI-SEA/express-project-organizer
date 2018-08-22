var db = require('./models');

db.categories.create({
  name: 'node'
}).then(function(categories) {
  console.log(categories.get());
});