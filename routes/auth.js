const express = require("express");

const router = express.Router();


const { sendOTP, signup, login, forgetPassword, resetPassword, updatePassword } = require("../controllers/Auth");
const { getUserDetails, updateProfile} = require("../controllers/User");
const { isAuthenticated, authorizeRoles } = require("../middlewares/Auth");

// ************************* Auth APIs **********************

router.post("/sendOTP", sendOTP);

router.post("/signup", signup);

router.post("/login", login );


router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/user/:id").get(getUserDetails); // open to all
// router.route("/me").get(isAuthenticated, getUserDetails); // which is good ?

router.route("/me/update").put(isAuthenticated, updateProfile);

// Admin Dashboard
// router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

// router.route("/admin/user/:id")
//         .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
//         .put(isAuthenticated, authorizeRoles("admin"),updateUserRole)
//         .delete(isAuthenticated, authorizeRoles("admin"), deleteUser)

// -------------------------------------------------------------


module.exports = router;