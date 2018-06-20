const express = require('express');
const db = require('../models');
const router = express.Router();

// POST /projects - create a new project
router.post('/', (req,res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then( (project) => {
    db.category.findOrCreate({
      where: {name: req.body.categoryName}
    }).spread( (category, created) => {
      project.addCategory(category).then((category) => {
        console.log(category + "added to" + project);
        res.redirect('/');
      })
    })
  }).catch( (error) => {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findById(req.params.id).then((project) => {
    project.getCategories().then( (categories) => {
      if (!project) throw Error();
      res.render('projects/show', {project, categories});
    }).catch( (error) => {
      res.status(400).render('main/404');
    })
  })
})

module.exports = router;
