var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

//GET /categories -display all categorie
router.get('/', function(req, res) {
    res.render('category/all');
});


// GET /categories/:id - display a specific category
router.get('/:id', function(req, res) {
    db.category.find({
            where: { id: req.params.id }
        })
        .then(function(category) {
            if (!category) throw Error();
            res.render('category/show', { category: category });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});



module.exports = router;
