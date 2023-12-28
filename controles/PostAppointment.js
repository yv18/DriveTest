// const Appointment = require('../models/Appointment');

// const path = require('path');

// module.exports = (req,res) =>{
//     addApt(req);
//     res.redirect("/appointment");
// }


// async function addApt(req,res){
//     try{
//             const dateObject = new Date(req.body.date);
//             const day = dateObject.getUTCDate();
//             const month = dateObject.getUTCMonth() + 1;
//             const year = dateObject.getUTCFullYear();
//             const dateString = year+"-"+month+"-"+day;
//             const time = req.body.time;
//             const itemExists = await Appointment.exists({ date: dateString, time: time });
//             if(!itemExists){
//                 const appointment=await Appointment.create({
//                     date: dateString,
//                     time: req.body.time
//                 });
//                 console.log("Appointment Slot Added");
//             }
//             else{
//                 console.log("Unavailable Slot Requested");
//                 return;
//             }
//     }
//     catch(error){
//         if (error.name === 'MongoServerError' && error.code === 11000) {
//             console.error(error);
//             console.error('Same user found.');
//             } else {
//                 console.error(error);
//                 }
//     }
//     }

const Appointment = require('../models/Appointment');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const message = await addApt(req);
        res.send(message); // Sending text response directly
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the appointment');
    }
};

async function addApt(req) {
    try {
        const dateObject = new Date(req.body.date);
        const day = dateObject.getUTCDate();
        const month = dateObject.getUTCMonth() + 1;
        const year = dateObject.getUTCFullYear();
        const dateString = year + "-" + month + "-" + day;
        const time = req.body.time;
        const itemExists = await Appointment.exists({ date: dateString, time: time });

        if (!itemExists) {
            await Appointment.create({
                date: dateString,
                time: req.body.time
            });
            return "Appointment Slot Added";
        } else {
            return "Unavailable Slot Requested";
        }
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            console.error(error);
            return 'Same user found.';
        } else {
            console.error(error);
            return 'An error occurred while adding the appointment.';
        }
    }
}
