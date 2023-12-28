const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    userInfo: { type: Schema.Types.ObjectId, ref: 'UserInfo' },
    isTimeSlotAvailable: {type:Boolean, default: true}
});

appointmentSchema.plugin(uniqueValidator);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
