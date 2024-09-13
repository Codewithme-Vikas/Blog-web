const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({

    otp : { type : String, required : [ true, "Please provide OTP"]},

    email : { type : String , reqiured : true, trim : true},

    // expire/destroy this document after 5 minutes
    expiresAt : { type : Date, default : Date.now(), expires : 5*60*1000 },
});

module.exports = mongoose.model("Otp", otpSchema);