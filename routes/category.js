const express = require("express");

const router = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middlewares/Auth");
const { getCategory, getCategories, createCategory, updateCategory, deleteCategory} = require("../controllers/Category");
// ******************************************* Auth APIs **********************************************

router.route("/category/all").get(getCategories);
// Caution : there(getcategories, getcategory) sequence matters a lot

router.route("/category/:id").get(getCategory);

router.route("/admin/category").post(isAuthenticated,authorizeRoles("admin"), createCategory);

router.route("/admin/category/:id")
        .put(isAuthenticated,authorizeRoles("admin"), updateCategory)
        .delete(isAuthenticated, authorizeRoles("admin"), deleteCategory);

// ----------------------------------------------------------------------------------------------------


module.exports = router;