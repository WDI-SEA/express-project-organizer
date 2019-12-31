let express = require('express')
let db = require('../models')
let router = express.Router()
var async = require('async')

router.get('/', (req, res)=> {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories })
    })
  })
  
router.get('/:id', (req, res) => {
    db.category.findOne({
      where: {id: req.params.id},
      include: [ db.project ]
    })
    .then((category) => {
      res.render('categories/show', { category: category})
    })
})

module.exports = router