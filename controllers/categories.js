var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
    db.category.findAll()
        .then(function(projects) {
            res.render('categories/index', { categories: categories });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});
