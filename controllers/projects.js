let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')


// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories = [] //array was created to store the values we got from the form, in a way we can work with them individually
  if (req.body.categoryName) {
    categories = (req.body.categoryName.split(',')) // tags are seperated and stored within the array
  }
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    async.forEach(categories, (category, done) => { //categories is the array we set earlier and category is each element/value that were adding to the array. 
      db.category.findOrCreate({
        where: { name: category.trim()}//essentiually removes empty spaces of the string off the ends of the string (not in-between)
      })
      .then(([category, wasCreated]) => { 
        //wasCreated returns you 2 values (for other parameters) 
        //1st value = data collected 2nd value is the boolean value if it was created or found.
        project.addCategory(category)//'addCategory' were adding various categories to project
          .then(() => {
            done()
          })
          .catch((error) => {
            console.log(error)
            done()
            //res.status(400).render('main/404')
          })
        })
      .catch((error) => {
        console.log(error)
        done()
        res.status(400).render('main/404')
      })
    }, 
    () => {
      res.redirect('/')
      }
    )
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
    console.log(project.categories)
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
