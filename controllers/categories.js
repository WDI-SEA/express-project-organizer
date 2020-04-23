let router = require('express').Router();
let db = require('../models')

router.get('/', (req,res) => {
    db.category.findAll()
    .then(category => {
        res.render('categories/index', {category})
    })
    .catch(err => {
        console.log(err)
        res.send('whoops')
    })

})

router.get('/:id', (req,res) => {
    db.category.findByPk(req.params.id, {include: [db.project]})
    .then(category => {
        res.render('categories/show', {category})
    })
    .catch(err => {
        console.log(err)
        res.send('Whoops')
    })
})


module.exports = router;