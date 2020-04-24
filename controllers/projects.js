let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')

// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories = []
  
  if(req.body.category){
      categories = req.body.category.split(',')
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
        where: { name: cat.trim()}
        })
        .then(([category, wasCreated]) => {
          project.addCategory(category)
          .then(() => {
            done()
          })
          .catch((error) => {
            console.log("first catch", error)
            done()
          })
        })
        .catch((error) => {
          console.log("second catch", error)
          done()
      })
    }, () => {
      //this runs when everything has resolved
      res.redirect('/projects/' + project.id)
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
      include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.post('/addCat', (req, res) => {
  let projectNum = req.body.projectId
  console.log(req.body.category)
  db.category.findOrCreate({
    where: {name: req.body.category}
  })
  .then((category)=>{
    db.project.find({
      where: {id: projectNum}
    })
    .then(([project, wasCreated]) => {
      category.addProject(project)
      .then(() => {
        res.send("you made it")
      })
      .catch((error) => {
        console.log("first catch", error)
        done()
      })
    })
  })
  .catch((err)=>{
    console.log(err) 
  })
})

module.exports = router
