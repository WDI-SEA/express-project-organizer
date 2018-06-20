const express = require('express');
const db = require('../models');
const router = express.Router();

// GET - categories index
router.get('/', (req,res) => {
    db.category.findAll().then((categories) => {
        res.render('categories/index', {categories});
    })
})


module.exports = router;