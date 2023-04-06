let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories -- show all the categories that exist
router.get('/', (req, res) => {
  db.category.findAll()
  .then((category) => {
    res.render('categories/index', { categories: category })
  })
  .catch((err) => {
    res.status(400).render('main/404')
  })
})


// GET /categories/:id -- show a speicifc category and all the projects with that category
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [{ model: db.project}]
    })
    .then((category) => {
        if (!category) throw Error()
        res.render('categories/show', { category: category })
    })
    .catch((err) => {
        res.status(400).render('main/404')
    })
})

module.exports = router