const { reduce } = require('async')
let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll().then(categories => {
        res.render('categories/categories.ejs', {categories})
    })
    .catch(error => {
        res.status(400).render('main/404')
    })
})

router.get('/:idx'), (req, res) => {
    db.category.findOne({
        where: {
            id: req.params.id
        },
        include: [db.project]
    })
    .then(category => {
        res.render('categories/show.ejs', {categories})
    })
    .catch(error => {
        res.status(400).render('main/404')
    })
}

router.post()