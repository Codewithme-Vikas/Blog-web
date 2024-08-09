const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    firstName : { type : String, trim : true},
    lastName : { type : String, trim : true},
    userName : { type : String, trim : true , required : true , unique : true},

    email : { type : String, required: true},
    password : { type : String, required : true},

    role : { type : String, enum  : ['user', 'admin'], required : true},

    posts : { type : new mongoose.Schema.Types.ObjectId, ref : 'Post'},
    bookMarks : { type : new mongoose.Schema.Types.ObjectId, ref : 'Post'},

    favoriteCategory : { type : new mongoose.Schema.Types.ObjectId, ref : 'Category'},

    followers : { type : new mongoose.Schema.Types.ObjectId, ref : 'User'},
    following : { type : new mongoose.Schema.Types.ObjectId, ref : 'User'}, // jinko follow karte he 
},{
    timestamps : true
});

module.exports = mongoose.model("User", userSchema);