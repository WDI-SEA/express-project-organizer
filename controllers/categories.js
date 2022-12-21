let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - show all the categories
router.get('/', async (req, res) => {
    try {
        const allCategories = await db.category.findAll()
        res.render('categories/list', {
            categories: allCategories
        })
    } catch (err) {
        res.status(400).render('main/404')
    }
})

// GET /categories - show projects that has that catergory
router.get('/:id', async (req, res) => {
    try {
        const findCategoryP = await db.category.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.project
            }]
        })
        res.render('categories/deet', {
            categories: findCategoryP
        })
    } catch (err) {
        res.status(400).render('main/404')
    }
})



module.exports = router
