const express = require("express");
const {register, verify} = require("../controllers/userController");
const router = express.Router();

// create un router aui permet d'ajouter un user
router.post("/", register);
router.post("/verify-email", verify);

module.exports = router;