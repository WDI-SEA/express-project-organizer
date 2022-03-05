const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await db.category.findAll();
        res.render("categories/index", { categories });
    } catch (error) {
        console.log(error);
        res.status(400).render("main/404");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await db.category.findOne({
            where: {
                id: req.params.id,
            },
            include: [db.project],
        });
        res.render("categories/show", { category });
    } catch (error) {
        console.log(error);
        res.status(400).render("main/404");
    }
});

router.delete("/:id", async (req,res ) => {
    try {
      const foundCategory = await db.category.findOne({
        where: { id: req.params.id },
      });
      await foundCategory.destroy();
      res.redirect("/categories");
    } catch (err) {
      console.log(err);
    }
  })
  
module.exports = router;