let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async (req,res) => {
    try {
        const allCategories = await db.category.findAll()
        // console.log(allCategories[0].name)
        res.render('categories/index', {categoryArr: allCategories})
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const selectedCategory = await db.category.findOne({
            where: {
                id: req.params.id
            },
            include: [db.project]
        })
        // console.log(selectedCategory.projects)
        // let projectArr = await selectedCategory.projects
        // let categoryName = await selectedCategory.name
        // await res.render('categories/show', {categoryData: categoryName, projectArr})
        console.log(req.params)
        res.render('categories/show', {categoryData: selectedCategory})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router