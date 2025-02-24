import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request interface to include userId and email
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Optional userId property
      email?: string;  // Optional email property
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from cookies or Authorization header
  const token = req.cookies?.auth_token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

    // Attach userId and email to the request object
    req.userId = decoded.userId;
    req.email = decoded.email;

    next(); // Pass control to the next middleware or route
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;





