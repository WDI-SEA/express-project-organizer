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

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.category.findOne({
	where: { id: req.params.id },
	include: [db.projects]
  })
  .then((category) => {
    if (!project) throw Error()
    res.render('categories/show', { category: category })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
