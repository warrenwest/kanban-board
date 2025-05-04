import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.use("/auth", authRoutes);
// Apply authentication middleware to all API routes
router.use("/api", authenticateToken);
router.use("/api", apiRoutes);

export default router;
