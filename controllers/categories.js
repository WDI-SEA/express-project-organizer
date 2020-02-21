const express = require('express');
const router = express();
const db = require('../models')

router.get('/', (req, res) => {
    db.category.findAll()
    .then(function(categories){
        res.render('categories', {
            categories: categories
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/:id', (req, res) => {

        db.category.findByPk(req.params.id, {
            include: [db.project]
        })
          .then((category) => {
            res.render('categories/show.ejs', {category})
          })
    })

module.exports = router;