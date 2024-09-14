const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : [true , "Please provide the user id of owner user"]},

    dateOfBirth : { type : Date},
    bio : { type : String },
    company : { type : String },
        
    
    // To Do : think more about this -[ save seprate ids or just in one object ]
    socialMedia : [{type : String}], // {twitter : "ala", website : "tuhi"}

},{
    timestamps : true
});

module.exports  = mongoose.model("Profile", profileSchema);