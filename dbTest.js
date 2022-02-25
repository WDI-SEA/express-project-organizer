const db = require("./models");

// db.category.create({
//     name: 'node'
//   })
//   .then(category => {
//     console.log(category.id)
//   })
//   .catch(console.log)

// async function createCategory() {
//   try {
//     const newCategory = await db.category.create({ name: 'python' })
//     console.log(newCategory)
//   } catch (err) {
//     console.log(err)
//   }
// }

// createCategory()


// db.project.findOne({
//   where: { id: 2 },
//   include: [db.category]
// })
// .then(project => {
//   // by using eager loading, the project model should have a categories key
//   console.log(project.categories)

//   // createCategory function should be available to this model - it will create the category then add it to the project
//   project.createCategory({ name: 'node' })
//   .then(category => {
//     console.log(category.id)
//   })
// })

// db.categoriesProjects.findOne({
//     where: { id: 4 }
//   }).then((response) => {
//   console.log(response);
// });
