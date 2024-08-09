const express  = require("express");
const cors = require("cors");

require("dotenv").config();

// Creates an Express application.
const app = express();


// ************** DB connection ****************
const dbConnection = require("./config/database");
dbConnection();




// ***************** Middlewares ****************
app.use( express.json() );

app.use( cors() ); // open to everyone
// app.use( cors( {origin : "http://localhost:5173"} ));





// **************** APIs ************************
app.get("/", (req, res, next)=>{
    res.status(200).json({ msg : "all goes well"});
});





// ************ Listing on Port*******************
const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log(`Website is live on http://localhost:${PORT}`);
});