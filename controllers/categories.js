let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async function(req,res){
 const categories = await db.category.findAll()
//  console.log(categories)
 res.render('categories/show.ejs', {categories})
})

router.get('/:id', async function(req,res){
 const category = await db.category.finOne()
 where: {id: req.params.id}
 include: {db.project}

 res.render('categories/assProjects.ejs', {category})
})

module.exports = router