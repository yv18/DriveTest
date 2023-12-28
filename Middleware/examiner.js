module.exports = async (req, res) => {
    try {
        if (req.session.userType === 'Examiner') {
            res.render('examiner', { userType: req.session.userType });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while accessing appointments');
    }
};
