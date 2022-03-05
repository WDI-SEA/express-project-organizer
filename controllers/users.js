let express = require("express");
let db = require("../models");
let router = express.Router();
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
require("dotenv").config();

router.get("/new", (req, res) => {
    res.render("users/new.ejs");
});

router.post("/", async (req, res) => {
    const [newUser, created] = await db.user.findOrCreate({
        where: { email: req.body.email },
    });
    if (!created) {
        console.log("User already exists");
        // render the login page and send an appropriate message
    } else {
        // hash the user
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        newUser.password = hashedPassword;
        await newUser.save();

        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(
            newUser.id.toString(),
            process.env.SECRET
        );
        const encryptedUserIdString = encryptedUserId.toString();
        console.log(encryptedUserIdString);
        // store the encrypted id in the cookie of the res obj
        res.cookie("userId", encryptedUserIdString);
        // redirect back to home page
        res.redirect("/");
    }
});

router.post("/login", async (req, res) => {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (!user) {
        // didn't find user in the database
        console.log("user not found!");
        res.render("users/login.ejs", { error: "Invalid email/password" });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        // found user but password was wrong
        console.log("Incorrect Password");
        res.render("users/login.ejs", { error: "Invalid email/password" });
    } else {
        console.log("logging in the user!");
        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(
            user.id.toString(),
            process.env.SECRET
        );
        const encryptedUserIdString = encryptedUserId.toString();
        console.log(encryptedUserIdString);
        // store the encrypted id in the cookie of the res obj
        res.cookie("userId", encryptedUserIdString);
        // redirect back to home page
        res.redirect("/");
    }
});

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.get("/logout", (req, res) => {
    console.log("logging out");
    res.clearCookie("userId");
    res.redirect("/");
});

router.get('/:id', async (req, res) => {
    const foundUser = await db.user.findOne({
        where: {
            id: req.params.id
        }
    });
    const projects = await foundUser.getProjects();
    res.render("users/profile", {foundUser, projects})
})

module.exports = router;