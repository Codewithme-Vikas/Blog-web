const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    title  : { type : String, required : [true, "Please give the title to category"], trim : true, unique : true},

    description : { type : String, required : true},

    //  Think : add posts field 

},{
    timestamps : true
});

module.exports  = mongoose.model("Category", categorySchema);