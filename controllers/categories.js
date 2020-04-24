let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(category => {
        res.render('categories/show', {category})
    })
    .catch(err => {
        console.log('error')
        res.status(400).render('main/404')
    })   
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then(category => {
        res.render('categories/detail', {category})
    })
    .catch(err => {
        console.log('error')
        res.status(400).render('main/404')
    })
})

module.exports = router