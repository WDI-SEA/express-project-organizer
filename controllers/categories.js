var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
    db.category.findAll()
    .then(function(categories) {
        res.render('categories/index', {categories})
    });
});

router.get('/:id', function(req, res) {
    db.category.find({
        where: {id: req.params.id},
    }).then(function(category) {
        category.getProjects().then(function(projects) {
            res.render('categories/show', {category, projects});
            });
        });
    });


module.exports = router;
