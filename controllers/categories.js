let express = require('express')
let db = require('../models')
let router = express.Router()

// GET list all category names

router.get('/', (req, res) => {
	db.category.findAll()
	.then((categories) => {
		res.render('categories/index', {categories: categories})
	})
	.catch((error) => {
	console.log('Error in GET /', error)
	res.status(400).render('main/404')
	})
})

// GET /categories/:id - display a specific category and associated projects
router.get('/:id', (req, res) => {
  db.category.findOne({
	where: { id: req.params.id },
	include: [db.project]
  })
  .then((category) => {
    res.render('categories/show', { category: category })
  })
  .catch((error) => {
	  console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router
