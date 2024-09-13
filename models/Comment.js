const mongoose = requrie("mongoose");

const commentSchema = new mongoose.Schema({

    user : { type :  mongoose.Schema.Types.ObjectId, ref : 'User', required : [true, "Please provide the id of user"]},
    post : { type :  mongoose.Schema.Types.ObjectId, ref : 'Post', required : [true, "Please provide the id of post"]},

    comment : { type : String, required  : true , trim : true},

},{
    timestamps : true
});

module.exports  = mongoose.model("Comment", commentSchema);