const userInfo = require('../models/UserInfo');
const Appointment = require('../models/Appointment');
const BookedSlots = require('../models/BookedSlots'); 

const path = require('path');

// module.exports = async(req,res) =>{
//     const user = await Appointment.findOne({date: req.body.date, time: req.body.time});
//     UpdateAPT(req,res);
//     UpdateUser(req,res,user);
//     res.redirect('/');
// }
// async function UpdateAPT(req,res){
//     try{
//         const updatedData=await Appointment.findOneAndUpdate({date: req.body.date, time: req.body.time} , {
//             isTimeSlotAvailable: false,
//         });
//     }
//     catch(error){
//         console.log(error);
//     }
// }
// async function UpdateUser(req,res,user){
//     try{
//         const updatedData=await userInfo.findOneAndUpdate({"username": req.session.username} , {
//             AppointmentID: user._id,
//         });
//     }
//     catch(error){
//         console.log(error);
//     }
//     }

// Handler for appointment booking
module.exports = async (req, res) => {
    try {
        // Find the requested appointment
        const user = await Appointment.findOne({ date: req.body.date, time: req.body.time });

        // Update the Appointment model to mark the slot as unavailable
        await updateAppointment(req.body.date, req.body.time);

        // Save appointment information into BookedSlots for the user
        await saveAppointmentForUser(req.session.username, user);

        res.redirect('/'); // Redirect to homepage or a suitable route
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Update the appointment status
async function updateAppointment(date, time) {
    try {
        await Appointment.findOneAndUpdate({ date, time }, {
            isTimeSlotAvailable: false,
        });
    } catch (error) {
        console.log(error);
    }
}

// Save the appointment information into BookedSlots for the user
async function saveAppointmentForUser(username, user) {
    try {
        const userInfoData = await userInfo.findOne({ "username": username });

        // Create a new instance of BookedSlots
        const newBooking = new BookedSlots({
            Firstname: userInfoData.Firstname,
            Lastname: userInfoData.Lastname,
            License_No: userInfoData.License_No,
            Age: userInfoData.Age,
            DOB: userInfoData.DOB,
            username: userInfoData.username,
            userType: userInfoData.userType,
            car_details: userInfoData.car_details,
            appointment: {
                date: user.date,
                time: user.time,
                testType: "G Test"
            }
        });

        console.log(newBooking);

        // Save the new booking into BookedSlots database
        await newBooking.save();
    } catch (error) {
        console.log(error);
    }
}
