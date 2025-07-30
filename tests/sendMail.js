const transporter = require("../utils/mailTransporter");

transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "TEST ENVOIE email",
    text: "veuillez confirmer ce mail"
})