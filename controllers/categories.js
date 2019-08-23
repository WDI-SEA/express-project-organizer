let express = require('express')
let db = require('../models')
let router = express.Router()



router.post('/new', (req, res) => {
    db.project.findByPk(req.body.projectId)
        .then((project) => {
            db.category.findOrCreate({
                where: { name: req.body.name }
            }).spread((category, created) => {
                project.addCategory(category).then((category) => {
                    res.redirect(`/projects/${project.id}`);
                })    ///article.add<model name>
            })
        })
})

router.get('/:id', (req ,res) => {
    db.category.findByPk(req.params.id, {
        include: [db.project]
    })
    .then((category) => {
        res.render('categories/show', {category});
    })
})

// router.get('/', (req ,res) => {
//     db.category.findAll({include: [db.project]})
//     .then((category) => {
//         res.redirect('show', {category});
//     })
// })

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories: categories })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })


module.exports = router