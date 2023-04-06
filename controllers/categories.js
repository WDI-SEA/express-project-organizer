let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
  db.category.findAll()
  .then((category) => {
    res.render('categories/categories', {category: category})
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
  })

  router.get('/:id', async (req, res) => {
    try {
      const category = await db.category.findByPk(req.params.id, {
        include: [db.project]
      })
      res.render('categories/show', { category: category })
    } catch (error) {
      console.log('Error in GET /categories/:id', error)
      res.status(400).render('main/404')
    }
  })


module.exports = router