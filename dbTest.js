var db = require('./models');

// db.categorie.create({
//   name: 'node'
// }).then(function(categorie) {
//   console.log(categorie.get());
// });

// db.project.find({
//   where: { id: 1 },
//   include: [db.categorie]
// }).then(function(project) {
//   console.log(project.categories);
//   project.createCategorie({ name: 'node' })
//   .then(function(categorie) {
//     console.log(categorie.get());
//   });
// });

// db.project.findOrCreate({
//   where: { name: 'Test' },
//   defaults: {
//     githubLink: 'http://www.google.com',
//     deployedLink: 'http://www.reddit.com',
//     description: 'This is still a test'
//   },
//   include: [db.categorie]
// }).spread(function(project, created) {
//   console.log(project.get());
// });

// db.categorie.create({
//   name: 'test'
// }).then(function(categorie) {
//   console.log(categorie.get());
// });

db.categoriesProjects.create({
  projectId: '4',
  categorieId: '5'
}).then(function(added, created) {
  console.log(added.get());
});
