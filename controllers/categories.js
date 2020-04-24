let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(category => {
        res.render('categories/show', {category})
    })
    .catch(err => {
        console.log("category error: ", err)
        res.send(err)
    })    
})

router.get('/details/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then(category => {
        res.render('categories/detail', {category})
    })
    .catch(err => {
        console.log("category error: ", err)
        res.send(err)
    })    
})

module.exports = router