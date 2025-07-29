const express = require("express");
const {register} = require("../controllers/userController");
const router = express.Router();

// create un router aui permet d'ajouter un user
router.post("/", register);
module.exports = router;