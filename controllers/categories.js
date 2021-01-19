let express = require('express')
let db = require('../models')
let router = express.Router()

// read all renders
router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories => {
        res.render('categories/index.ejs', { categories})
    })

})
//read all cats
router.get('/:id', (req, res) => {
 db.category.findOne ({
     where: {
         id: req.params.id
     },
     include: [db.projects]
 })
})


module.exports = router