let express = require('express')
let db = require('../models')
const category = require('../models/category')
let router = express.Router()

router.get('/', async (req, res) => {
  try {
      const categories = await db.category.findAll()
      res.render('categories/categories', {cat : categories})
  } catch (error) {
      console.log(error)
    res.status(400).render('main/404')
  }
})

router.get('/:id', async (req, res) => {
    try {
      const projCat = await db.category.findAll({
          where: {
              id: req.params.id
          },
          include: [db.project]
      })        
      res.render('categories/projects', {projList: projCat})
    } catch (error) {
        console.log(error)
        res.status(400).render('main/404')
    }
    
})

module.exports = router
