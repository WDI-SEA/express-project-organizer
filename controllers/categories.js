let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
        res.render('/categories', { category: category })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})


router.get('/categories/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id }
    })
    .then((category) => {
        if (!category) throw Error()
        res.render('categories/:id', { category: category })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

module.exports = router