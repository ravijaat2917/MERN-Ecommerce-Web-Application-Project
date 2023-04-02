import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

const registerController = async (req, res) => {
  try {
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
        messege: "Already Register please Login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    //save the user details
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error in Registration",
      error,
    });
  }
};

export { registerController };
