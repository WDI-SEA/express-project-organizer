let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  // testing
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
    // testing
  }).then((project) => {
    // project.getCategory().then(categories => {
    //   if(category.length > 0){
    //     category.forEach(category => {
    //       console.log(`${category.name}`)
    //     })
    //   } else {
        db.category.findOrCreate({
          where: {name: req.body.category }
        }) .then(([category, wasCreated]) => {
          project.addCategory(category).then(relationInfo => {
            console.log(`${category.name} was added to ${project.name}`)
          })
        })
      // }
    })
    
  // })
  .then((project) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  // testing
  db.project.findAll()
  .then((project) => {
    res.render('projects/new', {project: project})
  })
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
