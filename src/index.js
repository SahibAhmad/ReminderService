const express = require('express');
const bodyParser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const { TicketController } = require('./controllers/index');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const { EmailService } = require('./services/index');
const setupJobs = require('./utils/job');

const setupAndStartServer = async function () {
    try {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.listen(PORT, async () => {
            console.log(`Server started at ${PORT}`);
            
            app.post('/api/v1/tickets',TicketController.create);
            await setupJobs();

            const channel = await createChannel();
            subscribeMessage(channel,EmailService.subscribeEvents, REMINDER_BINDING_KEY);
            
        });

            } catch (error) {
        console.error('Error setting up and starting the server:', error);
    }
};

setupAndStartServer();
