const UserInfo = require('../models/UserInfo'); // Capitalized the model name convention
const path = require('path');

module.exports = async (req, res) => {
  try {
    await updateUserInfo(req);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Sending an error response in case of failure
  }
};

async function updateUserInfo(req) {
  try {
    const updatedUserInfo = await UserInfo.findOneAndUpdate(
      { username: req.session.username },
      {
        $set: {
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
        },
      },
      { new: true } // To return the updated document
    );
    return updatedUserInfo; // Returning the updated user info
  } catch (error) {
    throw error; // Propagating the error to handle in the calling function
  }
}
