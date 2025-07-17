import { generateToken } from "../lib/utils.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
//Signup 
export const signup = async (req, res) => {
    const { userName, email, password } = req.body;

    try{
        if(!userName || !email || !password){
            return res.json({success: false, message: "Missing Details"})
        }
        const user = await User.findOne({email});
        
        if(user){
            return res.json({success: false, message: "Account already exists "})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            userName, email, password: hashedPassword
        });

        const token = generateToken(newUser._id);

        res.json({success: true, userData: newUser, token,
            message: "Account Created Successfully"
        })
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}

//Login
export const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const userData = await User.findOne({email});

        if(!userData){
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({
                success: false,
                message: "Invalid creadentials"
            });
        }

        const token = generateToken(userData._id);

        res.json({success: true, userData, token,
            message: "Login Successfully"
        })
    }
    catch(err){
        console.log(err.message);
        res.json({
            success: false,
            message: err.message
        })
    }
}

//Controller to check is user is authenticated
export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
}
