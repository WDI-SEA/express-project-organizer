let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })

  // // creating a new category
  // db.category.findOrCreate({
  //   name: 'node'
  // })
  //   .then(category => {
  //       db.projec
  //   })
  //   .catch (console.log)


  // // create an async/await function 
  // async function createCategory() {
  //     try{
  //         const newCategory = await db.category.create({
  //             name: 'python'
  //         })
  //         console.log(newCategory)
  //     }catch(err) {
  //         console.log(err)
  //     } 
  // }
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
  res.render('categories/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
