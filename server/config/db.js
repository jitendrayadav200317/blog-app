import mongoose from "mongoose";

const dbconnect = async()=>{
    try {
        const connection = await  mongoose.connect ('mongodb://localhost:27017/newApp')
        console.log('mongoose connected ✅');
        
    } catch (error) {
        
    }
}

export default dbconnect;

