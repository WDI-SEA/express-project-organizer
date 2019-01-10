var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', (req, res) => {
  // List all categories
  db.category.findAll().then((categories)=>{
    res.render('technologies/index', { categories: categories });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/:id', (req, res) => {
  db.category.findAll({
    where: {id: req.params.id},
    include: [db.project]
  }).then((cat)=>{
    res.render('technologies/show', { category: cat });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});


module.exports = router;