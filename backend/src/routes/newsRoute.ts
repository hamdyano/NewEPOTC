import express, { Request, Response } from "express";
import multer from "multer";
import News from "../models/newsModel";
import verifyToken from "../middleware/authMiddel";
import mongoose from "mongoose";


const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define an extended Request type to include email
interface AuthenticatedRequest extends Request {
  email?: string; }


// Helper function to parse multilingual JSON fields
const parseMultilingualField = (field: string, fieldName: string) => {
  try {
    return JSON.parse(field);
  } catch (error) {
    throw new Error(`Invalid format for ${fieldName}. Expected JSON.`);
  }
};

// Add a news article
router.post("/adding-news", verifyToken, upload.single("image"), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) {
      return res.status(401).json({ message: "Unauthorized: No email found" });
    }

    const title = parseMultilingualField(req.body.title, "title");
    const paragraph = parseMultilingualField(req.body.paragraph, "paragraph");

    if (!title.en || !title.ar || !title.fr) {
      return res.status(400).json({ message: "Title is required in all languages" });
    }
    if (!paragraph.en || !paragraph.ar || !paragraph.fr) {
      return res.status(400).json({ message: "Paragraph is required in all languages" });
    }

    const image = req.file ? req.file.buffer.toString("base64") : null;
    const youtubeLink = req.body.youtubeLink || null;

    // Validate either image or YouTube link exists
if (!image && !youtubeLink) {
  return res.status(400).json({ message: "Either image or YouTube link is required" });
}
    const newNews = new News({ title, paragraph, image, youtubeLink, email: req.email });
    await newNews.save();

    res.status(201).json({ message: "News added successfully", news: newNews });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});



// Get all news articles
router.get("/", async (req: Request, res: Response) => {
  try {
    const allNews = await News.find().sort({ createdAt: -1 }); // Retrieves all news articles
    res.status(200).json({ news: allNews });
  } catch (error) {
    console.error("Error fetching news:", error); // Log error for debugging
    res.status(500).json({ message: (error as Error).message });
  }
});


// Get news articles for the logged-in user

router.get("/my-news", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) {
      return res.status(401).json({ message: "Unauthorized: No email found" });
    }
    const email = req.email;
    const news = await News.find({ email}).sort({ createdAt: -1 });
    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});





// Get news by ID with YouTube link
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid news ID format" });
    }

    const news = await News.findById(id).select("title paragraph image youtubeLink");

    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }

    // Validate media existence
    if (!news.image && !news.youtubeLink) {
      console.warn(`News ${id} has no media attached`);
    }

    res.status(200).json({ 
      news: {
        _id: news._id,
        title: news.title,
        paragraph: news.paragraph,
        image: news.image,
        youtubeLink: news.youtubeLink
      }
    });

  } catch (error) {
    console.error("Error fetching news:", error);
    
    // Handle CastError for invalid ID format
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid news ID format" });
    }

    res.status(500).json({ 
      message: "Failed to fetch news article",
      error: (error as Error).message
    });
  }
});



// Update a news article
router.put("/update-news/:id", verifyToken, upload.single("image"), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) {
      return res.status(401).json({ message: "Unauthorized: No email found" });
    }

    const { id } = req.params;
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ message: "News article not found" });
    }

    if (existingNews.email !== req.email) {
      return res.status(403).json({ message: "Forbidden: You can only edit your own news" });
    }

    const title = req.body.title ? parseMultilingualField(req.body.title, "title") : existingNews.title;
    const paragraph = req.body.paragraph ? parseMultilingualField(req.body.paragraph, "paragraph") : existingNews.paragraph;
    const image = req.file ? req.file.buffer.toString("base64") : existingNews.image;
    const youtubeLink = req.body.youtubeLink || existingNews.youtubeLink;

    existingNews.title = title;
    existingNews.paragraph = paragraph;
    existingNews.image = image;

    // Validate at least one media exists
if (!req.file && !youtubeLink) {
  return res.status(400).json({ 
    message: "Either image or YouTube link must be provided" 
  });
}

    existingNews.youtubeLink = youtubeLink;
    await existingNews.save();
    res.status(200).json({ message: "News updated successfully", news: existingNews });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});



// Delete a news article
router.delete("/delete-news/:id", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) {
      return res.status(401).json({ message: "Unauthorized: No email found" });
    }

    const { id } = req.params;
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ message: "News article not found" });
    }

    if (existingNews.email !== req.email) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own news" });
    }

    await News.findByIdAndDelete(id);
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
 






/*

// get news by id 
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id).select("title paragraph image");

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ news });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});
*/






 
 
 
 
 
 
 