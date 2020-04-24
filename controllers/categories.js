let express = require('express')
let db = require('../models')
let router = express.Router()

//GET - categories
router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
        res.render('category/index', { category })
    })
    .catch(err => {
        res.render('main/404', err)
    })
})

router.get('/:x', (req, res) => {
    db.category.findOne({
        where: { id: req.params.x },
        include: [db.project]
    })
    .then((cp) => {
        // console.log('cp-----', cp)
        // console.log('cp.projects-------->', cp.projects)
        // if (!category) throw Error()
        res.render('category/show', {category: cp})
        console.log('category.projects--------', category.projects)
    })
    .catch(err => {
        res.status(400).render('main/404')
    })
})




module.exports = router


