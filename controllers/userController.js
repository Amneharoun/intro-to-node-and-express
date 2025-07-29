const userModel = require("../models/usersModel");
const bcrypt = require('bcrypt');

// add new user
const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
        res.status(209).send({
            message: "email existe",
        });
        return;
    }

    const hashedpassword = bcrypt.hashSync(password, 10);
    let user;

    try {
        user = await userModel.create({ name, email, password: hashedpassword });
    } catch (error) {
        res.send({
            message: error.message,
        });
        return;
    }
    res.send({
        message: " user added successfuly",
        user,
    });
};

module.exports = { register };