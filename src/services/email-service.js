const sender = require('../config/emailConfig');
const {TicketRepository} = require('../repository/index.js');
const repo = new TicketRepository();

const subscribeEvents = async (payload) => {
    
   try {

     let service = payload.service;
     let data = payload.message;
     switch(service) {
         case 'CREATE_TICKET':
             await createNotification(data);
             break;
         case 'SEND_BASIC_EMAIL':
             await sendBasicEmail("demoSupport@gmail.com",data.recepientEmail,data.subject,data.content);
             break;
         default:
             console.log("no valid event recieved! ");
             break;
     }
   } catch (error) {

        throw error;
   }
}
const createNotification = async  (data) => {
    try {
        
        const ticket  = await repo.create(data);
        return ticket;
    } catch (error) {
        
        throw error;
    }
}
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
 try {
       const response = sender.sendMail({
           from: mailFrom,
           to:mailTo,
           subject: mailSubject,
           text: mailBody,
       });
       return response;

 } catch (error) {
    throw error;
 }
    // console.log(response);
}

const fetchPendingEmails = async (timeStamp) => {
    try {
        const response = await repo.get({status:"PENDING"});
        
        return response;
    } catch (error) {
        throw error;
    }   
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId,data);
        return response;
    } catch (error) {
        throw error;
    }
    
}

module.exports = {
    subscribeEvents,
    sendBasicEmail,
    createNotification,
    updateTicket,
    fetchPendingEmails,
    
}