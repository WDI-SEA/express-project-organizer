let express = require('express')
let db = require('../models') //access database
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll({
        include: [db.project]
    })
    .then( categories => {
        res.render('categories/index', { categories })
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).render('main/404')
      })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id},
        include: [db.project]
    })
    .then(category => {
        res.render('categories/show', { category })
    })
    .catch((error) => {
        console.log('Error:', error)
        res.status(400).render('main/404')
      })
})

module.exports = router