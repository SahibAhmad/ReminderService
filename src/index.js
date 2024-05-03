const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const {sendBasicEmail} = require('./services/email-service');


const setupAndStartServer = async function () {
    try {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
        // sendBasicEmail(
        //     'support@admin.com',
        //     'sahibahmed998@gmail.com',
        //     'test',
        //     'hey test'
        // )

    } catch (error) {
        console.error('Error setting up and starting the server:', error);
    }
};

setupAndStartServer();
