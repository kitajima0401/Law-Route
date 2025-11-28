import mongoose from "mongoose";

const connectDB = async() => {
  try{
    await mongoose.connect("mongodb+srv://yuukikuma0401:k1288k1288@cluster0.nltnuzp.mongodb.net/?appName=Cluster0")
    console.log("Success: Connected to mongoDB")
  }catch(err){
    console.log("Faulure: Unconnected to mongoDB")
    throw new Error()
  }
  
}

export default connectDB