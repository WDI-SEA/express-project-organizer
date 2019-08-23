var router = require('express').Router()
var db = require('../models')


// GET /categories
router.get('/', (req, res) => {
	db.category.findAll()
	.then((categories) => {
		res.render('categories', { categories: categories })
	})
	.catch((error) => {
		console.log('Error in GET /', error)
		res.status(400).render('main/404')
	})
})


// GET /categories/:id
router.get('/:id', (req, res) => {
	db.category.findOne({
		where: { id: req.params.id },
		include: [db.project]
	})
	.then((category) => {
		// console.log(category.projects)
		res.render('categories/show', { category })
	})
	.catch((error) => {
		console.log('Error in GET /', error)
		res.status(400).render('main/404')
	})
})

module.exports = router