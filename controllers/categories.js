var express = require('express')
var db = require('../models')
var router = express.Router()


// GET /categories
router.get('/', (req, res) => {
	db.category.findAll()
	.then(function(categories) {
		res.render('categories', { categories: categories })
	})
	.catch(function(error) {
		console.log('Error in GET /', error)
		res.status(400).render('main/404')
	})
})


// GET /categories/:id
router.get('/:id', function(req, res) {
	db.project.findAll({
	    include: [{
	        model: db.category, 
	        attributes: ['id', 'name'], 
	    }, {
	    	model: db.categoriesProjects,
	    	attributes: ['categoryId', 'projectId']
	    }], 
	})
	.then((projects) => {
		// let proj = project[req.params.id]
		console.log(projects)
		res.send('categories/show')
	})
	.catch(function(error) {
		console.log('Error in GET /', error)
		res.status(400).render('main/404')
	})
})





module.exports = router
