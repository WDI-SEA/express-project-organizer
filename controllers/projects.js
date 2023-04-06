let express = require('express')
let db = require('../models')
const category = require('../models/category')
let router = express.Router()
const methodOverride = require('method-override');




// set up method override middleware
router.use(methodOverride('_method'));

// DELETE /projects/:id - delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await db.project.destroy({
      where: { id: req.params.id }
    })

    if (!deletedProject) throw Error()

    res.redirect('/')
  } catch (error) {
    res.status(400).render('main/404')
  }
})

// DELETE /categories/:id - delete a category
router.delete('/categories/:id', async (req, res) => {
  try {
    const deletedCategory = await db.category.destroy({
      where: { id: req.params.id }
    })

    if (!deletedCategory) throw Error()

    res.redirect('/projects/categories')
  } catch (error) {
    res.status(400).render('main/404')
  }
})

// POST /projects - create a new project
// POST /projects - create a new project
router.post('/', async (req, res) => {
  try {
    const createdProject = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })

    const [createdCategory] = await db.category.findOrCreate({
      where: { name: req.body.category },
    })

    await createdProject.addCategory(createdCategory)

    res.redirect('/')
  } catch (error) {
    res.status(400).render('main/404')
  }
})

router.get('/new', (req, res) => {
  res.render('projects/new')
})


router.get('/category/:id', async (req, res) => {
  try {
    console.log("/categiries/ID:"+req.params.id);

    const category = await db.category.findOne({
      where: { id: req.params.id },
      include: db.project
    })

    if (!category) {
      // return res.status(404).render('main/404')
      return;
    }

    res.render('projects/category', { category })
  } catch (error) {
    console.log(`Error in GET /category/${req.params.id}`, error)
    res.status(400).render('main/404')
  }
})

router.get('/categories', async (req, res) => {
  console.log("/categories");
  try {
    const categories = await db.category.findAll()
    res.render('projects/categories', { categories })
  } catch (error) {
    console.log('Error in GET /categories', error)
    res.status(400).render('main/404')
  }
})

// GET /projects/new - display form for creating a new project
router.get('/:id', async (req, res) => {
  console.log("/:id");
  try {
    const project = await db.project.findOne({
      where: { id: req.params.id },
      include: [{ model: db.category }] // include the category associated with this project
    })

    if (!project) throw Error()

    res.render('projects/show', { project })
  } catch (error) {
    res.status(400).render('main/404')
  }
})


router.post('/:id/category', async (req, res) => {
  try {
    const project = await db.project.findOne({
      where: { id: req.params.id }
    })

    if (!project) throw Error()

    const [category, created] = await db.category.findOrCreate({
      where: { name: req.body.category },
    })

    await project.addCategory(category)

    res.redirect(`/projects/${req.params.id}`)
  } catch (error) {
    res.status(400).render('main/404')
  }
})
/*
router.get('/categories/:id', (req, res) => {
  console.log("/categoriwa/:id");
  db.category.findAll()
  .then((projects) => {
    res.render('projects/categories', { categories: categories })
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})
*/

module.exports = router
