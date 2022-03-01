let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - CREATE a new project -- then redirects it to HOME
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - DISPLAY FORM for creating a NEW PROJECT-- inside VIEWS/PROJECTS/NEW
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - DISPLAY a SPECIFIC PROJECT -- inside VIEWS/PROJECTS/SHOW
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
