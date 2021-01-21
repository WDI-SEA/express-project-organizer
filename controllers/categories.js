let express = require('express')
let db = require('../models')
const category = require('../models/category')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories => {
        res.render('categories/index.ejs', { categories})
    })
})


router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {
            id: req.params.id
        },
        include: [db.project]
    })
    .then(category => {
        res.render('categories/show.ejs', { category })
    })
})
module.exports = router