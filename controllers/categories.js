const express = require('express')
const { Model } = require('sequelize')
const db = require('../models')
const app = express()
const router = express.Router()


router.get('/:id', async (req,res) => {
    try{
      //use to get req.params.id
      const category = await db.category.findOne({
        where: {
          id: req.params.id
        },
        //imbed associated projects in this category
        include: [db.project]
      })
      //way one to get all projects associated with category, or can use the imbed above
      //const projects = await category.getProjects()
      //console.log(projects)
      // res.json(category) // dont need this
      res.render('categories/detail.ejs', {category})
    }  catch(error) {
        console.log('Error in GET /', error)
        // res.status(400).render('main/404')
    }
  })

  router.get('/', async (req,res) => {
    try{
      const allCategories = await db.category.findAll()
      //way one to get all projects associated with category, or can use the imbed above
      //const projects = await category.getProjects()
      //console.log(category)
      //res.json(category) // dont need this
      console.log(allCategories[0].id, allCategories[0].name)
      res.render('categories/show.ejs', {allCategories})
    }  catch(error) {
        console.log('Error in GET /', error)
    }
  })


  module.exports = router