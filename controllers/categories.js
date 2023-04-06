let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - show all the categories that exist
router.get('', (req, res) => {
    db.category.findAll({
      include: [db.project]
    })
    .then((categories) => {
      if (!categories) throw Error()
      res.render('categories/show', { categories: categories })
      console.log('worked')
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })



module.exports = router