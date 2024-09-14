const express = require("express");

const router = express.Router();

const {createPost,getAllPosts,getPostDetail,updatePost,deletePost} = require("../controllers/Post");
const { isAuthenticated, authorizeRoles} = require("../middlewares/Auth");
// ******************************* APIs *******************************

router.route("/post/create").post(createPost);

router.route("/post/all").get( getAllPosts );

router.route("/post/:id")
        .get( getPostDetail )
        .put( isAuthenticated, updatePost )
        .delete( isAuthenticated, deletePost );

// Admin Dashboard
// router.route("/post/:id")
//         .get(isAuthenticated,authorizeRoles("admin"), postDetailGet )
//         .delete( isAuthenticated,authorizeRoles("admin"), postDelete);

// -------------------------------------------------------------------------------------

module.exports = router;