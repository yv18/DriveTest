const User = require('../models/UserInfo');
const path = require("path")
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    try {
        const user = await User.findOne({ username: username }).exec();
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
              req.session.userId = user._id;
              req.session.username = user.username;
              req.session.userType = user.userType;
              console.log(user.username);
              console.log(user.userType);
              if(user.Firstname == 'default' && user.userType == 'Driver'){
                  res.redirect('/G2');
              }
              else if(user.Firstname != 'default' && user.userType == 'Driver'){
                  res.redirect('/G');
              }
              else{
                  res.redirect('/');
              }
          } else {
            res.redirect('/login');
          }
        } else {
            res.redirect('/login');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during login');
    }
};
