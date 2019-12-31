let express = require('express')
let db = require('../models')
let router = express.Router()
var async = require('async')

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(project){
  async.forEach(db.category, (category, done) => {
    db.category.findOrCreate({
      where: {
        name: req.body.categoryName
      }
    })
    .spread((category, wasCreated) => {
      project.addCategory(category)
      .then(() => {
        res.redirect('/')
        done()
      })
  })
}, () => {
  console.log('Done')
})
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
    include: [ db.category ]
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
