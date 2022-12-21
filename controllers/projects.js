let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  try {
    //create category
    // console.loclearg(req.body)
    const [category, cateCreated] = await db.category.findOrCreate({
      where: {
        name: req.body.category
      }
    })
    console.log(category)

    //create project
    const project = await db.project.create({
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployedLink,
        description: req.body.description
    })
    //add category to project
    await project.addCategory(category)

    //redirect to page with new project
    res.redirect('/')
  } catch(err) {
    console.log(err)
    res.status(400).render('main/404')
  }
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new.ejs')
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
