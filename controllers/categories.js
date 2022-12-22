const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const allCategories = await db.category.findAll()
    res.render('categories/index.ejs', { allCategories })
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const category = await db.category.findOne({
      where: { id: req.params.id },
      include: [db.project]
    })
    res.render('categories/show.ejs', { category })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
