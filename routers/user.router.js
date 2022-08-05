const router = require("express").Router();
const UserController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", [authMiddleware], UserController.getUsers);
router.post("/", UserController.createUser);

module.exports = router;
