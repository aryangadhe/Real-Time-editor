import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Mongoose is connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/code-editor`);
    } catch (error) {
        console.log("Mongoose connection error", error);
    }
};