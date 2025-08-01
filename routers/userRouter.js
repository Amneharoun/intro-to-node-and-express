const express = require("express");
const {register, verify,login} = require("../controllers/userController");
const router = express.Router();

// create un router qui permet d'ajouter un user
router.post("/", register);
router.post("/login", login);
router.patch("/verify-email", verify);

module.exports = router;