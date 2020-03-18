const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({
    path: process.env.NODE_ENV === 'dev'? '.env': '.env.test'
});

class AppController {
    constructor() {
        this.express = express();

        this.setupMiddlewares();
        this.setupRoutes();
        this.setupDatabase();
    }

    setupMiddlewares() {
        this.express.use(express.json());
    }

    setupRoutes() {
        this.express.use(require('./routes'));
    }

    setupDatabase() {
       mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        }, function(error) {
            console.log(error);
        });
    }
}

module.exports = new AppController().express;