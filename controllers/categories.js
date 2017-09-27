var express = require('express');
var db = require('../models');
var router = express.Router();

// GET route to display all the categories
router.get('/', function(req, res) {
    db.category.findAll()
        .then(function(categories) {
            res.render('categories/index', { categories: categories });
        });
});

// GET route for a specific id of categories
router.get('/:id', function(req, res) {
    db.category.find({
        where: { id: req.params.id }
    }).then(function(category) {
        category.getProjects().then(function(projects) {
            res.render('categories/show', { projects: projects });
        }).catch(function(error) {
            res.status(400).render('main/404');
        });
    });
});
router.get('/:id/toproj', function(req, res) {
    res.redirect('/projects/' + req.params.id);
});

module.exports = router;