module.exports = (req, res) =>{
    const userType = req.session.userType;
    res.render('index.ejs',{userType});
    }