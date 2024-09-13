const mongoose = require("mongoose");
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

    posts: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    bookMarks: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Post' }],

    favoriteCategory: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Category' }],

    followers: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'User' }], // jinko follow karte he 
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

userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id, username: this.username, role: this.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 7 * 24 * 60 * 60 * 1000 }
    )
}

userSchema.methods.resetPasswordToken = function () {
    // generate a resetpassword token
}



module.exports = mongoose.model("User", userSchema);