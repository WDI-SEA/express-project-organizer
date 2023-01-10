const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const db = require('./models')
const rowdy = require('rowdy-logger')

const app = express()
const PORT = process.env.PORT || 3000
rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)


app.get('/', (req, res) => {
  db.project.findAll()
  .then((projects) => {
    res.render('main/index', { projects: projects })
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})

// GET /categories
app.get('/projects/categories', (req, res) => {
  db.category.findAll()
  .then((categories) => {
    res.render('/projects/categories', { categories: categories })
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})


// app.get ('/categories/categories', async (req, res) => {
//   //res.send('Testing Route')
//   try {
//   const allCategories = await db.project_organizer_development.findAll()
//     // include: [db.categories]
//     res.send(allCategories)
// } catch (err) {
//   console.log(err)
//   res.status(500)({
//       message: 'Server Error 💀'
//   })
// }
// })
app.get('/categories/:id', async (req, res) => {
  try {
const category = await db.category.findOne({
  where: {
    id: req.params.id
  },
  //imbed association projects in this category
  include: [db.projects]
})
// first way
  //const projects = await category.getProjects()
  // console.log(projects)
  //res.json(category)
  res.render(('categories/show.ejs', {category}))
  } catch (err) {
  console.log(ERROR)
  res.status(400).send('error')
  }
})

app.use('/projects', require('./controllers/projects'))

app.get('*', (req, res) => {
  res.render('main/404')
})

app.listen(PORT, function() {
  rowdy.print()
  console.log(`listening on port: ${PORT}`)
})
