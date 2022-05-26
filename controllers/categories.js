let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allCat = await db.category.findAll();

    res.render("categories/index.ejs", { allCat });
  } catch (err) {
    console.warn(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await db.category.findOne({
      where: { id: req.params.id },
      include: [db.project],
    });

    console.log(category.projects);

    res.render("categories/show.ejs", {
      name: category.name,
      projects: category.projects,
    });
  } catch (err) {
    console.warn(err);
  }
});

module.exports = router;
