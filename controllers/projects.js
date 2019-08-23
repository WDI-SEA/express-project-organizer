const express = require('express')
const db = require('../models')
const router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })
    .then((project) => {
      db.category.findOrCreate({
        where: { 
          name: req.body.category 
        }
      })
      .spread((category, created) => {
        project.addCategory(category)
        .then((category) => {
          res.redirect(`/projects/${project.id}`)
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).render('main/404')
      })
    
      // res.send(project);
      // res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
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
      where: {
        id: req.params.id
      }
    })
    .then((project) => {
      if (!project) throw Error()
      res.render('projects/show', {
        project: project
      })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
})

module.exports = router