import express, { Request, Response } from "express";
import verifyToken from "../middleware/authMiddel";
import Partnership from "../models/partnershipModel"; // You'll need to create this model
import multer from "multer";

const router = express.Router();

// Multer configuration for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all partnerships
router.get("/", async (req: Request, res: Response) => {
  try {
    const partnerships = await Partnership.find().select("websiteUrl image");
    res.status(200).json({ partnerships });
  } catch (error) {
    console.error("Error fetching partnerships:", error);
    res.status(500).json({ message: "Failed to fetch partnerships" });
  }
});

// Add new partnership (authenticated)
router.post(
  "/add-partner",
  verifyToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { websiteUrl } = req.body;
      const email = req.email;

      if (!websiteUrl || !req.file) {
        return res
          .status(400)
          .json({ message: "Website URL and image are required" });
      }

      // Convert image to Base64
      const imageBase64 = req.file.buffer.toString("base64");

      const newPartner = new Partnership({
        websiteUrl,
        image: imageBase64,
        email,
      });

      await newPartner.save();
      res.status(201).json({ message: "Partner added successfully", newPartner });
    } catch (error) {
      console.error("Error adding partner:", error);
      res.status(500).json({ message: "Failed to add partner" });
    }
  }
);

// Get authenticated user's partnerships
router.get("/my-partners", verifyToken, async (req: Request, res: Response) => {
  try {
    const email = req.email;
    const partners = await Partnership.find({ email });
    res.status(200).json({ partners });
  } catch (error) {
    console.error("Error retrieving partners:", error);
    res.status(500).json({ message: "Failed to retrieve partners" });
  }
});

// Update partnership
router.put(
  "/update-partner/:id",
  verifyToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { websiteUrl } = req.body;
      const email = req.email;

      const partner = await Partnership.findById(id);
      if (!partner) return res.status(404).json({ message: "Partner not found" });
      if (partner.email !== email) return res.status(403).json({ message: "Unauthorized" });

      // Update fields
      if (websiteUrl) partner.websiteUrl = websiteUrl;
      if (req.file) {
        partner.image = req.file.buffer.toString("base64");
      }

      await partner.save();
      res.status(200).json({ message: "Partner updated successfully", partner });
    } catch (error) {
      console.error("Error updating partner:", error);
      res.status(500).json({ message: "Failed to update partner" });
    }
  }
);

// Delete partnership
router.delete("/delete-partner/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = req.email;

    const partner = await Partnership.findById(id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    if (partner.email !== email) return res.status(403).json({ message: "Unauthorized" });

    await partner.deleteOne();
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    console.error("Error deleting partner:", error);
    res.status(500).json({ message: "Failed to delete partner" });
  }
});

// Get single partnership by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const partner = await Partnership.findById(id).select("websiteUrl image");
    
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json({ partner });
  } catch (error) {
    console.error("Error fetching partner:", error);
    res.status(500).json({ message: "Failed to fetch partner" });
  }
});

export default router;