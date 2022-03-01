let express = require('express')
let db = require('../models')
let router = express.Router()

// find all categories
router.get('/', async (req, res) => {
    try {
        const foundCategories = await db.category.findAll({}) 
        res.render('./categories/index.ejs', {categoryArray: foundCategories})
    } catch (err) {
        consosle.log(err)
    }
})

// find one category
router.get('/:id', async(req, res) => {
    try { 
        const selectedCategory = await db.category.findOne({
        where: {
            id:req.params.id
        },
        include: [db.project]
    })
    res.render('./categories/show.ejs', {categoryObject: selectedCategory})
}
catch (err) {
    console.log(err)
}
})
module.exports = router