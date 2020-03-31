const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    }, function(error) {
        if(error){
            console.log(error);
        }
    });
}

module.exports = connectDB;