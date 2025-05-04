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
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    const user = decoded as JwtPayload;
    req.user = user;
    next();
    return; // Ensure this path explicitly returns
  });
  return; // Add this return to cover all code paths
  // The user is already added to the request object in the callback above.
};
