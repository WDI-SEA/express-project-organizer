var express = require('express');
var db = require('../models/');
var router = express.Router();

router.get('/', function(req,res){
    db.category.findAll({
        include: [db.project]
    }).then(function(categories){
        res.render('categories/all.ejs', {categories:categories});
    })

    console.log('get route reached');
});

router.get('/:id', function(req, res){
    db.category.findOne({
        where: {id: req.params.id},
        include: [db.project]
    }).then(function(cat){
         // res.send(cat);
        res.render('categories/single.ejs', {cat:cat});
    })
});

module.exports = router;