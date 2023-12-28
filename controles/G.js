const UserInfo = require("../models/UserInfo");
const bookedSlots = require("../models/BookedSlots");
const path = require('path');


module.exports = async (req, res) =>{
    const userType = req.session.userType;
    const ResultInfo = await bookedSlots.find({username: req.session.username});
    const userinfo = await UserInfo.find({username: req.session.username});
    const timeArray =[];
    console.log(ResultInfo);
    console.log(userinfo);
    res.render('G.ejs',{userinfo,ResultInfo,userType,timeArray})  
    }