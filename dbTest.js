const db = require("./models")

const createCategory = async (name) => {
  try {
    const [newCategory, wasCreated] = await db.category.findOrCreate({
      where: {
        name,
      },
    })

    console.log("New category >>", newCategory.dataValues)
  } catch (err) {
    console.error("🔥 Error creating category:\n", err)
  }
}

createCategory("node")
createCategory("python")
