let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/' , async (req,res) => {
    try {
        const categories = await db.category.findAll()
        console.log(categories)
        res.render('categories/index', {categories: categories})
    }
    catch (err) {
        console.log('FIRE ERRRRRR', err)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const category = await db.category.findOne({
            where: {
                id: req.params.id
            }
        })
        
        const projects = await category.getProjects()
        res.render('categories/show', {category: category, projects: projects})

    }
    catch  (err) {
        console.log(err)
    }
})






module.exports = router