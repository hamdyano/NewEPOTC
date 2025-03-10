import mongoose from "mongoose";

interface TopicItem {
  title: {
    en: string;
    ar: string;
    fr: string;
  };
  paragraph: {
    en: string;
    ar: string;
    fr: string;
  };
  image: string | null;
  youtubeLink: string | null;
  email: string;
  createdAt?: Date;
}

const topicSchema = new mongoose.Schema<TopicItem>({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  paragraph: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
    fr: { type: String, required: true },
  },
  image: { type: String, required: false },
  youtubeLink: { type: String, required: false },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Topic = mongoose.model<TopicItem>("Topic", topicSchema);
export default Topic;