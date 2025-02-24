import express, { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddel";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return; // Ensure we stop execution
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      // Handle the case where user is not found
      if (!user) {
        res.status(400).json({ message: "Invalid Credentials" });
        return; // Stop execution after responding
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
        return; // Stop execution after responding
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      /*
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day
      });*/

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true, // Ensure the cookie is only sent over HTTPS
        sameSite: "none", // Allow cross-site usage
        //sameSite: "lax",
        maxAge: 86400000, // 1 day
      });

      res.status(200).json({ userId: user._id, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

// Fetch User Data

router.get("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const email = req.email; // Extract email from the request object

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Fetch user data from the database using the email
    const user = await User.findOne({ email }).select(
      "firstName lastName email city"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

// Update user profile
router.put("/update", verifyToken, async (req: Request, res: Response) => {
  try {
    const email = req.email; // Extract email from the request object
    const { firstName, lastName, city } = req.body; // Extract updated fields from the request body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (city) user.city = city;

    // Save the updated user to the database
    await user.save();

    // Exclude the password field before sending the response
    const { password, ...sanitizedUser } = user.toObject();

    res.status(200).json({
      message: "User profile updated successfully",
      user: sanitizedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
