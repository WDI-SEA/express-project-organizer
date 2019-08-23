const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', (req, res) => {
  db.category.findAll()
  .then((categories) => {
    console.log(categories);
    res.render('categories/index', {
      categories
    });  
  })
  .catch((err) => {
    console.log(err);
  })
})

router.get('/:id', (req, res) => {
  db.category.findByPk(req.params.id, {
    include: [ db.project ]
  })
  .then((result) => {
    res.render('categories/show', {
      category: result
    })
  })
})


module.exports = router

