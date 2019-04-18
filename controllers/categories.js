let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
  db.category.findAll()
  .then(cats => {
    res.send(cats)
  })
  .catch(err => {
    res.send(err)
  })
})

module.exports = router
