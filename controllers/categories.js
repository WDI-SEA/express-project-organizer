//required packages
let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - show all the categories that exist
router.get('/', async (req, res) => {
    try {
        const allCategory = await db.category.findAll()
        // console.log(allCategory)
        res.render('categories/show', { category: allCategory })
    } catch (err){
        console.log(err)
    }
})

// GET /categories/:id - show a specific category and all the projects with that category
router.get('/:id', async (req, res) => {
    try {
        //req.param the name of the category
        let categoryName = req.params.id
        // console.log(categoryName)
        //ask what projects are associated with that category
        let findCategory = await db.category.findOne({
            where: {
                name: categoryName
            }, 
            include: [{
                model: db.project
            }]
        })
        console.log(findCategory.projects.description)
        //output a list of all projects associated with that category

        res.render('categories/categoriesProject', { category: findCategory})
    } catch (err){
        console.log(err)
    }
})

//export the router
module.exports = router