var express = require('express')
var db = require('../models')
var router = express.Router()
let async = require('async')

// POST ROUTE

router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    
 
// is req.body.tech a string? (because only one box is selected)
  // if so, make it an array
  // if not, it's an array, so just copy it over

    //handle checkboxes for tech
    let tech = typeof req.body.tech == 'string' ? [req.body.tech] : req.body.tech
      console.log(req.body.tech)

    // handle text input for newTech
    if (req.body.newTech){
      // regex the input box, then split into an array by commas
      let newTech = req.body.newTech.replace(/(\s+)?,\s+/gm, ',');
      // add to tech
      tech = tech.concat(newTech.split(','))
    }
   
    // async to make sure things are added in correct order
    // so relationships can be made
    async.forEach(tech, (cat, done) => {
      db.category.findOrCreate({
        where: { name: cat }
      })
      .spread((category, wasCreated) => {
        project.addCategory(category)
        .then(() => {
          // res.redirect, or whatevs
          console.log('done adding', cat)
          done()
        })
      })
    }, () => {
      console.log('EVERYTHING is done. Now redirect or something')
      res.redirect('/')
    })

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
    where: { id: req.params.id },
    include: [db.category]
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


