import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/TrialResume");
const signupSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  providerId: String,
  provider: String,
  freeMessagesUsed: { type: Number, default: 0 },
  hasPaid: { type: Boolean, default: false },
});

export default mongoose.models.signup || mongoose.model("signup", signupSchema);
