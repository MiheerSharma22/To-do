const dbConnect  = require('./config/databse')

// instantiating the server
const express = require('express');
const app = express();

//loading config from .env file
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware to parse json request body
app.use(express.json());

// mounting the routes


// CONNECTING TO DB
dbConnect(); 


// starting the server
app.listen(PORT , ()=>{
    console.log(`Server started at port ${PORT}`);
})