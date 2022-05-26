let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /projects - create a new project
// (╯°□°）╯︵ ┻━┻
router.post("/", async (req, res) => {
  try {
    const [project, projectCreated] = await db.project.findOrCreate({
      where: {
        name: req.body.name,
      },
      defaults: {
        githubLink: req.body.githubLink,
        deployedLink: req.body.deployedLink,
        description: req.body.description,
      },
    });

    const [category, categoryCreated] = await db.category.findOrCreate({
      where: {
        name: req.body.category.toLowerCase(),
      },
    });
    // console.log(req.body.category);
    project.addCategory(category);

    res.redirect("/");
  } catch (err) {
    console.warn(err);
  }
});

// GET /projects/new - display form for creating a new project
router.get("/new", (req, res) => {
  res.render("projects/new");
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await db.project.findOne({
      where: {
        id: req.params.id,
      },
    });

    await project.destroy();
    res.redirect("/");
  } catch (err) {
    console.warn(err);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const project = await db.project.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.category],
    });

    const { id, name, githubLink, deployedLink, description } = project;

    res.render("projects/edit.ejs", {
      id,
      name,
      githubLink,
      deployedLink,
      description,
      category: project.categories[0].name,
    });
  } catch (err) {
    console.warn(err);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const project = await db.project.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.category],
    });

    const { id } = project;

    await project.set({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description,
    });

    // console.log(project);

    await project.save();

    res.redirect(`/projects/${id}`);
  } catch (err) {
    console.warn(err);
  }
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
