const BookedSlots = require('../models/BookedSlots');
const path = require('path');

module.exports = async (req,res) => {
        try {
          // Fetch all data from BookedSlots
          const allBookedSlotsData = await BookedSlots.find({Result: 'Result Pending'});
          const userType = req.session.userType;
      
          // Render the Examiner's dashboard view with all BookedSlots data
          console.log(allBookedSlotsData);
          res.render('examiner', { bookedAppointments: allBookedSlotsData, userType });
        } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
}
  