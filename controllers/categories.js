 let express = require('express')
 let db = require('../models')
 let router = express.Router()
 let async = require('async')

 router.get('/all', (req, res) => {
 	db.category.findAll()
 	.then((categories) => {
 		res.render('categories/all', { categories })
 	})
 	.catch((err) => {
 		res.status(400).render('main/404')
 	})
 })

 router.get('/:id', (req, res) => {
 	db.category.findOne({
 		where: { id: req.params.id},
 		include: [db.project]
 	})
 	.then(data => {
 		res.render('category/one', { data })
 	})
 	.catch((error) => {
 		res.status(400).render('main/404')
 	})
 })

 module.exports = router