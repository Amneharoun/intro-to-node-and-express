const userModel = require("../models/usersModel");
const transporter = require("../utils/mailTransporter");
const bcrypt = require('bcrypt');
const otpModel = require("../models/otpModel")
const generateOTP = require("../utils/generateOTP");
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
    const otp = generateOTP();
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
        html: `
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

const verify = async (req, res) => {
    const { otp, otpToken, purpose } = req.body;

    if (purpose != "verify-email") {
        res.status(422).send({
            message: "purpose invalid"
        });
        return;
    }

    const otpDetails = await otpModel.findOne({
        otpToken, purpose
    });
    // console.log(otpDetails);

    if (otp != otpDetails.otp) {
        res.status(406).send({
            message: "otp invalid"
        });
        return;
    }
    const verifiedUser = await userModel.findByIdAndUpdate(
        otpDetails.userId,
        { isVerified: true },
        { new: true }
    );

    res.send({
        message: "user successfuly verified",
        verifiedUser,
    })
}


module.exports = { register, verify };