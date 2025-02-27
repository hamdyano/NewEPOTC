import express, { Request, Response } from "express";
import verifyToken from "../middleware/authMiddel";
import mongoose from "mongoose";
import Video from "../models/videosModel";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  email?: string;
}

// Helper function to parse multilingual title
const parseTitle = (title: string) => {
  try {
    const parsed = JSON.parse(title);
    if (!parsed.en || !parsed.ar || !parsed.fr) {
      throw new Error("Title must contain all languages (en, ar, fr)");
    }
    return parsed;
  } catch (error) {
    throw new Error("Invalid title format. Expected JSON with en, ar, fr properties");
  }
};

// Add a video
router.post("/add-video", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) {
      return res.status(401).json({ message: "Unauthorized: No email found" });
    }

    const title = parseTitle(req.body.title);
    const youtubeLink = req.body.youtubeLink;

    if (!youtubeLink) {
      return res.status(400).json({ message: "YouTube link is required" });
    }

    const newVideo = new Video({
      title,
      youtubeLink,
      email: req.email
    });

    await newVideo.save();
    res.status(201).json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Get all videos
router.get("/", async (req: Request, res: Response) => {
  try {
    const allVideos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ videos: allVideos });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get videos for logged-in user
router.get("/my-videos", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) return res.status(401).json({ message: "Unauthorized" });
    
    const videos = await Video.find({ email: req.email }).sort({ createdAt: -1 });
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get single video by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Update video
router.put("/update-video/:id", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const video = await Video.findById(id);
    
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (video.email !== req.email) return res.status(403).json({ message: "Forbidden" });

    if (req.body.title) video.title = parseTitle(req.body.title);
    if (req.body.youtubeLink) video.youtubeLink = req.body.youtubeLink;

    await video.save();
    res.status(200).json({ message: "Video updated", video });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Delete video
router.delete("/delete-video/:id", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.email) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const video = await Video.findById(id);
    
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (video.email !== req.email) return res.status(403).json({ message: "Forbidden" });

    await Video.findByIdAndDelete(id);
    res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;