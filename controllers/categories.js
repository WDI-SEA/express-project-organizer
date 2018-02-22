var express = require('express');
var db = require('../models');
var router = express.Router();


// GET /categories - show all categories that exist
router.get('/', function(req, res) {
    db.category.findAll().then(function(categories) {
        res.render('categories/index', { categories: categories });
    });
})

// GET /categories/:id - show a specific category and all the projects with that category
router.get('/:id', function(req, res) {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    }).then(function(category) {
        res.render('categories/show', { category: category});
    });
})


module.exports = router;