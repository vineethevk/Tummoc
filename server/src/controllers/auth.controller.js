const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const newToken = (user) => {
    return jwt.sign({ user }, process.env.SALT)
}


const register = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }).lean().exec();
        if (user) return res.status(501).send({ message: "User already exist", success: false });
        user = await User.create(req.body);
        const token = newToken(user);
        res.status(201).send({
            success: true,
            message: "successfully registered",
            token: "Bearer " + token
        });
    } catch (err) {
        res.status(501).send(err.message);
    }
}

const login = async (req, res) => {
    try {
        // we will try to find the user with the email provided
        const user = await User.findOne({ username: req.body.username })

        // If user is not found then return error
        if (!user)
            return res
                .status(400)
                .send({
                    success: false,
                    message: "user doesn't exist,please register"
                });

        // if user is found then we will match the passwords
        const match = user.checkPassword(req.body.password);

        if (!match)
            return res
                .status(400)
                .send({
                    success: false,
                    message: "password doesn't match"
                });

        // then we will create the token for that user
        const token = newToken(user);

        // then return the user and the token
        res.status(201).send({
            success: true,
            message: "Logged in successfully",
            token: "Bearer " + token
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { register, login }