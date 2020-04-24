let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')

// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories = []
  if (req.body.categoryName) {
    categories = req.body.categoryName.split(',')
  }
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
    .then((project) => {
      async.forEach(categories, (cat, done) => {
        db.category.findOrCreate({
          where: { name: cat.trim() }
          })
          .then(([cat, wasCreated]) => {
            project.addCategory(cat)
            .then(() => {
              done()
            })
            .catch(err => {
              console.log('error')
              done()
            })
          })
          .catch(err => {
            console.log('error')
            done()
            res.status(400).render('main/404')
          })
      })
      res.redirect('/')
    
    })
})

// GET /projects/new - display form for creating a new project
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
    console.log("PROJECTTTT-", project)
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

//POST /projects/:id - delete a specific project
router.delete('/:id', (req, res) => {
  db.project.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


module.exports = router
