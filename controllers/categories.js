let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async(req, res) => {
  try {
      const foundCategories = await db.category.findAll()
      // console.log(foundCategories)
      res.render('categories/categories.ejs', {foundCategories})
  } catch (err) {
      console.log(err)
  }
  
})

router.get('/:id', async(req, res) => {
  const findMatch = await db.category.findOne({
    where: {
      id: req.params.id,
    
    },
     include: [db.project]
  })
  // console.log(findMatch)
  res.render('categories/new.ejs', {projects: findMatch.projects, findMatch})
})
module.exports = router