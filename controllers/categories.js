var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
    db.category.findAll().then(function(category) {

        res.render('./categories/categories', { category: category });
    });
});

router.get('/:id', function(req, res) {
    var categoryId = req.params.id;
    db.category.findOne({
        where: { id: categoryId },
        include: [db.project]
    }).then(function(category) {
        res.render('./categories/show', { category: category });
    });
})

module.exports = router;
