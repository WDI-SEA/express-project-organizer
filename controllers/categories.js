let express = require('express')
let db = require('../models')
let router = express.Router()

//GET /categories - show all categories
router.get('/', function (req, res) {
    db.category.findAll().then(function (categories) {
        res.render('categories/index', { categories })
    })
});

//GET /categories/:id - show one category and all things associated with it
router.get('/:id', function (req, res) {
    db.category.findByPk(parseInt(req.params.id))
        .then(function(category) {
            category.getProjects().then(function (projects) {
                console.log(projects)
                res.render('categories/show', { category, projects })
            })
        })
});



module.exports = router