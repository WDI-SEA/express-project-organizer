const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', function(req, res){
    db.category.findAll()
        .then((categories) => {
            res.render('categories/index', {categories})
        })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {
            id: parseInt(req.params.id)
        },
        include: [db.project]
    }).then(function(category){
        res.render('categories/show', {category})
    })
})

module.exports = router