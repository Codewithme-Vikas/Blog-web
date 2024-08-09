const mongoose = requrie("mongoose");

const commentSchema = new mongoose.Schema({

    user : { type : new mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    post : { type : new mongoose.Schema.Types.ObjectId, ref : 'Post', required : true},

    comment : { type : String, required  : true , trim : true},

},{
    timestamps : true
});

module.exports  = mongoose.model("Comment", commentSchema);