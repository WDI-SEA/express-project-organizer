let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', function(req, res){
    db.category.findAll().then(function(categories){
        res.render('categories/index', {categories})
    })
});

router.get('/:id', function(req, res){
    db.category.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.project]
    }).then(function(category){
        res.render('categories/show', {category})
    })
})



module.exports = router
