const db = require('./models');

db.category
  .create({
    category: 'flask',
  })
  .then(category => {
    console.log(category.get());
  });
