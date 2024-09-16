const mongoose = require("mongoose");
const crypto = require("node:crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sendEmail = require("../utils/sendEmail");
const greetTemplate  = require("../templates/greetingTemplate");

const userSchema = new mongoose.Schema({

    // Think : Remove firstName and lastName 
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    username: { type: String, trim: true, required: [true, "Please provide username"], unique: true },

    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },

    email: { type: String, required: [true, "Please provide email"] },
    password: { type: String, required: [true, "Please provide password"] },

    role: { type: String, enum: ['user', 'admin'], required: [true, "Please provide role of user"] },

    profile : { type : mongoose.Schema.Types.ObjectId, ref : 'Profile'},

    posts: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    bookMarks: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Post' }],

    favoriteCategory: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Category' }],

    followers: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'User' }], // jinko follow karte he 


    // for reset password purpose
    resetPasswordToken : String,
    resetPasswordExpire : Date,
}, {
    timestamps: true
});


// greet user as account create successfully
userSchema.post("save", async function (doc, next) {
    // send greeting by email
    await sendEmail(doc.email, "Welcome to Ikash Dev.", greetTemplate(doc.username));

    next();
});



userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// genrate a jsonwebtoken
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id, username: this.username, role: this.role, email : this.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 7 * 24 * 60 * 60 * 1000 }
    )
}

// generate a Reset Password Token
userSchema.methods.getResetPassword = function () {
    const resetToken = crypto.randomBytes(32).toString('hex'); // 32 bytes buffer & Convert to hex format for a URL-friendly token

    // Hash the token using SHA-256 before storing it in the database
    
    // Note - those changes aren't automatically persisted to the database until you explicitly save the document.
    this.resetPasswordToken =  crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 24*60*60*1000; // 1 day

    return resetToken; // send the un-hashed token 
}

module.exports = mongoose.model("User", userSchema);