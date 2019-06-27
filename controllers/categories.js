let express = require('express');
let db = require('../models');
let router = express.Router();

router.get('/', function(req, res) {
    db.category.findAll().then (function(categories) { //pass in anonymous funct; categories is PLURAL bcs getting all
        res.render('categories/index', {categories}) //pass in categories obj
    })
});

router.get('/:id', function(req, res) {
    db.category.findOne({
        where: {id: parseInt(req.params.id)}, //req.params.id is /:id
        include: [db.project]
    }) 
    .then (function(category) { //get many projects
        res.render('categories/show', {category}) //singular bcs findOne
    })
})

module.exports = router