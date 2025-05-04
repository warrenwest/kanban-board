import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    const user =
      typeof decoded === "object" && decoded !== null
        ? (decoded as JwtPayload)
        : undefined;
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    if (user) {
      req.user = user; // Add user data to request object
      return next();
    } else {
      return res.sendStatus(403); // Forbidden
    }
  });
  return; // Ensure all code paths return a value
};
