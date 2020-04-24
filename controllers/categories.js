let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories shows a list of all available categories
router.get('/', (req, res) => {
    db.category.findAll()
        .then(category => {
            res.render('categories/index', { category })
        })
        .catch(err => {
            console.log('error')
            res.status(400).render('main/404')
        })
})

// GET /categories/:id to show projects associated with a specific category
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {id: req.params.id}, 
        include: [db.project]
    })
    .then((cp) => {
        if (!cp) throw Error()            
        res.render('categories/show', { category: cp })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

module.exports = router