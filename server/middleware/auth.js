import User from "../models/userSchema.js";
import jwt from 'jsonwebtoken'

//Middleware to protect
export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if token exists and starts with 'Bearer'
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        // Extract token from 'Bearer <token>'
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID and exclude password
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err.message);
        res.json({
            success: false,
            message: err.message
        });
    }
};