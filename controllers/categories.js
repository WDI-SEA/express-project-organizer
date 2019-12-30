let express = require('express')
let db = require('../models')
let router = express.Router() 

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        res.render('categories/index', { categories })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then((category) => {
        if (!category) throw Error()
        res.render('categories/show', { category })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

module.exports = router

// router.post('/categories', (req, res) => {
//         db.category.findOrCreate({ 
//             where: {
//                 category: req.body.category
//             },
//             defaults: {
//                 name: req.body.name,
//                 githubLink: req.body.githubLink,
//                 deployLink: req.body.deployedLink,
//                 description: req.body.description
//             }
//         })
//         .then(([category, created]) => {
//             if (created) {
//                 console.log(`${category} was ${created}`)
//                 res.render('categories/index', { category })
//             } else {
//                 console.log('ERROR! CATEGORY NOT CREATED')
//             }
//         })
//         .catch((error) => {
//             res.status(400).render('main/404')
//         })
//     })