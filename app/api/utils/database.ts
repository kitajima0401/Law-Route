import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async() => {
  try{
    if(!MONGODB_URI) throw new Error()
    await mongoose.connect(MONGODB_URI)
    console.log("Success: Connected to mongoDB")
  }catch(err){
    console.log("Faulure: Unconnected to mongoDB")
    throw new Error()
  }
  
}

export default connectDB