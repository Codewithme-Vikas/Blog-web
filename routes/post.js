const express = require("express");

const router = express.Router();

const { createPost, getAllPosts, getPostDetail, updatePost, deletePost, upVotePost, downVotePost,adminDeletePost } = require("../controllers/Post");
const { createComment, getPostAllComments, updateComment, deleteComment, upVoteComment,downVoteComment, adminDeleteComment } = require("../controllers/Comment");
const { isAuthenticated, authorizeRoles } = require("../middlewares/Auth");

// ******************************* Post APIs *******************************

router.route("/post/create").post(createPost);

router.route("/post/all").get(getAllPosts);

router.route("/post/:id")
    .get(getPostDetail)
    .put(isAuthenticated, updatePost)
    .delete(isAuthenticated, deletePost);

router.route("/post/:id/upvote").get(isAuthenticated,upVotePost);

router.route("/post/:id/downvote").get(isAuthenticated,downVotePost);

// ^^^^^^^^^^^ Admin Dashboard ^^^^^^^^^^^
router.route("/post/:id")
        // .get(isAuthenticated,authorizeRoles("admin"), postDetailGet )
        .delete( isAuthenticated,authorizeRoles("admin"), adminDeletePost)

// --------------------------------------------------------------------------------------------


// *************************** Comments APIS ***************************
router.route("post/comment/create").post(isAuthenticated, createComment);

router.route("/post/:postId/comment/all").get(getPostAllComments);

router.route("/post/comment/:id")
    .put(isAuthenticated, updateComment)
    .delete(isAuthenticated, deleteComment);


router.route("/post/comment/:id/upvote").get(upVoteComment);
router.route("/post/comment/:id/downvote").get(downVoteComment);


// ^^^^^^^^^^ Admin Dashboard ^^^^^^^^^^^^
router.route("/admin/post/comment/:id")
    .delete(isAuthenticated, authorizeRoles("admin"), adminDeleteComment);


// -------------------------------------------------------------------------------------

module.exports = router;