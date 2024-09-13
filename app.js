const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

require("dotenv").config();

// Creates an Express application.
const app = express();


// ************** DB connection ****************
const dbConnection = require("./config/database");
dbConnection();

// ************* Cloudinary configuration *************
const cloudinaryConfiguration = require("./config/cloudinary");
cloudinaryConfiguration();


// ***************** Middlewares ****************
app.use(express.json());

app.use(cookieParser());

app.use(cors()); // open to everyone
// app.use( cors( {origin : "http://localhost:5173"} ));

app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// *************** Routes *******************
const authRoute = require("./routes/auth");

app.use("/api/v1", authRoute);






// **************** APIs ************************
app.get("/", (req, res, next) => {
    res.status(200).json({ msg: "all goes well" });
});





// ************ Listing on Port *******************
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Website is live on http://localhost:${PORT}`);
});