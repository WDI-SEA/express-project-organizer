const express = require('express');
const db = require('../models');
const router = express.Router();

// GET - categories index
router.get('/', (req,res) => {
    db.category.findAll().then((categories) => {
        res.render('categories/index', {categories});
    })
})

// GET - categories/:id show
router.get('/:id', (req,res) => {
    db.category.findById(req.params.id).then( (category) => {
        category.getProjects().then( (projects) => {
            res.render('categories/show', {category, projects});
        })
    })
})


module.exports = router;