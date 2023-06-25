// instantiating the server
const express = require('express');
const app = express();

//loading config from .env file
require('dotenv').config();
const PORT = process.env.PORT || 3000

// middleware to parse json request body
app.use(express.json());

// mounting the routes
const routers = require('./routes/todo')
app.use("/api/v1", routers);

// CONNECTING TO DB
const dbConnect  = require('./config/databse')
dbConnect(); 


// starting the server
app.listen(PORT, (error)=> {
    if(error) 
        console.error(error);
    console.log(`Listening on port ${PORT}`);
});