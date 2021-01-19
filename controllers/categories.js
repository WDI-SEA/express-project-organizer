let express = require('express')
let db = require('../models')
let router = express.Router()

//Get /categories READ and render all Categories
router.get('/', (req, res) =>{
  db.category.findAll()
  .then(categories =>{
    res.render('categories/index.ejs', {categories})
  })
  .catch(error =>{
    res.status(400).render('main/404')
  })
})

router.get('/:id', (req, res) =>{
  this.bind.category.findOne({
    where: {
      id: req.params.id
    },
    include: [db.project]
  })
  .then(category => {
    res.render('categories/show.ejs', {category})
  })
})

module.exports = router