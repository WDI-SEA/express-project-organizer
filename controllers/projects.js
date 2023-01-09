let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
// router.post('/', (req, res) => {
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployLink: req.body.deployedLink,
//     description: req.body.description
//   })
//   .then((project) => {
//     async.forEach(categories, (c, done) => {
//       db.category.findOrCreate({
//         where: { name: c.trim() }
//       })
//       .then(([category, wasCreated]) => {
//         project.addCategory(category)
//         .then(() => {
//           done()
//         })
//         .catch(done)
//       })
//       .catch(done)
//     }, () => {
//       // Final function; runs once when everything is done
//       res.redirect('/')
//     })
//   })
//   .catch((error) => {
//     res.status(400).render('main/404')
//   })
// })

router.post('/', async (req, res) => {
  try {
    const project = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })
    // find or create a category
    const [category] = await db.category.findOrCreate({
      where: {
        name: req.body.category
      },
      // no defualts needed 
      // defualts:
    })
    // associate the project with the category
    await category.addProject(project)
    // await project.addCategory(category)
    res.redirect('/')
  } catch(err) {
    console.log(err)
    res.status(400).render('main/404')
  }
})


// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
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
