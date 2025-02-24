import mongoose from "mongoose";

interface NewsItem {
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
  image: string;
  email: string;
  createdAt?: Date;
}

const newsSchema = new mongoose.Schema<NewsItem>({
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
  image: { type: String, required: true }, // Storing as Base64 or URL
  email: { type: String, required: true }, // User who added the news
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model<NewsItem>("News", newsSchema);
export default News;
