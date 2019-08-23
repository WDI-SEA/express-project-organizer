const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
  db.category.findAll()
  .then(category => {
    console.log(category)
    res.render('categories/index', {category: category})
  })
})

router.get('/:id', (req, res) => {
  db.category.findByPk(req.params.id,
  {  include: [db.project]  })
  .then(category => {
    res.render('categories/show', {category})
  })
})

module.exports = router
