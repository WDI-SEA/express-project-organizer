var express = require('express')
var db = require('../models')
var router = express.Router()
let async = require('async')

// POST /projects - create a new project
// ASYNC projects - categories - projectcategories

router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    res.redirect('/')
  })
  .catch(function(error) {
    console.log('Error in POST /reviews', error)
    res.status(400).render('main/404')
  })
})



// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  db.category.findAll()
  .then((categories)=>{
    res.render('projects/new', {categories: categories })
  })
  .catch((err) => {
      console.log('Error in POST /reviews', err)
      res.status(400).render('main/404')
    })
  
})

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.findOne({
    where: { id: req.params.id }
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


