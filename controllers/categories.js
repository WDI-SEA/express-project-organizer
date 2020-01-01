let express = require('express')
let db = require('../models')
let router = express.Router()

//GET display all categories
router.get('/cats', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        res.render('categories/cats', { categories: categories })
    })
    .catch((error) => {
        console.log('Error in GET /', error)
        // res.status(400).render('main/404')
    })
})



//GET categories/:id



module.exports = router