const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// ****************************** Create Comment ************************************
exports.createComment = async(req,res)=>{
    try {
        const user  = req.user;
        const { postId, comment } = req.body;

        if( !postId || !comment ){
            return res.status(400).json({success : true, message : "Please provide all required fields"});
        }

        // is post exists
        const isPostExists = await Post.findById(postId);

        if( !isPostExists ){
            return res.status(400).json({success : true, message : "Post not found"});
        }

        // save comment & push comment's id into post's comments
        const commentDoc = await Comment.create({
            user : user.id,
            post : postId,
            comment : comment
        });

        await Post.findByIdAndUpdate(postId,{
            $push : { comments : commentDoc._id }
        });


        return res.status(200).json({
            success : true,
            message : "Comment created successfully",
            comment : commentDoc
        });

    } catch (error) {
        console.log("API Error.................! in create comment controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't create comment",
            error : error.message
        });
    }
}


// ****************************** Get Post's Comments ************************************
exports.getPostAllComments = async(req,res)=>{
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId).populate({
            path : "user", select : "username fullname email"
        });

        if( !post ){
            return res.status(400).json({success : true, message : "Post not found"});
        }

        return res.status(200).json({
            success : true,
            message : "Fetched post's comments successfully",
            postComments : post.comments
        });
        
    } catch (error) {
        console.log("API Error.................! in get Post All Comments controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't fetched post's comments",
            error : error.message
        });
    }
}


// ****************************** Update Comment ************************************
exports.updateComment = async(req,res)=>{
    try {
        const user = req.user;
        const { id } = req.params; // comment Id
        const { comment } = req.body;
        
        // is comment exists
        const isCommentExists = await Comment.findById(id);

        if( !isCommentExists ){
            return res.status(400).json({success : true, message : "Comment not found"});
        }

        // is user authentic writer
        if( mongoose.Types.ObjectId(user.id) !== isCommentExists.user ){
            return res.status(400).json({success : true, message : "User is not authentic writer"});
        }

        // update comment
        const updatedComment = await Comment.findByIdAndUpdate(id,{
            $set : {
                comment : comment
            }
        });

        return res.status(200).json({
            success : true,
            message : "Comment updated successfully",
            updatedComment
        });

    } catch (error) {
        console.log("API Error.................! in update comment controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't update comment",
            error : error.message
        });
    }
}



// ****************************** Delete Comment ************************************
exports.deleteComment = async(req,res)=>{
    try {
        const user = req.user;
        const { id } = req.params; // comment Id
        
        const comment = await Comment.findOneAndDelete({_id : id,user : user.id});

        if( !comment ){
            return res.status(400).json({success : true, message : "Comment not found"});
        }

        // remove comment'id from post
        await Post.findOneAndUpdate( {comments : comment._id},{
            $pull : { comments : comment._id }
        });

        return res.status(200).json({
            success : true,
            message : "Comment deleted successfully",
            comment
        });
    } catch (error) {
        console.log("API Error.................! in delete comment controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't delete comment",
            error : error.message
        });
    }
}