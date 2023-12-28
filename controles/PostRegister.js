const userInfo = require('../models/UserInfo');
const path = require('path');


// module.exports = (req,res) =>{
//     UpdateUser(req);
//     res.redirect('/login');
// }

module.exports = (req, res) => {
  const { password, Re_Password } = req.body;

  if (password === Re_Password) {
      UpdateUser(req, res);
  } else {
      // Passwords don't match, handle this situation (e.g., show an error message)
     console.log("Passwords do not match");
  }
}

async function UpdateUser(req,res){
    try {
        const userinfo = await userInfo.create({
          Firstname: req.body.Firstname, 
          Lastname: req.body.Lastname,
          License_No: req.body.License_No,
          Age: req.body.Age,
          DOB: req.body.DOB,
          username: req.body.username,
          password: req.body.password,
          userType: req.body.userType,
          car_details: {
            make: req.body.car_make,
            model: req.body.car_model,
            year: req.body.car_year,
            platno: req.body.car_platno,
          },
        });
        console.log(userinfo);
        res.redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
