const express = require("express");
const verifySignUp = require("../middleware/verifySignUp");
const UserCtrl = require("../controllers/user-ctrl");

const router = express.Router();

router.post("/Users/create", verifySignUp, UserCtrl.createUser);
router.post("/Users/signIn", UserCtrl.signIn);
router.put("/Users/:id", UserCtrl.updateUser);
router.delete("/Users/:id", UserCtrl.deleteUser);
router.get("/Users/:id", UserCtrl.getUserById);
router.get("/Users", UserCtrl.getUsers);
router.get("/Users/auth/confirm/:confirmationCode", UserCtrl.verifyUser);

module.exports = router;
