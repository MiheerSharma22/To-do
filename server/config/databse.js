const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log("DataBase connected successfully"))
    .catch((error) => {
        console.error("Error connecting to database: ", error)
        process.exit(1);
    });
}

module.exports = dbConnect;