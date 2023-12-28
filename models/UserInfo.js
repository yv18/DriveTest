const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const UserInfoSchema = new Schema({
    Firstname: { type: String, default: 'default' },
    Lastname: { type: String, default: 'default' },
    License_No: { type: String, default: 'default' },
    Age: { type: Number, default: 0 },  
    DOB: { type: Date, default: Date.now },  
    username: String,
    password: String,
    userType: String,
    car_details: {
      make: { type: String, default: 'default' },
      model: { type: String, default: 'default' },
      year: { type: Number, default: 0 },  
      platno: { type: String, default: 'default' }
    }
  });
  

UserInfoSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
    })

const UserInfo = mongoose.model('UserInfo',UserInfoSchema);
module.exports = UserInfo;


    
