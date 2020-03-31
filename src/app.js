const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./utils/connectDB');

if(!process.env.ENV_SET){
    require('dotenv').config({
        path: process.env.NODE_ENV === 'dev'? '.env': '.env.test'
    });   
}

class AppController {
    constructor() {
        this.express = express();

        this.setupMiddlewares();
        this.setupRoutes();
        this.setupDatabase();
    }

    setupMiddlewares() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    setupRoutes() {
        this.express.use(routes);
    }

    setupDatabase() {
        connectDB();
    }
}

module.exports = new AppController().express;