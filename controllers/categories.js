var express = require('express');
var db = require('../models');
var router = express.Router();


router.get('/', function(req, res) {
    db.category.findAll()
        .then(function(categories) {
            res.render('categories/index', { categories });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

router.get('/:id', function(req, res) {
    db.category.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.project]
    }).then(function(category, projects) {
        // res.json(category)
        res.render('categories/show', {category, projects: category.projects});
    });
});

module.exports = router;