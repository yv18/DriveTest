const Assignment = require('./../models/UserInfo');
const Appointment = require('../models/Appointment');
const bookedSlots = require("../models/BookedSlots");

const path = require('path');


module.exports = async (req, res) =>{
    const userType = req.session.userType;
    const ResultInfo = await bookedSlots.find({username: req.session.username});
    const timeArray =[];
    res.render('G2.ejs',{timeArray,userType,ResultInfo})
    }