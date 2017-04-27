var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
    db.category.findAll()
        .then(function(categories) {
            res.render('categories/all', { categories: categories });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

router.get('/:id', function(req, res) {
    db.category.findOne({
            where: { id: req.params.id },
            include: [db.project]
        })
        .then(function(category) {
            if (!category) throw Error();
            res.render('categories/show', { category: category });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

module.exports = router;
