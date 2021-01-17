let express = require('express')
let db = require('../models')
const category = require('../models/category')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  
  db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    }
}).then(([project, wasCreated]) => {
    let categories = req.body.categories.split(', ')
    
      console.log('Categories: ')
      console.log(categories)
      categories.forEach((category, i) => {
        db.category.findOrCreate({
        where: {
            name: category
          }
        }).then(([category, wasCreated]) => {
          project.addCategory(category).then((r) => {
            res.redirect('/')
        })
        .catch((error) => {
          res.status(400).render('main/404')
        })
      })
    })
  })
})

//Route to edit projects
router.put('/:id', (req, res) => {
  let categories = req.body.categories.split(', ')
  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    db.project.findOne({
      where: {id:req.params.id},
      include: [db.category]
    }).then((project) => {
      console.log(categories)
      console.log(project.categories)

      project.categories.forEach(category => {
        project.removeCategory(category)
      })
      
      categories.forEach((category, i) => {
        db.category.findOrCreate({
          where: {
              name: category
            }
          }).then(([category, wasCreated]) => {
            project.addCategory(category).then((r) => {
              console.log(project.categories)
              res.redirect(`/projects/${req.params.id}`)
          })
          .catch((error) => {
            res.status(400).render('main/404')
          })
        })
      })
    })
  })
})

//Route to show edit page
router.get('/edit/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    console.log(project.description)
    res.render('projects/edit', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

//Route to delete projects

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
