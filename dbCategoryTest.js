var db = require('./models')

db.category.create({
    name: 'node'
}).then(category => {
    console.log(category.get(db))
})