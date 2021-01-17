let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll({
        include: [db.project]
    }).then(categories => {
        res.render('categories/index.ejs', {categories: categories})
    }).catch(error => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    res.render('categories/show.ejs', {category: {name: 'categoryName'}})
})

module.exports = router
