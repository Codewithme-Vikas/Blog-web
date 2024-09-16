const Post = require("../models/Post");
const User = require("../models/User");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const sendEmail = require("../utils/sendEmail");

const postCreatedTemplate = require("../templates/post/postCreatedTemplate");
const postDeleteTemplate = require("../templates/post/postDeleteTemplate");


// ********************* Create Post ******************************
exports.createPost = async(req,res)=>{
    try {
        const user = req.user;
        const {title, description, content } = req.body;


        if( !title || !description || !content ){
            return res.status(400).json({success : false, message : "Please provide all required fields"});
        }

        // Future to do:- save the thumbnail on the cloud

        // save the post
        const post = await Post.create({
            user : user.id,
            title,
            description,
            content
        });

        // save postId into user(writter) & category
        await User.findByIdAndUpdate(user.id,{
            $push : { posts : post._id}
        });


        // send email to writer
        await sendEmail(user.email,"New post created", postCreatedTemplate(post.title,post.createdAt) );

        
        return res.status(200).json({
            success : true,
            message : "Post created successfully",
            post
        });

    } catch (error) {
        console.log("API Error..............! in create post controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't create post",
            error : error.message
        });
    }
}


// ********************* Get Post Detail ******************************
exports.getPostDetail = async(req,res)=>{
    try {
        const { id } = req.params;

        if( !id ){
            return res.status(400).json({success : false, message : "Please provide postId"});
        }

        const post  = await Post.findById(id);

        if( !post ){
            return res.status(400).json({success : false, message : "post not found"});
        }

        return res.status(200).json({
            success : true,
            message : "Fetched post data successfully",
            post
        });

    } catch (error) {
        console.log("API Error..............! in get post detail controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't get post detail",
            error : error.message
        });
    }
}


// ********************* Get All Posts ******************************
exports.getAllPosts = async(req,res)=>{
    try {
        
        const posts  = await Post.find();

        if( !posts ){
            return res.status(400).json({success : false, message : "posts not found"});
        }

        return res.status(200).json({
            success : true,
            message : "Fetched posts successfully",
            posts
        });

    } catch (error) {
        console.log("API Error..............! in get all posts controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't fetched all posts",
            error : error.message
        });
    }
}


// ********************* Update Post ******************************
exports.updatePost = async(req,res)=>{
    try {
        const user = req.user;
        const { id } = req.params; // post id
        const {title, description, content } = req.body;


        if( !title || !description || !content ){
            return res.status(400).json({success : false, message : "Please provide all required fields"});
        }

        // is post exists
        const post = await Post.findById(id);

        if( !post ){
            return res.status(400).json({success : false, message : "Post not found!"});
        }

        // is user authentic writer
        if( mongoose.Types.ObjectId(user.id) !== post.user ){
            return res.status(400).json({success : false, message : "User is not authentic writer!"});
        }

        // Future to do:- save the thumbnail on the cloud & destroy previous ones

        
        

        // update the post
        const updatePost = await Post.findByIdAndUpdate(id,{
            $set : {
                title,
                description,
                content
            }
        }, { new : true });

        
        return res.status(200).json({
            success : true,
            message : "Create post successfully",
            post : updatePost
        });

    } catch (error) {
        console.log("API Error..............! in update post controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't update post",
            error : error.message
        });
    }
}


// ********************* Delete Post ******************************
exports.deletePost = async(req,res)=>{
    try {
        const user = req.user;
        const { id } = req.params; // post id

        // is post exists
        const post = await Post.findById(id);

        if( !post ){
            return res.status(400).json({success : false, message : "Post not found!"});
        }

        // is user authentic writer
        if( mongoose.Types.ObjectId(user.id) !== post.user ){
            return res.status(400).json({success : false, message : "User is not authentic writer"});
        }


        // delete post & remove from user's posts
        await Post.findByIdAndDelete(id);

        await User.findByIdAndUpdate(user.id,{
            $pull : { posts : post._id }
        });

        // Future to do:- destroy the thumbnail on the cloud
        
        await sendEmail(user.email,"Post delete", postDeleteTemplate(post.title,post.createdAt) );
        
        return res.status(200).json({
            success : true,
            message : "Post delete successfully",
            post : updatePost
        });

    } catch (error) {
        console.log("API Error..............! in delete post controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't delete post",
            error : error.message
        });
    }
}


// ****************************** upVote Post ************************************
exports.upVotePost = async (req, res) => {
    try {
        const { id } = req.params; // post Id

        // Future : a user only can upVote post by single time(by 1) <-- for now this burden(implemention) is taken by frontend side

        // increase upVote by 1
        const post = await Post.findByIdAndUpdate(id, {
            $inc: { upVote: 1 }
        }, { new: true });

        if (!post) {
            return res.status(400).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Post upVoted successfully",
            upVote: post.upVote
        });

    } catch (error) {
        console.log("API Error.................! in upVote post controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't upVote post",
            error: error.message
        });
    }
}

// ****************************** downVote Post ************************************
exports.downVotePost =  async (req, res) => {
    try {
        const { id } = req.params; // post Id

        // Future : a user only can upVote post by single time(by 1) <-- for now this burden(implemention) is taken by frontend side

        // decrease upVote by 1
        const post = await Post.findByIdAndUpdate(id, {
            $inc: { upVote: -1 }
        }, { new: true });

        if (!post) {
            return res.status(400).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Post downVoted successfully",
            upVote: post.upVote
        });

    } catch (error) {
        console.log("API Error.................! in downVote post controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't downVote post",
            error: error.message
        });
    }
}




// ^^^^^^@^^^^^^^^^^^^^^^@^^^^^^^^^^^^^^^^ Admin Panel ^^^^^^@^^^^^^^^^^^^^^^@^^^^^^^^^^^^^^^^

// ****************************** Delete Post By Admin************************************
exports.adminDeletePost = async (req, res) => {
    try {
        const { id } = req.params; // post Id

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(400).json({ success: true, message: "Post not found" });
        }

        // delete post's comment
        await Comment.deleteMany({post : post._id}).exec();


        return res.status(200).json({
            success: true,
            message: "Post deleted successfully by admin",
            post
        });
        
    } catch (error) {
        console.log("API Error.................! in admin delete post controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't delete post",
            error: error.message
        });
    }
}