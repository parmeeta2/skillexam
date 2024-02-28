const mongoose = require("mongoose");

module.exports = async function connect() {
    const url = "mongodb://localhost/moodfood";
    console.log("Trying to connect to database.");
    try {
        await mongoose.connect(url, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log("connection to database is established.");
    } catch  (error) {
        console.error("There was an error while connecting to the database");
        console.error(error);
    }
}