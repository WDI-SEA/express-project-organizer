var express = require('express')
var db = require('../models')
var async = require('async')
var router = express.Router()

// POST /projects - create a new project
router.post('/', function(req, res) {
  console.log('categoies:', req.body.category)
  // Handle textbox for categories
  let cats = typeof req.body.category == 'string' ? [req.body.category] : req.body.category
  if (req.body.category) {
    cats = req.body.category.split(',')
    console.log(cats)
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    async.forEach(cats, (cat, done) => {
      db.category.findOrCreate({
        where: { name: cat.trim() }
      }).spread((category, wasCreated) => {
        // Create an entry in the join table
        project.addCategory(category)
        .then(() => {
          done()
        })
        .catch(done)
      })
      .catch(done)
    }, () => {
      res.redirect('/projects/' + project.id)
    })
  })
  .catch(function(error) {
    console.log('error', error)
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.findOne({
    where: { id: req.params.id },
    include: [ db.category ]
  })
  .then(function(project) {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

module.exports = router
