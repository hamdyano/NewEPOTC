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
  image: string | null; // Modified to allow null
  youtubeLink: string | null; // New field
  isFeatured?: boolean; // Add this new field
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
  image: { type: String, required: false }, // Storing as Base64 or URL
  youtubeLink: { type: String, required: false }, // New field
  isFeatured: { type: Boolean, default: false }, // Add this new field
  email: { type: String, required: true }, // User who added the news
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model<NewsItem>("News", newsSchema);
export default News;
