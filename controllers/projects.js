let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /projects/new - display form for creating a new project with a category field
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST /projects - create a new project with a category
router.post('/', async (req, res) => {
  try {
    // no db implied. I have category the variable and I need to use it in line 33
    const [category] = await db.category.findOrCreate({
      where: { name: req.body.category }
    })
     await category.createProject({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description,
    })
    res.redirect('../')
  } catch (error) {
    res.status(400).render('main/404')
    console.log(error)
  }
})

// router.post('/', async (req, res) => {
//   try {
//     const [category] = await db.category.findOrCreate({
//       where: { name: req.body.category }
//     })
//     const project = await db.project.create({
//       name: req.body.name,
//       githubLink: req.body.githubLink,
//       deployLink: req.body.deployedLink,
//       description: req.body.description,
//     })
//     await project.addCategory(category)
//     res.redirect('/')
//   } catch (error) {
//     res.status(400).render('main/404')
//   }
// })
module.exports = router

