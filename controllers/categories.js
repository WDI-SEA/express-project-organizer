let express = require('express')
let db = require('../models')
let router = express.Router()

router.get("/", async function(req,res){
    try {
        const categories = await db.category.findAll()
        console.log(categories)
        res.render("categories/show.ejs", {categories})
    } catch(err) {
        console.warn(err)
    }

})

router.get("/:id", async function(req,res){
    try {
        const category = await db.category.findOne({
            where: {id: req.params.id},
            include: [db.project]
        })
        console.log(category)
        res.render("categories/associatedProjects.ejs", {category})
    } catch(err) {
        console.warn(err)
    }
})

module.exports = router