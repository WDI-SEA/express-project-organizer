let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", (req, res) => {
  db.category
    .findAll()
    .then((categories) => {
      res.render("categories/index", { categories: categories });
    })
    .catch((error) => {
      console.log("Error in GET /", error);
      res.status(400).render("main/404");
    });
});

// GET /categories/:id - display a specific category
router.get("/:id", async (req, res) => {
  try {
    const category = await db.category.findOne({
      where: { id: req.params.id },
    });
    if (!category) throw Error();
    const projects = await category.getProjects();
    res.render("categories/show", { category: category, projects: projects });
  } catch (error) {
    console.log(error);
    res.status(400).render("main/404");
  }
});

module.exports = router;
