let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - return a page with all categories
// router.get('/', async (req, res) => {
//     try {
//         const allCategories = await db.category.findAll()
//         res.render('categories/show', { categories: categories })
//     } catch (error) {
//         console.log(error)
//     }
// })
router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories => {
        res.render('category/show', {categories:categories})
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

// router.get('/:id', async (req, res) => {
//     try {

//     } catch (error) {
//         console.log(error)
//     }
// })
// router.get('/:id'), (req, res) => {
//     db.category.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [db.project]
//     })
//     .then((category) => {
//         res.render('categories/show', {
//             category: category })
//     })
// } 

// router.get('/index', (req, res) => {
//     res.render('categories/index.ejs')
//   })

router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id }
    })
    .then((category) => {
      if (!category) throw Error()
      res.render('categories/show', { category: category })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })


module.exports = router