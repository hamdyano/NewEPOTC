import mongoose from "mongoose";

interface VideoItem {
  title: {
    en: string;
    ar: string;
    fr: string;
  };
  youtubeLink: string;
  email: string;
  createdAt?: Date;
}

const videoSchema = new mongoose.Schema<VideoItem>({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  youtubeLink: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model<VideoItem>("Video", videoSchema);
export default Video;