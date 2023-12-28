const user = require('./../models/UserInfo');
const path = require('path');


module.exports = (req, res) =>{
    const userType = req.session.userType;
    res.render('login.ejs',{userType})
    }