let express = require('express')
let db = require('../models')
let router = express.Router()

router.get("/", (req, res) => {
    db.category.findAll()
    .then((categories) => {

        res.render("categories/show", {categories})
    })
})

router.get("/:id", async (req, res) => {
    try {
    catId = req.params.id;
    // EAGER LOADING
    const categoryInfo = await db.category.findByPk(catId, {
        include: [db.project]
    })

    // LAZY LOADING
        // const categoryInfo = await db.category.findByPk(catId);
        // const projectInfo = await categoryInfo.getProjects();
    
    // console.log("cat info", categoryInfo)
    // console.log("proj info", projectInfo)
        res.render("categories/details", { categoryInfo})
} catch (error) {
        console.log(error)
    }
})

module.exports = router;
