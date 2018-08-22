var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', (req, res) => {
  db.category.findAll()
  .then( allCategories =>  res.render('categories/index', { categories: allCategories }) )
  .catch( err => res.status(400).render('main/404') );
});

router.get('/:id', (req, res) => {
  db.category.find({
    where: { id: req.params.id },
    include: [db.project] })
  .then( category => res.send( category ))
  // .then( category => res.render('categories/show', { category }) )
  .catch( err => res.status(400).render('main/404') );
});

module.exports = router;
