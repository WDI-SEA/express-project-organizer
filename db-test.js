const db = require('./models')

db.category.create({
    name: 'sam'
}).then(category => {
    console.log(category.id)
}).catch(error => {
    console.log(error)
})

// db.project.findOne({
//     where: { id: 1 },
//     include: [db.category]
// }).then(project => {
//     console.log(project.categories)

//     project.createCategory({ name: 'express' }).then(category => {
//         console.log(category.id)
//     })
// })