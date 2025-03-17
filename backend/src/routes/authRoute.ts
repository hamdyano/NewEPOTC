import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddel";
import prisma from "../prisma"; // Import Prisma client


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
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );



res.cookie("auth_token", token, {
  httpOnly: true,
  secure: true, // Ensure the cookie is only sent over HTTPS
  sameSite: "none", // Allow cross-site usage
  //sameSite: "lax",
  maxAge: 86400000, // 1 day
});

      res.status(200).json({ userId: user.id, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);


router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId, email: req.email });
});





router.get("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        city: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

router.put("/update", verifyToken, async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, city } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { email: req.email },
      data: {
        firstName,
        lastName,
        city
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        city: true,
        createdAt: true
      }
    });

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
});


// Password Reset Endpoint
router.post(
  "/reset-password",
  [
    check("email", "Valid email is required").isEmail(),
    check("pin", "PIN is required").notEmpty(),
    check("newPassword", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("confirmPassword", "Passwords must match").custom((value, { req }) => {
      return value === req.body.newPassword;
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, pin, newPassword } = req.body;
    const STATIC_PIN = "23840152"; // Consider moving to environment variables

    try {
      // Validate PIN
      if (pin !== STATIC_PIN) {
        return res.status(400).json({ message: "Invalid PIN" });
      }

      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 8);

      // Update user password
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);



router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});





export default router;



