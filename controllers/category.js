let express = require('express')
let db = require('../models')
let router = express.Router()
const category = require('../models/category')

// get categories
router.get('/' , async (req,res) => {
    const categories = await db.category.findAll()
    res.render('categories/index.ejs', {
        category: categories
    })
})


// get with categories :id
router.get('/:id', async (req, res) => {
    const proj = await db.category.findOne({
        where: {
            id: req.params.id},
         include: db.project
    })
    // console.log(proj)
    res.render('categories/projects.ejs', {
        category: proj})

})



module.exports = router