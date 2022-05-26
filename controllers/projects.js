let express = require("express")
let db = require("../models")
let router = express.Router()
const chalk = require("chalk")

// POST /projects - create a new project
router.post("/", async (req, res) => {
  try {
    console.log(chalk.green("Creating project"))
    const project = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description,
    })

    const enteredCategory = req.body.category
    let category
    if (enteredCategory !== "") {
      console.log(chalk.green("Creating category"))
      ;[category] = await db.category.findOrCreate({
        where: { name: req.body.category },
      })
    }

    console.log(chalk.magenta("Category>>", category))

    if (category) {
      console.log(chalk.green("Adding category to project"))
      await project.addCategory(category)
    }

    res.redirect("/")
  } catch (error) {
    console.error(chalk.red("🔥 in projects post", error))
    res.status(400).render("main/404")
  }
})

// GET /projects/new - display form for creating a new project
router.get("/new", (req, res) => {
  res.render("projects/new")
})

// GET /projects/:id - display a specific project
router.get("/:id", (req, res) => {
  db.project
    .findOne({
      where: { id: req.params.id },
    })
    .then((project) => {
      if (!project) throw Error()
      res.render("projects/show", { project: project })
    })
    .catch((error) => {
      res.status(400).render("main/404")
    })
})

module.exports = router
