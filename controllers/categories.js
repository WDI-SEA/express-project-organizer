let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - show all the categories that exist
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.category.findAll()
    res.render('categories/show', { categories: categories })
  } catch (error) {
    console.log(error)
    res.status(400).render('main/404')
  }
})


module.exports = router