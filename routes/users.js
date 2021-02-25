var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users.controller");
const { loginRequired } = require("../middlewares/authentication");

router.post("/", usersController.createUser);
router.put("/me", loginRequired, usersController.updateUser);
router.get("/me", loginRequired, usersController.getCurrentUser);
module.exports = router;
