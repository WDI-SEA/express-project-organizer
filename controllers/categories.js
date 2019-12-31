let express = require('express')
let db = require('../models')
let router = express.Router() 

router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
        res.render('categories/index', { categories: category })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then((category) => {
        if (!category) throw Error()
        res.render('categories/show', { category })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

router.delete('/:id', (req, res) => {
    console.log('remove category')
    db.category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((category) => {
        res.redirect('categories/index')
    })
    .catch(err => {
        res.render('404') 
    })
})

module.exports = router

