const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    user : { type :  mongoose.Schema.Types.ObjectId, ref : 'User', required : [true, "Please provide the id of user"]},
    post : { type :  mongoose.Schema.Types.ObjectId, ref : 'Post', required : [true, "Please provide the id of post"]},

    comment : { type : String, required  : [true, "Write some content"] , trim : true},

    upVote : { type : Number, default : 0},

},{
    timestamps : true
});

module.exports  = mongoose.model("Comment", commentSchema);