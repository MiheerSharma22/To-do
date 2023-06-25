const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("DataBase connected successfully"))
    .catch((error) => {
        console.err("Error connecting to database: ", error);
        process.exit(1);
    });
}