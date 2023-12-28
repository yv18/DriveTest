const Appointment = require('../models/Appointment');

const path = require('path');

module.exports = async(req, res) =>{
    let timeArray = [];
    const userType = req.session.userType;
    const islogin = req.session.auth;
    const dateObject = new Date(req.body.selectedDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1; 
    const year = dateObject.getUTCFullYear();
    const dateString = year+"-"+month+"-"+day;
    const itemExists = await Appointment.find({ date: dateString, isTimeSlotAvailable: true }).lean();
    for(let i=0; i<itemExists.length ; i++){
        timeArray[i]=itemExists[i].time;
    }
    res.render('G',{timeArray, userType, islogin, dateString});   
}