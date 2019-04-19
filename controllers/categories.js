var express = require('express')
var db = require('../models')
var router = express.Router()
let async = require('async')

// POST /categories - create a new category

router.post('/', function(req, res) {
  db.category.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(category) {
    res.redirect('/')
  })
  .catch(function(error) {
    console.log('Error in POST /reviews', error)
    res.status(400).render('main/404')
  })
})

// GET /categories/index - displays all categories
router.get('/', function(req, res) {
  db.category.findAll({include: [db.project]})
  .then(function(categories) {
    res.render('categories/index', { categories: categories })
  })
  .catch(function(error) {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})

// GET /categories/new - display form for creating a new category
router.get('/new', function(req, res) {
  db.project.findAll()
  .then((projects)=>{
    res.render('categories/new', {projects: projects })
  })
  .catch((err) => {
      console.log('Error in POST /reviews', err)
      res.status(400).render('main/404')
    })
  
})

// GET /categories/:id - display a specific category
router.get('/:id', function(req, res) {
  db.category.findOne({
    where: { id: req.params.id },
    include: [db.project]
  })
  .then(function(category) {
    if (!category) throw Error()
    res.render('categories/show', { category: category })
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

module.exports = router


