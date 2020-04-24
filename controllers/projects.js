let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')

// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories
  if(req.body.categories) {categories = req.body.categories.split(/,[ ]*/).filter(Boolean)}
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    async.forEach(categories, (category, done) => {
      db.category.findOrCreate({where: {name: category}})
      .then(([cat, wasCreated]) => {
        project.addCategory(cat)
        .then(() => done())
        .catch(err => done())
      })
      .catch(err => {
        console.log(error);done()
        res.status(400).render('main/404')
      })
    }, () => {res.redirect('/')})
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  db.category.findAll()
  .then(categories => res.render('projects/new', {categories}))
  .catch((error) => {
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
    res.render('projects/show', { project: project })
  })
  .catch(err => res.status(400).render('main/404'))
})

// GET the edit page for an article
router.get('/edit/:id', (req,res) => {
  db.project.findOne({
    where: {id:req.params.id},
    include: [db.category]
  })
  .then(project => {
    let catString = ''
    project.categories.forEach(c => catString += (c.name + ', '))
    res.render('projects/edit', {project, catString})
  })
  .catch(err => res.status(400).render('main/404'))
})

// PUT the new data into the database
router.put('/edit/:id', (req,res) => {
  // Update the data. However, it will not update the categories.
  db.project.update(req.body,{where:{id:req.params.id}})
  .then()
  .catch()
  // Trim down the categories to something useful
  let categories
  if(req.body.categories) {categories = req.body.categories.split(/,[ ]*/).filter(Boolean)}
  // Update the categories specifically.
  db.project.findOne({
    where:{id: req.params.id},
    include: [db.category]
  })
  .then((project) => {
    // Remove any excess categories that no longer apply
    project.categories.forEach(pc => {
      let remains = false
      categories.forEach(nc => {if(nc.trim() === pc.name) {remains = true}})
      if(!remains) {project.removeCategory(pc)}
    })
    async.forEach(categories, (category, done) => {
      db.category.findOrCreate({where: {name: category}})
      .then(([cat, wasCreated]) => {
        project.addCategory(cat)
        .then(() => done())
        .catch(err => done())
      })
      .catch(err => {
        console.log(err);done()
        res.status(400).render('main/404')
      })
    }, () => {res.redirect('/projects/'+project.id)})
  })
})

module.exports = router
