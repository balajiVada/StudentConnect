const mongoose = require('mongoose');

async function dbConnect() {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log(`Database succesfully connected at ${process.env.DB_CONNECTION_STRING}`);
    }
    catch(err) {
        console.log(`Error: ${err}`);
        process.exit();
    }
}

module.exports = dbConnect;