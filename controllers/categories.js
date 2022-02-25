let express = require('express')
const res = require('express/lib/response')
let db = require('../models')
let router = express.Router()

router.get('/', async (req, res) => {

    try {
        // const viewCategories = await db.category.findAll()
        // res.render('categories/view', { categories: viewCategories })
        const num = 1
        console.log(num)
        res.render('categories/view', { number: num })

    } catch (error) {
        console.log('Error in GET /', error)
        res.status(400).render('main/404')
    }
})

module.export = router