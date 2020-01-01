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
    })
})

//GET categories/:id - display specific category and its related projects
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then((category) => {
        category.getProjects()
        .then((projects) => {
            res.render('categories/show', { category, projects })
        })
    })
    .catch((error) => {
        console.log('Error in SHOW', error)
    })
})



module.exports = router