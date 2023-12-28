const BookedSlots = require('../models/BookedSlots');
const path = require('path');


module.exports = async (req, res) => {
        const { username, Result } = req.body;
        console.log(Result);
      
        try {
            const updatedData = await BookedSlots.findOneAndUpdate(
                { username }, // Find the document based on the username
                { Result: Result }, // Update the result field with the value from the form
                { new: true } // Set to return the updated document
            );
      
            if (!updatedData) {
                return res.status(404).json({ error: 'User data not found' });
            }
      
           res.redirect("/examiner");
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
}