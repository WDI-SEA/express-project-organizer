let express = require('express')
let db = require('../models')
let router = express.Router()


router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        console.log(categories)
      res.render('categories/main', { categories: categories })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })


// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { category: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('categories/show', { 
        project: project,
        category: req.params.id
     })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
