import mongoose from "mongoose";

const Schema = mongoose.Schema


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken:{
    type: String,
    default: null,
  },
  resetTokenExpires: {
    type: Date,
    default: null,
  },
})

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)