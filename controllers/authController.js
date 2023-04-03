import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

const registerController = async (req, res) => {
  try {
    // Validation
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send((error = "Name is Required"));
    }
    if (!email) {
      return res.send((error = "Email is Required"));
    }
    if (!password) {
      return res.send((error = "Password is Required"));
    }
    if (!phone) {
      return res.send((error = "Phone is Required"));
    }
    if (!address) {
      return res.send((error = "Address is Required"));
    }

    // Check user
    const existingUser = await userModel.findOne({ email });
    //Existing User
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please Login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    //save the user details
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// POST || LOGIN
const loginController  = async(req , res) =>{
  try {
    const {email , password} = req.body;
    //Validation
    if(!email || !password){
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check User
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Email not Registered..."
      })
    }
    // Compare Password
    const passwordMatched = await comparePassword(password ,user.password );

    if(!passwordMatched){
      return res.status(200).send({
        success:false,
        message:"Incorrect Password"
      })
    }

    const token = JWT.sign({ _id: user._id } , process.env.JWT_SECRET  , {
      expiresIn:"7d"
    })
    console.log(process.env.JWT_SECRET);
    res.status(200).send({
      success:true,
      message:"Login Successfully",
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address
      },
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
}

// Test Controller
const testController = (req,res) =>{
  console.log("Protected Route");
  res.send("Protected Route");
}

export { registerController , testController  , loginController};
