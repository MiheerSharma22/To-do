const User = require('../models/User')

// login handler




// signup handler 
exports.signUp = async(req,res) => {
    try {
        //  fetch data from request body
        const {fName, lName, email, password} = req.body

        // validating all fields are filled
        if(!fName || !lName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        // if user with same email already exists send a response
        const userExists = await User.findOne({ email: email});
        if(userExists) {
            return res.status(406).json({
                success: false,
                message: "Email already exists"
            })
        }

    } catch(error) {
        console.error("Error in signup: ",error);
        return res.status(500).json({
            success: false,
            message: "Error singning up, Please try again!"
        })
    }
}