let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  try {
    const [project, category] = await Promise.all([
      db.project.create({
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployedLink,
        description: req.body.description
      }),
      db.category.findOrCreate({
        where: {
          name: req.body.category
        }
      })
    ]);

    await project.addCategory(category[0]);

    res.redirect('/');
  } catch (error) {
    res.status(400).render('main/404');
  }
});

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

router.put('/:id', async (req, res) => {
  try {
    const project = await db.project.findByPk(req.params.id)

    if (!project) {
      res.status(404).render('main/404')
      return
    }

    const category = await db.category.findOrCreate({
      where: {
        name: req.body.category
      }
    })

    await project.addCategory(category)

    res.redirect(`/projects/${project.id}`)
  } catch (error) {
    console.log(error)
    res.status(400).render('main/404')
  }
})

module.exports = router
