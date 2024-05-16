const sender = require('../config/emailConfig');
const {TicketRepository} = require('../repository/index.js');
const repo = new TicketRepository();

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
    sendBasicEmail,
    createNotification,
    updateTicket,
    fetchPendingEmails,
    
}