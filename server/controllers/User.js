const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// login handler
exports.login = async (req, res) => {
  try {
    // fetch data from request body
    const { email, password } = req.body;

    // validate email and password are present in request or notInitialized(non empty fields)
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Both fields are required",
      });
    }

    // check if given email is registered in Db or not
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User with this e-mail does not exist, Please sign-up first!",
      });
    }

    // verify password and generate a JWT token
    if (await bcrypt.compare(password, existingUser.password)) {
      // password match -> generate token and insert in "existingUser" to be sent back as a response
      const payload = {
        email: existingUser.email,
        id: existingUser._id,
      };

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // add token in existing user and removing passworkd from it for security reasons (as this will be sent as a response)
      existingUser.token = token;
      existingUser.password = undefined;

      // preparing a cookie to be sent
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // cookie will expire in 1 day
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: " User Logged in successfully",
        existingUser,
        token,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Error in logging in : ${error.message}`,
    });
  }
};

// signup handler
exports.signUp = async (req, res) => {
  try {
    //  fetch data from request body
    const { fName, lName, email, password } = req.body;

    // validating all fields are filled
    if (!fName || !lName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // if user with same email already exists send a response
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(406).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // if everything is fine create an entry of the new user into Db
    const newUser = await User.create({
      fName: fName,
      lName: lName,
      email: email,
      password: hashedPassword,
    });

    // successfull response
    return res.status(200).json({
      success: true,
      message: "User Registered",
    });
  } catch (error) {
    console.error("Error in signup: ", error);
    return res.status(500).json({
      success: false,
      message: "Error singning up, Please try again!",
    });
  }
};
