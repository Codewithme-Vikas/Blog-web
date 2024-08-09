const mongoose = require("mongoose");
require("dotenv").config();


const dbConnection = () => {

    mongoose.connect(process.env.MONGODB_URL)
        .then(res => console.log("DB connected successfully!"))
        .catch(err => {
            console.log("Failed to connect with DB");
            console.log("Error Msg : ", err.message);
            process.exit(1); // stop further execution
        });

};

module.exports =  dbConnection;