let express = require('express')
let db = require('../models') //access database
let router = express.Router()

router.get('/', (req, res) => {
    res.send('show all the categories that exist')
})

router.get('/:id', (req, res) => {
 res.send('show a specific category and all the projects with that category')
})

module.exports = router