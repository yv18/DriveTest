const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookedSlotsSchema = new Schema({
    Firstname: { type: String, default: 'default' },
    Lastname: { type: String, default: 'default' },
    License_No: { type: String, default: 'default' },
    Age: { type: Number, default: 0 },
    DOB: { type: Date, default: Date.now },
    username: String,
    userType: String,
    car_details: {
        make: { type: String, default: 'default' },
        model: { type: String, default: 'default' },
        year: { type: Number, default: 0 },
        platno: { type: String, default: 'default' }
    },
    appointment: {
        date: {
            type: Date,
            default: () => new Date().toISOString().split('T')[0] // Only date without time
        },
        time: String,
        testType: String
    },
    Result: { type: String, default: 'Result Pending' }
});

const BookedSlots = mongoose.model('BookedSlots', bookedSlotsSchema);

module.exports = BookedSlots;
