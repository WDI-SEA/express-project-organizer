let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  //db.project.create({
   // name: req.body.name,
   // githubLink: req.body.githubLink,
   // deployLink: req.body.deployedLink,
   // description: req.body.description
  //})
  //.then((project) => {
  //  res.redirect('/')
 // })
  //.catch((error) => {
  //  res.status(400).render('main/404')
  //})
  try {
    const project = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })
    // find or create a category
    const array = await db.category.findOrCreate({
      where: {
        name: req.body.category
      }
    })
    // associate the category with the project 
    //await category.addProject(project) // ALSO COULD DO "project.addCategory(category)" <- SAME THING 
    await array[0].addProject(project) 
    res.redirect('/')
  } catch (err) {
    console.log(err)
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
