const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', async (req, res)=>{
    try {

        res.render('./categories/index.ejs')
    } catch (err) {
        console.log('error', err)
    }
})

module.exports = router