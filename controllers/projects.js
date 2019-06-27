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
  // db.category.findOrCreate()
  //   .then(function(categories) {
      res.render('projects/new');

    });
//});

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

//could i put this in the above route line 5
router.post('/:id/categories', function(req,res) {
  db.project.findByPk(parseInt(req.params.id))
  .then(function(project) {
      project.createCategory({
          name:req.body.name,
      }).then(function(category) {
          res.redirect('/projects/' + req.params.id);
      })
  })
});
module.exports = router
