const userInfo = require('../models/UserInfo');
const path = require('path');


module.exports = (req,res) =>{
    UpdateUser(req);
    res.redirect('/');
}

async function UpdateUser(req,res){
    try {
        const updatedinfo = await userInfo.findOneAndUpdate(
          { username: req.session.username },
          {
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            License_No: req.body.License_No,
            Age: req.body.Age,
            DOB: req.body.DOB,
            car_details: {
              make: req.body.make,
              model: req.body.model,
              year: req.body.year,
              platno: req.body.platno,
            },
          }
        );
      } catch (error) {
        console.log(error);
        res.status(500).send("Error updating data.");
      }
    }
