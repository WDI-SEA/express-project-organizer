let async = require('async')
let express = require('express')
let db = require('../models') //access database
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  //get the categories and separate by comma
  let categories = []
  if (req.body.categories) {
    categories = req.body.categories.split(',')
  }
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    //if categories exist, check if exists, if not, create it, attach to the project
    if (categories.length) {

      async.forEach(categories, (c, complete) => {
        db.category.findOrCreate({
          where: { name: c.trim() }
        })
        .then(([newcategory, wasCreated]) => {
          project.addCategory(newcategory)
          .then(() => {
            complete()
          })
          .catch(function(error) {
            res.status(400).render('main/404')
            complete()
          }) //end of adding to join table
        })
        .catch(function(error) {
          res.status(400).render('main/404')
          complete()
        })
      }, () => {
        //executes one time only when entire list is complete (all done functions have been called for each iteration)
        res.redirect('/projects/' + project.id)
      })
    } else {//End of if, if no categories
      res.redirect('/projects/' + project.id)
    }
  })
  .catch(function(error) {
    res.status(400).render('main/404')
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
    include: [ db.category]
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
