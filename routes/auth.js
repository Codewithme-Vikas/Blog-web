const express = require("express");

const router = express.Router();


const { sendOTP, signup, login, forgetPassword, resetPassword, updatePassword } = require("../controllers/Auth");
const { isAuthenticated } = require("../middlewares/Auth");

// ************************* Auth APIs **********************

router.post("/sendOTP", sendOTP);

router.post("/signup", signup);

router.post("/login", login );


router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticated, updatePassword);

// -------------------------------------------------------------


module.exports = router;