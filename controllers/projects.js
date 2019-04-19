var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /projects - create a new project
router.post('/', function(req, res) {
  var projectPromise =db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  });
  var arrayCategory = req.body.category.split(',')

  var categoryPromise = arrayCategory.map( cate =>{
    return db.category.findOrCreate({
           where: { name: cate }
        });
  })

  categoryPromise.push(projectPromise)

  Promise.all(categoryPromise).then(function(complete) {
    var project = complete.pop()
    var categoryProjectPromises = complete.map( result =>{
      return db.categoriesProjects.create({
        projectId: project.id,
        categoryId: result[0].id
      })
    })
    Promise.all(categoryProjectPromises).then(function(){
      res.redirect('/')
    })
    .catch(function(error) {
      console.log(error)
      res.status(400).render('main/404')
    })
  }).catch(function(error) {
    console.log(error)
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
