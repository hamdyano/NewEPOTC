import express, { Request, Response } from "express";
import verifyToken from "../middleware/authMiddel";
import Photo from "../models/photosModel";
import multer from "multer";

const router = express.Router();

// Multer configuration for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all photos (public)
router.get("/", async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find().select("image createdAt");
    res.status(200).json({ photos });
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});

// Add new photo (authenticated)
router.post(
  "/add-photo",
  verifyToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const email = req.email;
      
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Convert image to Base64
      const imageBase64 = req.file.buffer.toString("base64");

      const newPhoto = new Photo({
        image: imageBase64,
        email,
      });

      await newPhoto.save();
      res.status(201).json({ message: "Photo uploaded successfully", newPhoto });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ message: "Failed to upload photo" });
    }
  }
);

// Get authenticated user's photos
router.get("/my-photos", verifyToken, async (req: Request, res: Response) => {
  try {
    const email = req.email;
    const photos = await Photo.find({ email }).select("image createdAt");
    res.status(200).json({ photos });
  } catch (error) {
    console.error("Error retrieving photos:", error);
    res.status(500).json({ message: "Failed to retrieve photos" });
  }
});

// Update photo (only image)
router.put(
  "/update-photo/:id",
  verifyToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const email = req.email;

      const photo = await Photo.findById(id);
      if (!photo) return res.status(404).json({ message: "Photo not found" });
      if (photo.email !== email) return res.status(403).json({ message: "Unauthorized" });

      // Update image if new file is uploaded
      if (req.file) {
        photo.image = req.file.buffer.toString("base64");
      }

      await photo.save();
      res.status(200).json({ message: "Photo updated successfully", photo });
    } catch (error) {
      console.error("Error updating photo:", error);
      res.status(500).json({ message: "Failed to update photo" });
    }
  }
);

// Delete photo
router.delete("/delete-photo/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = req.email;

    const photo = await Photo.findById(id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });
    if (photo.email !== email) return res.status(403).json({ message: "Unauthorized" });

    await photo.deleteOne();
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Failed to delete photo" });
  }
});

export default router;