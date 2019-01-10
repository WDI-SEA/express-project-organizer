const db = require('./models');

db.category
  .create({
    category: 'node',
  })
  .then(category => {
    console.log(category.get());
  });
