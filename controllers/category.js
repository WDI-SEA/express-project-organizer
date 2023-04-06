let express = require('express')
let db = require('../models')
let router = express.Router()


//GET /categories -- show all categories that exist
router.get('/category', async (req,res) => {
    try{
     const allCategories = await db.category.findAll()
     console.log("im here")
     res.send(allCategories)
    }catch(err){
      console.log(err)
    }
  })

  module.exports = router

