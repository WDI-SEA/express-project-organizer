var express = require('express')
var db = require('../models')
var router = express.Router()



router.get('/',(req,res)=>{
  db.category.findAll()
  .then(categories =>{
    res.render('categories/index', { categories })
  })
  .catch(err=>{
    console.log(err)
    res.render('404')
  })
})

router.get('/:id',(req,res)=>{
  db.category.findOne({
    where : { id: req.params.id},
    include : [db.project]
  })
  .then(foundCategory =>{
    console.log(foundCategory)

    res.render('categories/show', { found:foundCategory, foundCategory: foundCategory.projects})
  })
  .catch(err=>{
    console.log(err)
    res.render('404')
  })
})




module.exports = router
