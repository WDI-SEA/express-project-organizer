const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const db = require("./models");
const rowdy = require("rowdy-logger");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const cryptoJS = require("crypto-js");

const app = express();
const PORT = process.env.PORT || 3000;
rowdy.begin(app);

app.set("view engine", "ejs");
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(ejsLayouts);
app.use(cookieParser()); // gives access to req.cookies
app.use(methodOverride("_method"));

// COOKIE MIDDLEWARE
// Custom Middleware
app.use(async (req, res, next) => {
    if (req.cookies.userId) {
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptoJS.AES.decrypt(
            req.cookies.userId,
            process.env.SECRET
        );
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8);
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString);
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user;
    } else res.locals.user = null;
    next(); // move on to next middleware
});

app.get("/", (req, res) => {
    db.project
        .findAll()
        .then((projects) => {
            res.render("main/index", { projects: projects });
        })
        .catch((error) => {
            console.log("Error in GET /", error);
            res.status(400).render("main/404");
        });
});

app.use("/projects", require("./controllers/projects"));
app.use("/categories", require("./controllers/categories"));
app.use("/users", require("./controllers/users"));

app.get("*", (req, res) => {
    res.render("main/404");
});

app.listen(PORT, function () {
    rowdy.print();
    console.log(`listening on port: ${PORT}`);
});