var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
    db.category.findAll().then(function(categories){
        res.render('/', categories);
    });
});

router.get('/:name', function(req, res) {
    db.category.findOne({
        where: {name: req.params.name}
    }).then(function(category) {
        category.getProjects().then(function(projects) {
            res.render('categories/show', {category, projects});
        });
    });
});

module.exports = router;
