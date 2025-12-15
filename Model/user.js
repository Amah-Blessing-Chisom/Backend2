import mongoose from "mongoose";

const cohortFourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    state: { type: String },
    address: { type: String },
    userName:{type:String, required:false}
  },
  { timestamps: true }
);

const cohortFour = mongoose.model("cohortFour", cohortFourSchema);
export default cohortFour;
