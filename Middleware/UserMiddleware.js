module.exports = ( req,res,next)=>{
    const UserId = req.session.userId;
    const usertype = req.session.userType;
    if(UserId && usertype === "Driver"){
        next();
    }else{
        return res.redirect('/');
    }
    }