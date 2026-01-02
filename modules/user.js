import mongoose from "mongoose";

const historySchema = {
  text: String,
  updatedAt: Date,
};

const userSchema = new mongoose.Schema({
  Useremail: String,
  name: String,
  title: String,
  number: String,
  email: String,

  skills: [String],
  skillsHistory: [historySchema],

  education: String,
  educationHistory: [historySchema],

  aboutYourself: String,
  aboutYourselfHistory: [historySchema],
});

export default mongoose.models.user || mongoose.model("user", userSchema);
