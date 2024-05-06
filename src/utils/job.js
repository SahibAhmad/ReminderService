const cron = require('node-cron');
const sender = require('../config/emailConfig.js');

const {EmailService } = require('../services/index.js');


const setupJobs = async () => {
    cron.schedule('*/1 * * * *', async ()=> {
        const response = await EmailService.fetchPendingEmails();
        

        response.forEach(email => {
           
            sender.sendMail({
                from:"support@gmail.com",
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err,data) => {
                if(err) {
                    throw err;
                }
                else
                {
                    console.log(data);
                    await EmailService.updateTicket(email.id,{status: "SUCCESS"});
                }
            });
            
        });
    })
}

module.exports = setupJobs