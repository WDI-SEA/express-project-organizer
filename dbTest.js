const db = require('./models')

// db.category.create({
//     name: 'node'
// }).then(category => {
//     console.log(category.id)
// })

// db.project.findOne({
//     where: { id: 1 },
//     include: [db.category]
// }).then(project => {
//     console.log(project.categories)

//     project.createCategory({ name: 'express' }).then(category => {
//         console.log(category.name)
//     })
// })

db.project.findAll({
    include: [db.category]
  }).then(projects => {
      projects.forEach(project => {
        console.log(project.categories)
      })
  })