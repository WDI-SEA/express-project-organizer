const { reduce } = require('async')
let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll().then(categories => {
        res.render('categories.ejs', {categories:categories})
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
        res.render()
    })
}