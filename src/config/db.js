import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://admin:admin@cluster0.abwde.mongodb.net/')
        console.log('DB Connected')
    } catch (err) {
        throw err;
    }
}