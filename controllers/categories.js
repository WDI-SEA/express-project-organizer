let express = require('express')
let db = require('../models')
let router = express.Router()


router.get('/', async (req, res)=>{

    const allCats = await db.category.findAll() 

    res.render('categories/categories', {categories: allCats})

})

router.get('/:id', async (req, res)=>{

    const singleCat = await db.category.findAll({
        where: {
            id: req.params.id
        }, 
        include: {
            model: db.categoriesprojects
        }
    })
    console.log(singleCat)
    // console.log(singleCat.projects[0].dataValues.name)



    res.render('categories/show', {singleCat: singleCat})
})

module.exports = router