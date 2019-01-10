const db = require('./models');

db.project
  .find({
    where: { id: 1 },
    include: [db.category],
  })
  .then(project => {
    console.log(project.category);

    project.createCategory({ name: 'flask' }).then(category => {
      console.log(category.get());
    });
  });
