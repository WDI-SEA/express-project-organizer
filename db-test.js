const db = require('./models')

db.category.create({
    name: 'node'
}).then(category => {
    console.log(category.id)
}).catch(error => {
    console.log(error)
})

