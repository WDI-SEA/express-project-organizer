let express = require('express')
let db = require('../models')
let router = express.Router()


//GET /categories -- show all categories that exist
router.get('/', async (req,res) => {
    try{
     const allCategories = await db.category.findAll({attributes: ['name']})
     res.render('categories/index', {allCategories: allCategories})

    }catch(err){
      console.log(err)
    }
  })

  //router.get/:id -- show a specific project
router.get('/:id', async (req,res) => {
  try{
    const oneCategory = await db.category.findOne({
      where: {id: req.params.id}
    })
     await oneCategory.count(db.project)
    res.send(count)

  }catch(err){
    console.log(err)
  }

})

  module.exports = router

