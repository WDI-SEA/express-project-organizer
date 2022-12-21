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

app.use('/projects', require('./controllers/projects'))

//lets just pretend that this is in a controller
app.get('/categories/:id', async (req, res) =>{
  try {
    const category = await db.category.findOne({
      where: {
        id: req.params.id
      },
      include: [db.project]
    })
    //way one -- get all projects associated with this category
    // const projects = await category.getProjects()
    // console.log(projects)
    // res.json(category)
    res.render('categories/details.ejs', {category})
  } catch (err) {
    console.log(err)
    res.status(400).send('error')
  }
  })

app.get('*', (req, res) => {
  res.render('main/404')
})

app.listen(PORT, function() {
  rowdy.print()
  console.log(`listening on port: ${PORT}`)
})
