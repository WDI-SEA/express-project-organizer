let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const allCats = await db.category.findAll()
        // console.log(allCats)
        res.render('categories/categories.ejs', {categories: allCats})
    } catch (err){
        console.log(err)
    }
    
})

router.get('/:name', async(req, res)=>{
    try{
        const category = await db.category.findOne({
            where: {name: req.params.name},
            include: [db.project]
        })
        console.log(category)
        res.render('categories/catProjects.ejs', {
            category
        })
    } catch(err){
        console.warn(err)
    }
})

module.exports = router