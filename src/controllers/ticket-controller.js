const {EmailService} = require('../services/index');


const create = async (req,res) => {
    try {
        
        const response = await EmailService.createNotification(req.body);
        return res.status(201).json({
            success: true,
            data: response,
            err: {},
            message: "Successfully registered an email reminder",

        });
    } catch (error) {
        
        
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: "Couldn't register a notification",
        });
    }
}

module.exports = {
    create,
}