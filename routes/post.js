const express = require("express");

const router = express.Router();

const {createPost,getAllPosts,getPostDetail,updatePost,deletePost} = require("../controllers/Post");
const { createComment, getPostAllComments, updateComment, deleteComment } = require("../controllers/Comment");
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


// ****** Comments APIS ******
router.route("post/comment/create").post(isAuthenticated,createComment);

router.route("/post/:postId/comment/all").get( getPostAllComments );

router.route("/post/comment/:id")   
        .put( isAuthenticated, updateComment )
        .delete( isAuthenticated, deleteComment );

// Admin Dashboard
router.route("/admin/post/comment/:id")
        .delete(isAuthenticated,authorizeRoles("admin"), deleteComment);
// -------------------------------------------------------------------------------------

module.exports = router;