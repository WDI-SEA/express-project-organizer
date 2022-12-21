let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  try{
    const [project, projectCreated] = await db.project.findOrCreate({
      where:{
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployLink,
        description: req.body.description
      }
    })
    let categoryName = req.body.category.toLowerCase()
    const [category, categoryCreated] = await db.category.findOrCreate({
      where: { 
        name: categoryName
      },
    })
    await project.addCategory(category)
    res.redirect('/')
  } catch(error){
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
