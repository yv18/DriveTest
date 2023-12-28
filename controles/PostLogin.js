const UserPost = require('./../models/UserInfo');

module.exports = async(req,res) => {
    try{
        const userpost= await UserPost.create({...req.body});
    }
    catch (error) {
        if (error.name === 'ValidationError') {
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
        req.session.validationErrors = validationErrors;
        return res.redirect('/login');
        }
        console.error(error);
        res.status(500).send('An error occurred while creating the user');
        }
    res.redirect('/index');
} 