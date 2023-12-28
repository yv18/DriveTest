const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserInfo = require("./models/UserInfo");
const Appointment = require('./models/Appointment'); 
const BookedSlots = require('./models/BookedSlots');
const LoginMiddleware = require("./middleware/LoginMidleware");
const expressSession = require("express-session");
const flash = require("connect-flash");

// navigate controlles
const GController = require("./controles/G.js");
const G2Controller = require("./controles/G2.js");
const homeController = require("./controles/home.js");
const loginController = require("./controles/login.js");
const registerController = require("./controles/register.js");
const logout = require("./controles/logout.js");
const loginpass = require("./controles/loginUser.js");
const preRegister = require("./controles/PreRegister.js");
const usercontroller = require("./middleware/UserMiddleware.js");
const PostAppointment = require('./controles/PostAppointment.js');
const Appointmentcontrol = require("./controles/appointment.js");
const PostG2Slots = require('./controles/PostG2.js');
const PostGSlots = require('./controles/PostG.js');
const SaveSlotG2 = require('./controles/SaveSlotG2.js');
const AdminAuth = require('./middleware/AdminAuth.js');
const UpdateUserG2 = require('./controles/UpdateUser.js');
const NewUserG2 = require('./controles/DataG2.js');
const PostRegister = require('./controles/PostRegister.js');
const GetExaminer = require('./controles/examiner.js');
const PostExaminer = require('./controles/updateResult.js');
const SaveGslot = require('./controles/saveSlotG.js');


// const RegisterControl = require("./controles/register");

app.use(
  expressSession({
    secret: "my secret",
    express: { maxAge: 500000 },
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());

const LoginMidleware = require("./middleware/LoginMidleware");
const loginUser = require("./controles/loginUser.js");
const { userInfo } = require("os");
const UpdateUser = require("./controles/UpdateUser.js");
const ExminerMiddleware = require("./middleware/examiner.js");

app.get("/", LoginMiddleware, homeController);
app.get("/examiner",GetExaminer);
app.get("/G", LoginMiddleware, usercontroller, GController);
app.get("/G2", LoginMiddleware, usercontroller, G2Controller);
app.get("/index", LoginMiddleware, homeController);
app.get("/login", loginController,AdminAuth,ExminerMiddleware);
app.get("/logout", logout);
app.post("/Data/appoinment", PostAppointment);
app.get("/appointment",AdminAuth, Appointmentcontrol);
app.post('/book_appointmnet', PostG2Slots);
app.post('/save_aapointment', SaveSlotG2);
app.post('/G_Book',PostGSlots);
app.post('/G_Slot',SaveGslot);
app.post('/update', UpdateUserG2);
app.post('/posts/User',PostRegister);
app.post('/updateResult',PostExaminer);


app.post ('/posts/Data', NewUserG2);
app.post("/posts/loginUser", loginUser);
// app.post('/posts/Data', PostData);

var mongodbQuery =
  "mongodb+srv://rajyashrajkishorsinh:Raj2329@cluster0.bu58mey.mongodb.net/?retryWrites=true&w=majority";

// app.post('/updateResult', async (req, res) => {
//   const { username, Result } = req.body;
//   console.log(Result);

//   try {
//       const updatedData = await BookedSlots.findOneAndUpdate(
//           { username }, // Find the document based on the username
//           { Result: Result }, // Update the result field with the value from the form
//           { new: true } // Set to return the updated document
//       );

//       if (!updatedData) {
//           return res.status(404).json({ error: 'User data not found' });
//       }

//       res.status(200).json({ message: 'User data updated successfully', updatedData });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//   }
// });

  


  
  
mongoose.connect(mongodbQuery, { useNewUrlParser: true });

let port =process.env.PORT;
if(port == null || port == ""){
    port=4000;
}

app.listen(port, ()=>{
console.log('App listening on port 4000');
})

