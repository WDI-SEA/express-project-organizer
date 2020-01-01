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
  .then(function(project) {
    let categories  = [];
    if(req.body.categories){ categories = req.body.categories.split(','); }

    categories.forEach(function(c){
      db.category.findOrCreate({
        where: { name: c.toLowerCase().trim() }
      }).spread(function(foundCategory, wasCreated){
        project.addCategory(foundCategory);
      }).catch(function(err){
        console.log(err);
      });
    });

    
  res.redirect('/');
  })
  .catch((error) => {
    res.send(error)
    console.log(error)
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
    db.category.findAll()
    .then(categories => {
    res.render('projects/show', { project: project, categories })
    })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
