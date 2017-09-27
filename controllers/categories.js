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
var catId = req.params.id;
console.log("_____________________" + catId);
db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    }).then(function(category) {
        res.render('categories/show', { projects: projects })
    })
    .catch(function(error) {
        res.status(400).render('main/404');
    });
});
});

module.exports = router;