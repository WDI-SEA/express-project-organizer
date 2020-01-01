let express = require('express')
let db = require('../models')
let router = express.Router()

//GET display all categories
router.get('/cats', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        res.render('categories/cats', { categories: categories })
    })
    .catch((error) => {
        console.log('Error in GET /', error)
        // res.status(400).render('main/404')
    })
})

//GET categories/:id - display specific category and its related projects
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id }
    })
    .then((category) => {
        res.render('categories/show', { category: category})
    })
    .catch((error) => {
        console.log('Error in SHOW', error)
    })
})



module.exports = router