let async = require('async')
let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  // Handle checkboxes (existing categories)
  let categories = typeof req.body.existing_categories === 'string' ? [req.body.existing_categories] : req.body.existing_categories

  // Grab any new categories
  if (req.body.new_categories) {
    categories = categories.concat(req.body.new_categories.split(','))
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(project => {
    async.forEach(categories, (c, done) => {
      db.category.findOrCreate({
        where: { name: c.trim() }
      })
      .then(([category, wasCreated]) => {
        project.addCategory(category)
        .then(() => {
          done()
        })
        .catch(done)
      })
      .catch(done)
    }, () => {
      // Final function; runs once when everything is done
      res.redirect('/')
    })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  db.category.findAll()
  .then(categories => {
    res.render('projects/new', { categories })
  })
  .catch(error => {
    res.status(400).render('main/404')
  })
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
