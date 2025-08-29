import UserModel from "../models/User.js";
import bcryptjs from "bcryptjs";

const Register= async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const UserExists = await UserModel.findOne({email})
                if(UserExists){
            return res.status(402).json({success:false, message: "User already exists Please login" }) ;
        }  
        // Hash the password before saving
        const HashPassword = await bcryptjs.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: HashPassword
        });

        await newUser.save();
        return res.status(200).json({success:true, message: "User registered successfully",user: newUser});
    } catch (error) {
        console.error("Error in Register:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    } 

};
const Login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const UserExists = await UserModel.findOne({email});
        if (!UserExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcryptjs.compare(password, UserExists.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        return res.status(200).json({ success: true, message: "Login successful", user: UserExists });
    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { Register, Login };