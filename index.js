const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const db = require('./models')
const rowdy = require('rowdy-logger')

const app = express()
const PORT = process.env.PORT || 3000
rowdy.begin(app)

// MIDDLEWARES
app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use("/public", express.static("public"))
app.use(ejsLayouts)

// HOME ROUTE -- FIND & LISTS ALL PROJECTS
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

// CONTROLLERS
// projects
app.use('/projects', require('./controllers/projects'))

// ERROR page
app.get('*', (req, res) => {
  res.render('main/404')
})

// PORT
app.listen(PORT, function() {
  rowdy.print()
  console.log(`listening on port: ${PORT}`)
})
