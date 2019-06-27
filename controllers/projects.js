let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
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

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: {id: parseInt(req.params.id)},
    include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  });
});

// GET /projects/:id/edit - page let user update the project info
rounter.get('/:id/edit', function(req, res) {
  db.project.findOne({
    where: { id: parseInt(req.params.id)},
    include: [db.category]
  }).then(function(project) {
    res.render('projects/edit', {project});
  });
});

// PUT /projects/:id - update a project
router.put('/:id', function(req, res) {

})

module.exports = router
