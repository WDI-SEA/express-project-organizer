const db = require('./models')

// creating a category with the name of node
db.category.create({
    name: 'node'
})
    .then(category => {
        console.log(category.id)
    })
    .catch (console.log)


// create an async/await function 
async function createCategory() {
    try{
        const newCategory = await db.category.create({
            name: 'python'
        })
        console.log(newCategory)
    }catch(err) {
        console.log(err)
    }
}

createCategory()
