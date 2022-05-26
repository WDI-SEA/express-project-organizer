const db = require('./models')

db.category.create({
    name: 'node'
  })
  .then(category => {
    console.log(category.id)
  })
  .catch(console.log)

async function createCategory() {
  try {
    const newCategory = await db.category.create({ name: 'python' })
    console.log(newCategory)
  } catch (err) {
    console.log(err)
  }
}

createCategory()