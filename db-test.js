const db = require('./models')

async function createCategory() {
  try {
    const newCategory = await db.category.create({ name: 'python' })
    console.log(newCategory)
  } catch (err) {
    console.log(err)
  }
}

createCategory()

