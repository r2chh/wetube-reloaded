import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxLength: 80,
  },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
// 아래방법도 좋지만, 이렇게 하면 save 와 update, 두군데에 다 필요하다 즉 복사 붙여넣기를 해야하는 불편함
// videoSchema.pre('save', async function(){
//     this.hashtags = this.hashtags [0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));

// });
const Video = mongoose.model("Video", videoSchema);
export default Video;
