const cloudinary = require("cloudinary");

const Profile = require("../models/Profile");
const User = require("../models/User");

// ********************* Get User Details ******************************
// Think : improve this controller ( change the flow/behaviour of this api)
exports.getUserDetails = async(req,res)=>{
    try {
        const { id } = req.params;

        if( !id ){
            return res.status(400).json({success : false, message : "Please provide userId"});
        }

        const user  = await User.findById(id);

        if( !user ){
            return res.status(400).json({success : false, message : "User not found"});
        }

        return res.status(200).json({
            success : true,
            message : "Fetched user data successfully",
            user
        });

    } catch (error) {
        console.log("API Error..............! in get user details controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't fetched user detail",
            error : error.message
        });
    }
}

// **************************** Update Profile *******************************
exports.updateProfile = async(req,res)=>{
    try {
        const { user } = req.user;
        const { dateOfBirth , bio, company } = req.body;
        const avatar = req.files;
        console.log( avatar , "avtar data");

        // search the user
        const userData = await User.findById(user.id);

        //if profilePic(avatar) there, destroy previous one
        let avatarCloud = {};
        if( avatar ){
            // if user have already a avatar --> destroy the previous avatar from cloudinary --> save memory at cloud
            if( userData.avatar && userData.avatar?.public_id ){
                await cloudinary.v2.uploader.destroy(userData.avatar.public_id);
            }

            // upload new avatar on the cloud
            avatarCloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
                folder: "blog_post_web_app/avatars",
                width: 150,
                crop: "scale",
            });

            // Think which good : use this or doc.save() method?
            userData =  await User.findByIdAndUpdate(user.id,{
                $set : {
                    avatar : {
                        public_id : avatarCloud.public_id,
                        secure_url : avatarCloud.secure_url
                    }
                }
            },{new : true});
        }

        // update the profile
        const profileData = await Profile.findByIdAndUpdate(userData.profile,{
            $set : {
                dateOfBirth,
                bio,
                company
            }
        },{new : true});


        return res.json(200).json({
            success : true,
            message : "Profile updated successfully",
            user  : userData,
            userProfile : profileData
        })

    } catch (error) {
        console.log("API Error..............! in update profile controller", error);
        return res.status(500).json({
            success : false,
            message : "Couldn't update profile",
            error : error.message
        });
    }
}