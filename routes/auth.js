const express = require("express");

const router = express.Router();


// ************************* Auth APIs **********************
const { sendOTP, signup, login } = require("../controllers/Auth");

router.post("/sendOTP", sendOTP);

router.post("/signup", signup);

router.post("/login", login );



// router.get("/password/resetToken/:userId", resetPasswordToken);

// router.post("/password/reset", resetPassword);

// router.post("/password/update", isAuthenticatedUser, updatePassword);

// -------------------------------------------------------------


module.exports = router;