const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

const User = require("../models/User");
const Otp = require("../models/Otp")

const { generateOTP, allowFileType } = require("../utils/helperFun");
const sendEmail = require("../utils/sendEmail");
const otpTemplate = require("../templates/otpTemplate");


// ******************* Send OTP **********************
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Please provide Email" });
        }

        const otp = generateOTP(6);

        // send the email with OTP
        await sendEmail(email, "OTP for singup", otpTemplate(email, otp));

        await Otp.create({
            email,
            otp
        });


        return res.status(200).json({
            success: true,
            message: "OTP is sent."
        });

    } catch (error) {
        console.log("Error in sendOTP controller", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ******************* SignUp **********************
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, confirmPassword, role, otp } = req.body;

        const avatar = req.files?.avatar;
        

        if (!username || !email || !password || !confirmPassword || !role ) {
            return res.status(400).json({ success: false, message: "Please Provide all required fields value." });
        }

        // is passwords matched
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords are not matched." });
        }

        // is user already exists
        const isUserExists = await User.findOne({ username });

        if (isUserExists) {
            return res.status(400).json({ success: false, message: "User already exists with this name." });
        }

        // verify the otp and email
        const isValid = await Otp.findOne({ otp, email });

        if (!isValid) {
            return res.status(400).json({ success: false, message: "OTP are not correct." });
        }

        // Handle avatar
        let avatarCloud = {};
        if (avatar) {
            
            // Good To Do : Check there is only one file in avatar , it is not a array of files -> (avatar is not a array)
            
            // is avatar file type supported?
            if (!allowFileType(avatar.mimetype, ['image/png', 'image/jpg', 'image/jpeg'])) {
                return res.status(400).json({ success: false, message: "Only png,jpg and jpeg files are supported" });
            }
            
            // upload avatar to the cloudinary
            avatarCloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
                folder: "blog_post_web_app/avatars",
                width: 150,
                crop: "scale",
            });
        }
        // This will be frontend job -> Handle on frontend side, 
        // else{
        //     // just show the first letter of username instead of avatar
        //     avatarCloud.public_id  = `https://ui-avatars.com/api/?name=${username}`;
        //     avatarCloud.secure_url = `https://ui-avatars.com/api/?name=${username}`;
        // }


        // hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        
        // save entry into the DB
        const userDoc = await User.create({
            firstName,
            lastName,
            username,
            avatar : {
                public_id : avatarCloud.public_id,
                url : avatarCloud.secure_url
            },
            email,
            password : hashPassword,
            role,
        });

        userDoc.password = undefined; // For security purpose

        // send token
        const token = userDoc.getJWTToken();

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        return res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Account created successfully",
            user: userDoc,
        });

    } catch (error) {
        console.log("Error in sign up controller", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// ******************* Login **********************
exports.login = async (req, res) => {
    try {
        const { username, enteredPassword } = req.body;

        if (!username || !enteredPassword) {
            return res.status(400).json({ success: false, message: "Please provide all required fileds" });
        }

        // Good To Do : not expose the problem during login

        // is user exits
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(400).json({ success: false, message: "User is not exists" });
        }

        // comapre enteredPassword
        const isAuthentic = userDoc.comparePassword(enteredPassword);

        if (!isAuthentic) {
            return res.status(400).json({ success: false, message: "Password is not matched" });
        }

        // send token
        const token = userDoc.getJWTToken();

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }


        userDoc.password = undefined; // for security reasons

        return res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login successfully!",
            user: userDoc,
        });


    } catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}