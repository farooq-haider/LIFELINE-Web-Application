import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function recipientAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token is required");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}
