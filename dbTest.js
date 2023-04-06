const db = require('./models')

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
//     where: { id: 1 },
//     include: [db.category]
//   })
//   .then(project => {
//     // by using eager loading, the project model should have a categories key
//     console.log(project.categories)

//     // createCategory function should be available to this model - it will create the category then add it to the project
//     project.createCategory({ name: 'express' })
//     .then(category => {
//       console.log(category.id)
//     })
//   })
// const db = require('./models')

// db.category.findOne({
//     where: { id: categoryId },
//     include: [db.project]
//   })
//   .then(category => {
//     console.log(category.Projects)
// //   })
//   db.category.findOne({
//     where: { id: 1 },
//     include: [db.project]
//   })
//   .then(category => {
//     console.log(category.projects)
//   })