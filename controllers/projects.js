let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  try {
    const createdProject = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })
    // ['the row that was created', true/false]
    const [category, wasCreated] = await db.category.findOrCreate({
      where: {
        // the req.body.______ this correlates with the name="____" in the input
        name: req.body.category
      } // can enter default values to give to the whole specific row here if you wanted
      // in this case, the category
    })
    // await category.addProject(createdProject) - does same thing as the code below
    await createdProject.addCategory(category)
    console.log(`${category.name} added to ${createdProject.name}`)
    console.log(`New category named ${category.name} was created True/False?: ${wasCreated}`)
    res.redirect('/')

  } catch (error) {
  // res.status(400).render('main/404')
  console.log(error)
  }
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
