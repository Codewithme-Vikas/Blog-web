const cloudinary = require("cloudinary");
require("dotenv").config();


const cloudinaryConfiguration = () => {

    try {
        // Configuration
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

    } catch (error) {
        console.log("Couldn't configure the cloudinary")
        console.log(error.message);
    }


}

module.exports = cloudinaryConfiguration;