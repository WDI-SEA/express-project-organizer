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

app.get('*', (req, res) => {
  res.render('main/404')
})

app.get('/categories/:id', async function (req, res) {
  try {
    const category = await db.category.findOne({
      where: {
        id: req.params.id
      },
      include: [db.project]
    })
    res.render('categories/detail.ejs', { category: category })
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, function () {
  rowdy.print()
  console.log(`listening on port: ${PORT}`)
})
