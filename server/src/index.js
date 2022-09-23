const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const { register,login } = require("./controllers/auth.controller");
require("dotenv").config();
const passport = require("passport");
require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.post("/register", register);
app.post("/login",login)
app.get('/protected', passport.authenticate("jwt", { session: false }), (req, res) => {
    return res.status(201).send({
        success: true,
        user: {
            user_id: req.user._id,
            username: req.user.username
        }
    })
});




const Port = 9000;

app.listen(Port, async () => {
    try {
        await connect();
        console.log(`listing ${Port}`);
    } catch (err) {
        console.log(err)
    }
})