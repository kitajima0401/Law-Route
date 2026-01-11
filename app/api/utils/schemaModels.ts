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
  favorites:[
    {
      law_revision_id: {
        type: String,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ]
})

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)