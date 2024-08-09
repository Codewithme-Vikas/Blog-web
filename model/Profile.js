const mongoose = requrie("mongoose");

const profileSchema = new mongoose.Schema({
    user : { type : new mongoose.Schema.Types.ObjectId, ref : 'User', required : true},

    dateOfBirth : { type : Date},
    bio : { type : String },
    company : { type : String },
    imageUrl : { type : String },
    

    // To Do : think more about this -[ save seprate ids or just in one object ]
    socialMedia : [{type : String}], // {twitter : "ala", website : "tuhi"}

},{
    timestamps : true
});

module.exports  = mongoose.model("Profile", profileSchema);