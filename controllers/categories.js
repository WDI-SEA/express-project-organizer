let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')


router.get('/index', (req, res) => {
    db.category.findAll()
    .then((categories) =>  {
        res.render('categories/index', {categories} )
    })
    .catch(err => {
        res.send('error', err)
    })
})

router.get('/:id', (req,res) => {
    db.category.findOne({
        where: {id: req.params.id},
        include: [db.project]
    })
    .then((category) => {
        res.render('categories/show', { category })
    })
    .catch(err => {
        res.send('error', err)
    })
})



module.exports = router
