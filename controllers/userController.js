const userModel = require("../models/usersModel");
const transporter = require("../utils/mailTransporter");
const bcrypt = require('bcrypt');
const otpModel = require("../models/otpModel")
const generateOPT = require("../utils/generateOPT");
const { v4 } = require("uuid");

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
    const otp = generateOPT();
    const otpToken = v4();

    const otpDetails = await otpModel.create({
        userId: user._id,
        otp,
        otpToken,
        purpose: "verify-email"
    });

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verification email",
       html:`
       <h1>Verification email</h1>
       <div>
            Use the above code to verify your email:</br>
            <strong>${otp}</strong>
       </div>
       `
    })
    res.send({
        message: " user added successfuly",
        otpToken,
        user,
    });
};

module.exports = { register };