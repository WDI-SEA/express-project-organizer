let express = require('express')
let db = require('../models')
let router = express.Router()

//GET - categories
router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
        res.render('category/index', { category })
    })
    .catch(err =>{
        console.log('THERE IS AN ERRROR HERE', error)
        res.status(400).render('main/404')
    })
})

//GET /categories/:id to display projects 
router.get('/:id', (req, res) => {
   res.render('category/show', { category })
   
})

module.exports = router