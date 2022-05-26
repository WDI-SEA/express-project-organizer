const db = require("./models")
const project = require("./models/project")
const chalk = require("chalk")

// NOTE test category model
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

// createCategory("node")
// createCategory("python")

// NOTE test projectCategories join model

const createProjectCategory = async () => {
  try {
    const firstProject = await db.project.findOne({ include: db.category })
    if (!firstProject) throw "could not find a project"

    const category = await firstProject.createCategory({ name: "express" })
    console.log(chalk.blue("Project >>"), firstProject.dataValues)
    console.log(chalk.blue("Category >>"), category.dataValues)
  } catch (err) {
    console.log(chalk.red("🔥 Error creating category:\n"), err)
  }
}
// createProjectCategory()

const getProjectCategories = async () => {
  try {
    const project = await db.project.findOne({ include: db.category })
    if (!project) throw "Could not find a project. Create one first"

    console.log(chalk.blue("Project Categories:"))
    project.categories.forEach((category) => {
      console.log(chalk.blue("category"), category.dataValues)
    })
  } catch (err) {
    console.log(chalk.red("Error getting project categories:"), err)
  }
}
getProjectCategories()
