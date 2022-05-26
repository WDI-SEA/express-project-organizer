let express = require('express')
let db = require('../models')
const category = require('../models/category')
let router = express.Router()

// GET /categories that shows all categories
router.get('/', async (req, res) => {
    const categories = await db.category.findAll()

    res.render('categories/index.ejs', {categories})
})

// GET /categories/:id that shows all projects of a specific category
router.get('/:id', async (req, res) => {
    try{
    const projByCat = await db.category.findOne({
        where: {id: req.params.id},
        include: db.project
    })
    console.log(projByCat.name)
    res.render('categories/projects.ejs', {category: projByCat})
    } catch(err) {
        console.warn(`Warning! Error:${err}`)
    }
})

module.exports = router