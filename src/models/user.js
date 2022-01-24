import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  // this.password = await bcrypt.hash(this.password, 5); 이 라인이 save 할때마다 hash를 하기에 미들웨어를 수정했다. 그래서 비번을만들때와 수정할때만 실행되게 했음
});
const User = mongoose.model("User", userSchema);
export default User;
