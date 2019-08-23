require('dotenv').config();
const express = require('express')
const layouts = require('express-ejs-layouts')
const db = require('./models')
const rowdy = require('rowdy-logger')
const app = express()

rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.urlencoded({
  extended: false
}))
app.use(layouts)
app.use('/', express.static('public'));


app.get('/', (req, res) => {
  db.project.findAll()
    .then((projects) => {
      res.render('main/index', {
        projects: projects
      })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(404).render('main/404')
    })
})



app.use('/projects', require('./controllers/projects'))
app.use('/categories', require('./controllers/categories'))

app.get('*', (req, res) => {
  res.render('main/404')
})

let server = app.listen(process.env.PORT || 3000, function () {
  rowdy.print()
})

module.exports = server