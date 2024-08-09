const mongoose = requrie("mongoose");

const postSchema = new mongoose.Schema({

    user : { type : new mongoose.Schema.Types.ObjectId, ref : 'User', required : true},

    title : { type : String, required  : true , trim : true},
    // Think : should be description here or remove it
    description : { type : String, required  : true , trim : true},
    content : { type : String, required  : true , trim : true},

    upVote : { type : String, default : 0}, // likeCount

    comments : { type : new mongoose.Schema.Types.ObjectId, ref : 'Comment'},

},{
    timestamps : true
});

module.exports  = mongoose.model("Post", postSchema);