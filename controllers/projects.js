let express = require("express");
let db = require("../models");
let router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProject = await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description,
    });
    const categoryInputs = await req.body.category.split(", ");
    console.log(categoryInputs);
    categoryInputs.forEach(async (categoryInput) => {
      const [category] = await db.category.findOrCreate({
        where: {
          name: categoryInput,
        },
      });
      newProject.addCategory(category);
    });
    res.redirect("../");
  } catch (error) {
    res.status(400).render("main/404");
  }
});

// GET /projects/new - display form for creating a new project
router.get("/new", (req, res) => {
  res.render("projects/new");
});

// GET /projects/:id - display a specific project
router.get("/:id", (req, res) => {
  db.project
    .findOne({
      where: { id: req.params.id },
    })
    .then((project) => {
      if (!project) throw Error();
      res.render("projects/show", { project: project });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

module.exports = router;
