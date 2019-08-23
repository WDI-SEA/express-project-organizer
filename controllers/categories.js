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



module.exports = router