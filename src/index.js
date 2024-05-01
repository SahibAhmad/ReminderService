const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');


const setupAndStartServer = async function () {
    try {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });

    } catch (error) {
        console.error('Error setting up and starting the server:', error);
    }
};

setupAndStartServer();
