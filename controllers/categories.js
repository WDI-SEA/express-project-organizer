var express = require('express');
var db = require('../models');
var router = express.Router();


//Find All 
router.get('/', function(req, res) {
    db.category.findAll()
    .then(function(categories) {
        res.render('categories/index', {categories})
    });
});


// ID Route 
router.get('/:id', function(req, res) {
    db.category.findOrCreate({
        where: {name: req.params.id},
        include: [db.project]
    }).then(function(category) {
        category.getProjects().then(function(projects){
        res.render('categories/show', {category, projects});    
        })
    });
});


// Post Route 
router.post("/", function(req, res){
        db.category.create({
            name: req.body.id
        }).then(function(category){
            res.redirect("/categories")
    })
})




module.exports = router;