const express = require('express')
const router = express.Router()
const db = require('../models')

router.use(express.static('public'))

// GET  /categories -- displays categories
router.get('/', (req, res) => {
    db.category.findAll({
        include: [db.project]
    })
    .then(categories => {
        res.render('categories/index', {categories})
    })
    .catch(err => {
        console.log(err)
        res.send('error')
    })
})


// GET /categories/:id -- displays all projects under 1 category
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {id: req.params.id},
        include: [db.project]
    })
    .then(category => {
        res.render('categories/show', {category})
    })
    .catch(err => {
        console.log(err)
        res.send('err')
    })
})

module.exports = router