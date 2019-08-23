let express = require('express')
let router = express.Router();
let db = require('../models')


router.get('/', (req,res) => {
    db.category.findAll()
    .then(category => {
        res.render('categories/index', {category})
    })
    .catch(err => {
        console.log(err)
        res.send('ERROR! ERROR! ERROR! ERROR!' )
    })
    
})

router.get('/:id', (req,res) => {
    db.category.findOne({
        where: { id: req.params.id }, 
        include: [db.project]})
    .then(category => {
        res.render('categories/show', {category})
    })
    .catch(err => {
        console.log(err)
        res.send('ERROR! ERROR! ERROR! ERROR!' )
    })
})

module.exports = router;