import { Router } from "express";
import { ticketRouter } from "./api/ticket-routes.js";
import { userRouter } from "./api/user-routes.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Public routes (e.g., login/register) can go here if needed

// Protected routes
router.use("/tickets", authenticateToken, ticketRouter);
router.use("/users", authenticateToken, userRouter);

export default router;
