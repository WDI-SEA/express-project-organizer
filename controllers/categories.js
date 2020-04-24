let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')


router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
      })
    .then((category) => {
        console.log(category.projects)
        if (!category) throw Error()
        res.render('categories/show', { category })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
})



module.exports = router