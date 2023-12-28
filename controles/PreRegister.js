// const UserPost = require('./../models/UserInfo');
// module.exports = async(req,res) => { 
//     try {
//         const userpost= await UserPost.create({...req.body});
//         console.log(UserPost.body);
//         res.redirect('/login');
//     }
//     catch (error) { 
//         console.log(error);
//         res.status(500).send('An error occurred while creating the user');
//     }
// }

const UserPost = require('./../models/UserInfo');
module.exports = async (req, res) => {
    try {
            const userinfo = await UserPost.create({
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
                platno: req.body.car_platno
              }
            });
            console.log(userinfo);
            res.redirect("/login");
          } catch (error) {
            console.log(error);
            res.status(500).send("Error creating user.");
          }
};
