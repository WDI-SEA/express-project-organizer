// Get /categories to show all the categories
// Get  /categories/:id to show specific category by projects that assigned
const express = require('express')
const db = require('../models')
const router = express.Router()
router.get('/', (req, res) => {
    db.category.findAll().then(categories=>{
        console.log(categories)
        
        res.render('category/show',{categories:categories})
    })
  })
router.get('/:idx', (req, res) => {
    db.category.findOne({
        where:{
            id:req.params.idx
        },
        include:[db.project]
    }).then(category=>{
        // results.projects.forEach(result=>{

            // })
                console.log(category)
            
        res.render('category/detail.ejs',{details:category.projects,name:category.name})
    })
  })
  module.exports = router