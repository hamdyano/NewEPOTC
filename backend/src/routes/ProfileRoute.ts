import express, { Request, Response } from "express";
import Profile from "../models/ProfileModel";
import User from "../models/userModel";
import { validationResult } from "express-validator";

const router = express.Router();

// POST: Create a new profile linked to a user
router.post("/", async (req: Request, res: Response) => {
  const { email, name_as_it_appear_in_passport, gender } = req.body;

  // Basic validation
  if (!email || !name_as_it_appear_in_passport || !gender) {
    return res.status(400).json({ message: "Email and all fields are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }








    // Create a new profile
    const profile = new Profile({
      user: user._id, // Link profile to the user
      email, // Include email for easier querying
      name_as_it_appear_in_passport,
      gender,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create profile" });
  }
});







/*

router.get("/user-profile/:email", async (req: Request, res: Response) => {
  try {
    // Extract email from the URL
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await Profile.findOne({ email }).select("firstName lastName email city");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
}); */

router.get("/:id", async (req: Request, res: Response) => {
  try {
    // Extract user ID from the URL
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID
    const user = await User.findById(id).select("firstName lastName email city");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});




// PUT: Update an existing profile by email


router.put("/:id", async (req: Request, res: Response) => {
    const { email, name_as_it_appear_in_passport, gender } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required to update the profile" });
    }
  
    try {
      console.log("Email received for update:", email);
  
      // Case-insensitive email search
      const profile = await Profile.findOne({ email: new RegExp(`^${email}$`, "i") });
  
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      console.log("Profile found:", profile);
  
      // Update fields
      profile.name_as_it_appear_in_passport = name_as_it_appear_in_passport || profile.name_as_it_appear_in_passport;
      profile.gender = gender || profile.gender;
  
      const updatedProfile = await profile.save();
      res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  
export default router;



















/*import express, { Request, Response } from "express";
import Profile from "../models/ProfileModel";
import { validationResult } from "express-validator";

const router = express.Router();



// POST: Create a new profile
router.post("/", async (req: Request, res: Response) => {
  const { name_as_it_appear_in_passport, gender } = req.body;

  // Basic validation
  if (!name_as_it_appear_in_passport || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const profile = new Profile({
      name_as_it_appear_in_passport,
      gender,
      /*
      address,
      data_of_birth,
      zip_postal_code,
      passport_number,
      passport_issued_date,
      passport_expiration_date,
      nationality,
      current_job,
      phone_numbers,
      emergency_contact,
      skills_details,
      experience_details,
      previous_un_missions,
      */
     /*
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to add profile" });
  }
});*/

// PUT: Update an existing profile

/*
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // Get the profile ID from the URL
  const { name_as_it_appear_in_passport, gender } = req.body; // Extract fields from the request body

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the profile by ID and update it
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name_as_it_appear_in_passport, gender }, // Fields to update
      { new: true, runValidators: true } // Options: return the updated document and run validation
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(updatedProfile); // Return the updated profile
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;*/
